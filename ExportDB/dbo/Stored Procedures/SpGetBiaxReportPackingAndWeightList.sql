-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <01-02-2025>
-- Description:	<SP to get Report Packing and weight List>
-- =============================================

-- exec SpGetBiaxReportPackingAndWeightList 32

CREATE PROCEDURE [dbo].[SpGetBiaxReportPackingAndWeightList] 
	@ID INT
AS
BEGIN
	
 DECLARE @GrandTotal DECIMAL(18, 2),@pnum varchar(500);
    declare @BILL int,@LCVSBILL INT ,@SLNO VARCHAR(500)
SET @BILL=(SELECT TOP 1 BILLID FROM TBLLCVSBILL WHERE ID=@ID)
SET @LCVSBILL=(SELECT TOP 1 LCSCID FROM TBLLCVSBILL WHERE ID=@ID)
SET @SLNO=(SELECT TOP 1 SLNO FROM TBLLCVSBILL WHERE ID=@ID)
  SET @pnum=(SELECT PCNUMBER FROM  TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=(SELECT PROFORMAINVOICEHEADERID FROM TBLLCDETAILS WHERE ID=@LCVSBILL))
 Declare @word varchar(500);
	SELECT @GrandTotal = (
	         select sum(line.PRICE) from ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
              inner join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prch
              on qou.ID = prch.PROFORMAINVOICEHEADERID
			  inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as line
			  on line.PRICECONFIRMHEADERID = prch.ID
	)

	select @word = ABGAPIS.dbo.NumberToWords(@GrandTotal);

select 
bbi.strAddress,
--(SELECT TOP 1 strAddress from ERP_SAD.dbo.qryDisPoint where intDisPointId=qou.DELPOINTID) as cusAddress,
customer.strAddress as cusAddress,
qou.QUOTATIONNUMBER as pino,
FORMAT(qou.Date, 'dd-MMM-yy') as pidate,
customer.strName as customername,
CUSTOMERBANKNAME,
CUSTOMERBANKBINNO,
CUSTOMERBANKADDRESSLINEONE,
CUSTOMERBANKADDRESSLINETWO,
CUSTOMERBANKADDRESSLINETHREE,
bif.strBankName,
lcd.LCNUMBER,

( select NAME from ABGAPIS.dbo.TBLOADINGBY as loing where loing.ID = qou.LOADINGBYID  ) as ShippedPer,
(select count(intRollID) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @pnum
) as totalrollno,

(select sum(rc.decWeight-rc.decCoreWeight) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @pnum
) as TotalNetWeight,

(select sum(rc.decWeight) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @pnum
) as TotalGrossWeight,

FORMAT(lcd.LCISSUEDATE, 'dd-MMM-yy') as lcdate,--#
ISNULL(@SLNO,'')+'/'+ISNULL((select strCode from ERP_DURBIN.dbo.tblCusBilling as cus inner join ABGAPIS.dbo.TBLLCDETAILS as lcm on cus.intBillID = @BILL and lcm.id=lcd.id),lcd.invoiceno) as INVOICENO,
FORMAT(lcd.DOCUMENTCREATEDDATE, 'dd-MMM-yy') as DOCUMENTCREATEDDATE,
(SELECT TOP 1 indate FROM TBLLCVSBILL WHERE ID=@ID) as invdate,--#
(select bin from tblcustomerinfo where customerid=customer.intcusid) as cussbin,
(select TIN from tblcustomerinfo where customerid=customer.intcusid) as custin,
(select irc from tblcustomerinfo where customerid=customer.intcusid) as cusirc,--#
(SELECT STRING_AGG(HSCODE, ', ') FROM ABGAPIS.dbo.TBLQUOTATIONHSCODE WHERE QTID = qou.ID) AS HSCODE,
(
select top 1 curr.NAME from ABGAPIS.dbo.TBLLCDETAILS as lc
left join ABGAPIS.dbo.TBLQUOTATIONHEADER as qouhead
on lc.PROFORMAINVOICEHEADERID = qouhead.ID
left join ABGAPIS.dbo.TBLCURRENCY as curr
on curr.ID = qouhead.CURRENCYID
where qouhead.id = qou.ID
) as Currency ,
UPPER(@word) as TotalAMountInWords,
@GrandTotal as Totalamount,
(SELECT TOP 1 strAddress from ERP_SAD.dbo.qryDisPoint where intDisPointId=qou.DELPOINTID) as DELPOINTADDRESS
from ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
left join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prch on qou.ID = prch.PROFORMAINVOICEHEADERID
left join ERP_Accounts.dbo.tblBankAccountList as acl on acl.intID = qou.SELLERBANKID
left join ERP_Accounts.dbo.tblBankAccountInfo as tbai on acl.intAccountID = tbai.intAccountID
left join ERP_Accounts.dbo.tblBankBranchInfo as bbi on bbi.intBranchID = tbai.intBankBranchID
left join ERP_Accounts.dbo.tblBankInfo as bif on bif.intBankID = bbi.intBankID
left join abgapis.dbo.TBLLCDETAILS as lcd on lcd.PROFORMAINVOICEHEADERID = qou.ID
left join ABGAPIS.dbo.TBLCUSTOMERBANK as cusbank on lcd.BUYERBANKID = cusbank.ID
left join ERP_SAD.dbo.tblCustomer customer on qou.CUSTOMERID = customer.intCusID
where prch.PCNUMBER = @pnum
END