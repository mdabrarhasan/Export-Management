-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <23-12-2024>
-- Description:	<This is SP to get headers for Report of Export Delivery Challan>
-- =============================================

-- exec SpGetLcRelatedComInvoiceReportHeaders 287

CREATE PROCEDURE [dbo].[SpGetLcRelatedComInvoiceReportHeaders]
    @ID INT
AS
BEGIN

 DECLARE @GrandTotal DECIMAL(18, 2),@PriceName varchar(100);
 declare @BILL int,@LCVSBILL INT ,@SLNO VARCHAR(500)
SET @BILL=(SELECT TOP 1 BILLID FROM TBLLCVSBILL WHERE ID=@ID)
SET @LCVSBILL=(SELECT TOP 1 LCSCID FROM TBLLCVSBILL WHERE ID=@ID)
SET @SLNO=(SELECT TOP 1 SLNO FROM TBLLCVSBILL WHERE ID=@ID)
 Declare @word varchar(500);
 SET @PriceName=(SELECT PCNUMBER FROM  TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=(SELECT PROFORMAINVOICEHEADERID FROM TBLLCDETAILS WHERE ID=@LCVSBILL))
 ---select @PriceName
	--SELECT @GrandTotal = (select monTotal from ERP_DURBIN.dbo.tblCusBilling as cus inner join ABGAPIS.dbo.TBLLCDETAILS as lcm on cus.intBillID = @BILL and lcm.id=@LCVSBILL)
		SELECT @GrandTotal =(select montotal from ERP_DURBIN.dbo.tblCusBilling where intbillid=(select billid from ABGAPIS.dbo.TBLLCVSBILL where id=@ID))
	--select @word = dbo.NumberToTakaWords(@GrandTotal);
	select @word = dbo.AmountToWords(@GrandTotal);
select 
qou.customerid,bbi.strAddress,
--(SELECT TOP 1 strAddress from ERP_SAD.dbo.qryDisPoint where intDisPointId=qou.DELPOINTID) as cusAddress,
customer.strAddress as cusAddress,
ISNULL(@SLNO,'')+'/'+(select strcode FROM ERP_DURBIN.dbo.tblcusbilling WHERE intUnitId = 91 and intBillID=@BILL) as pino,--#
(SELECT TOP 1 indate FROM TBLLCVSBILL WHERE ID=@ID) as invdate,--#
(select bin from tblcustomerinfo where customerid=customer.intcusid) as cussbin,
(select TIN from tblcustomerinfo where customerid=customer.intcusid) as custin,
(select irc from tblcustomerinfo where customerid=customer.intcusid) as cusirc,
qou.QUOTATIONNUMBER AS qono,
FORMAT(qou.DATE, 'dd-MMM-yy') as pidate,
customer.strName as customername,
CUSTOMERBANKNAME,
CUSTOMERBANKBINNO,
CUSTOMERBANKADDRESSLINEONE,
CUSTOMERBANKADDRESSLINETWO,
CUSTOMERBANKADDRESSLINETHREE,
bif.strBankName,
lcd.LCNUMBER,
lcd.LCTENORPERIOD
,
( select NAME from ABGAPIS.dbo.TBLOADINGBY as loing where loing.ID = qou.LOADINGBYID  ) as ShippedPer,
(select count(intRollID) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @PriceName
) as totalrollno,

(select sum(rc.decWeight-rc.decCoreWeight) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @PriceName
) as TotalNetWeight,

(select sum(rc.decWeight) from ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prchead
inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as prcline on prcline.PRICECONFIRMHEADERID = prchead.ID
inner join ERP_SAD.dbo.tblItem as item on item.intID = prcline.ITEMID
inner join ERP_Label_ABX.dbo.tblRollNumber as rc on item.intID = rc.intProductID and prcline.THIKNESS = rc.decThickness and prcline.WIDTH  = rc.decWidth 
where prchead.PCNUMBER = @PriceName
) as TotalGrossWeight,

FORMAT(lcd.LCISSUEDATE, 'dd-MMM-yy') as lcdate,--#
ISNULL((select strCode from ERP_DURBIN.dbo.tblCusBilling as cus inner join ABGAPIS.dbo.TBLLCDETAILS as lcm on cus.intBillID = lcm.BILLNOID and lcm.id=lcd.id),lcd.invoiceno) as INVOICENO,
FORMAT(lcd.DOCUMENTCREATEDDATE, 'dd-MMM-yy') as DOCUMENTCREATEDDATE,
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
(SELECT STRTIN FROM ERP_HR.DBO.TBLUNIT WHERE INTUNITID=91) AS TIN,
(SELECT STRBINNO FROM ERP_HR.DBO.TBLUNIT WHERE INTUNITID=91) AS BIN,
(SELECT STRIRC FROM ERP_HR.DBO.TBLUNIT WHERE INTUNITID=91) AS RC,
(SELECT STRING_AGG(strCode, ', ') AS Codes
FROM erp_sad.dbo.tblSalesEntry
WHERE intId IN (
    SELECT intSvID 
    FROM ERP_DURBIN.dbo.tblBillingSV
    WHERE intBillID = @BILL
)
AND intUnitId = 91) AS SVNO,
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
where prch.PCNUMBER = @PriceName;
END