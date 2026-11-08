--exec SPBOEREPORT 14
CREATE PROCEDURE [dbo].[SPBOEREPORT]
@ID INT

AS
BEGIN
declare @BILL int,@LCVSBILL INT ,@SLNO VARCHAR(500)
SET @BILL=(SELECT TOP 1 BILLID FROM TBLLCVSBILL WHERE ID=@ID)
SET @LCVSBILL=(SELECT TOP 1 LCSCID FROM TBLLCVSBILL WHERE ID=@ID)
SET @SLNO=(SELECT TOP 1 SLNO FROM TBLLCVSBILL WHERE ID=@ID)
--select @BILL,@LCVSBILL
select 
CUSTOMERBANKNAME,
CUSTOMERBANKBINNO,
CUSTOMERBANKADDRESSLINEONE,
CUSTOMERBANKADDRESSLINETWO,
CUSTOMERBANKADDRESSLINETHREE,
bif.strBankName,

lcd.LCNUMBER,
(select top 1 address from ABGAPIS.dbo.TBLBANKINFO where bankid=bif.intbankid) as bankaddress,
lcd.INVOICENO,
lcd.LCISSUEDATE,
lcd.BILLNOID,
lcd.LCTENORPERIOD as tp,
(select sum(TOTALAMOUNT) from TBLQUOTATIONLINE where QUOTATIONHEADERID=qou.ID group by QUOTATIONHEADERID ) as amount,
(select NAME from TBLFROMLOADINGPORT where id=qou.FROMSHIPMENTPORTID) as portname,
(select name from TBLSHIPMENTMODE where id=qou.SHIPMENTMODEID) as shipmentmode,
ISNULL(@SLNO,'')+'/'+cb.strCode AS strCode,cb.monTotal,(SELECT TOP 1 indate FROM TBLLCVSBILL WHERE ID=@ID) as invdate,
cb.strHeader,
(select sum(rc.intRollID) from ABGAPIS.dbo.TBLPRICECONFIRMLINE PCLINE
inner join erp_sAD.DBO.tblItem as Item on Item.intID = PCLINE.ITEMID 
inner join ERP_Label_ABX.dbo.tblRollNumber rc 
on   item.intID = rc.intProductID and PCLINE.THIKNESS = rc.decThickness 
and rc.intocfid=prch.OCFITEMID
and PCLINE.WIDTH  = rc.decWidth
where PCLINE.PRICECONFIRMHEADERID=prch.ID  ) as roll,
(select top 1 item.strProductName from ABGAPIS.dbo.TBLPRICECONFIRMLINE PCLINE
inner join erp_sAD.DBO.tblItem as Item on Item.intID = PCLINE.ITEMID 

where PCLINE.PRICECONFIRMHEADERID=prch.ID) as proname,
CASE WHEN qou.SQTYPEID=136 THEN 'CPT' ELSE 'CIP' END AS CPT,
CASE WHEN qou.SQTYPEID=136 THEN 'BDT' ELSE (SELECT TOP 1 NAME FROM TBLCURRENCY WHERE ID=qou.CURRENCYID) END AS CUR,
customer.strName as customername,
customer.strAddress as cusAddress,
(select bin from tblcustomerinfo where customerid=customer.intcusid) as cussbin,
(select TIN from tblcustomerinfo where customerid=customer.intcusid) as custin,
(select irc from tblcustomerinfo where customerid=customer.intcusid) as cusirc
from ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
left join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prch
on qou.ID = prch.PROFORMAINVOICEHEADERID
--left join ERP_Accounts.dbo.tblBankAccountList as acl
--on acl.intID = qou.SELLERBANKID
--left join ERP_Accounts.dbo.tblBankAccountInfo as tbai
--on acl.intAccountID = tbai.intAccountID

left join ERP_Accounts.dbo.tblBankInfo as bif
on bif.intBankID = qou.SELLERBANKID
left join ERP_Accounts.dbo.tblBankBranchInfo as bbi
on bif.intBankID = bbi.intBankID
left join abgapis.dbo.TBLLCDETAILS as lcd
on lcd.PROFORMAINVOICEHEADERID = qou.ID
left join ABGAPIS.dbo.TBLCUSTOMERBANK as cusbank

on lcd.BUYERBANKID = cusbank.ID
left join ERP_SAD.dbo.tblCustomer customer on qou.CUSTOMERID = customer.intCusID
left join TBLLCVSBILL lcb on lcb.LCSCID=lcd.id
left join ERP_DURBIN.dbo.tblCusBilling cb on cb.intBillID=lcb.BILLID
WHERE lcd.ID=@LCVSBILL 
AND cb.intBillID=@BILL



END;

--select * from ERP_Accounts.dbo.tblBankAccountList as acl

----left join ERP_Accounts.dbo.tblBankAccountInfo as tbai
----on acl.intAccountID = tbai.intAccountID
----left join ERP_Accounts.dbo.tblBankBranchInfo as bbi
----on bbi.intBranchID = tbai.intBankBranchID
----left join ERP_Accounts.dbo.tblBankInfo as bif
----on bif.intBankID = bbi.intBankID 
--where acl.intID=47