-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <10-12-24>
-- Description:	<Get LC related Sales Contract Header>
-- =============================================

-- exec SpGetLcRealtedSalesContractHeader 28

CREATE PROCEDURE [dbo].[SpGetLcRealtedSalesContractHeader] 
    @headid int
AS
BEGIN

	select
	(select sum(QUANTITY)*sum(CONFIRMPRICE) from ABGAPIS.dbo.TBLPRICECONFIRMLINE group by PRICECONFIRMHEADERID having PRICECONFIRMHEADERID = pch.ID) as totamount,
	(select sum(QUANTITY) from ABGAPIS.dbo.TBLPRICECONFIRMLINE group by PRICECONFIRMHEADERID having PRICECONFIRMHEADERID = pch.ID) as totQuantity,
lcd.LCNUMBER as salescontractnumber,
--lcd.DOCUMENTCREATEDDATE as signingdate,
FORMAT(lcd.DOCUMENTCREATEDDATE, 'dd-MMM-yyyy')as signingdate,
'Akij Biax Films Ltd.' as seller,
'Akij Chamber, 73 Dilkusha C/A , Dhaka-1000. Factory : Khagatipara, Trishal, Mymensingh, Bangladesh ' as selleraddress,
cus.strName as 'Buyer',
cus.strAddress as 'buyeraddress',
cus.strEmailAddress as 'buyeremail',
(select strBankName from ERP_Accounts.dbo.tblBankAccountList where intID = qouhead.sellerbankid ) as sellerbankname,
qouhead.TARRIFCODE,
curr.Name as currency,
ISNULL((select NAME from ABGAPIS.dbo.TBLCOUNTRY where id=qouhead.FROMSHIPMENTCOUNTRYID),'') as 'shipmentFrom',
FORMAT(qouhead.EXPIREDATE, 'dd-MMM-yyyy')as 'lastdateshipment',
--qouhead.SHIPMENTDATE as 'expiredateSales',
FORMAT(qouhead.SHIPMENTDATE, 'dd-MMM-yyyy')as 'expiredateSales',
ISNULL((select Name from ABGAPIS.dbo.TBLSHIPMENTMODE where id  = qouhead.SHIPMENTMODEID),'') as ShipmentMode,
qouhead.FREEINCOTERM as incoterm,
ISNULL(qouhead.FREEPAYMENTTERM,'') as paymentterm,
ISNULL((select Name from ABGAPIS.dbo.TBLTOLERANCE where id =  qouhead.TOLARENCEID),'') as Tolerance,
lcd.DOCUMENTREQUIRE as documentsrequire,
'CCEYBDDH' as SWIFT,
'The Goods will be Bangladesh Origin' as originofgoods
from ABGAPIS.dbo.TBLLCDETAILS as lcd
left join ABGAPIS.dbo.TBLQUOTATIONHEADER as qouhead
on lcd.PROFORMAINVOICEHEADERID = qouhead.ID
left join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as pch
on pch.PROFORMAINVOICEHEADERID = qouhead.ID
left join ABGAPIS.dbo.TBLCURRENCY as curr
on curr.ID = qouhead.CURRENCYID
left join ERP_SAD.dbo.tblCustomer as cus
on cus.intCusID =  lcd.CUSTOMERID
where lcd.ID = @headid
END