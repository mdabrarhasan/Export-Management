-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <05-12-24>
-- Description:	<Sp to get LC sales contract>
-- =============================================

-- exec  SpGetLCSalesContractHeader 21

CREATE PROCEDURE SpGetLCSalesContractHeader
@Id int
AS
BEGIN

		select 
		qou.QUOTATIONNUMBER as 'SalesContractNumber',
		lcd.DOCUMENTCREATEDBY as 'SigningDate',
		'Akij Biax Films Ltd.' as 'Seller/Supplier',
		'Akij Chamber, 73 Dilkusha C/A,Dhaka-1000. Factory:Khagatipara,Trishal,Mymensingh,Bangladhesh' as 'Address',
		acl.strBankName as 'sellerbankname',
		'' as 'SWIFT',
		cus.strName as 'Buyer',
		cus.strAddress as 'buyerAddress',
		cus.strEmailAddress,
		qou.TARRIFCODE,
		(select sum(CONFIRMPRICE) from ABGAPIS.dbo.TBLPRICECONFIRMLINE as line where line.PRICECONFIRMHEADERID = lpr.ID) as totalamount,
		(select NAME from ABGAPIS.dbo.TBLCOUNTRY where id = qou.FROMSHIPMENTCOUNTRYID ) as 'ShipmentFrom',
		(select NAME from ABGAPIS.dbo.TBLSHIPMENTMODE where id = qou.SHIPMENTMODEID ) as 'ShipmentMode',
		lcd.LCEXPIREDATE as 'expiredatesales',
		qou.SHIPMENTMODEID,
		qou.INCOTERM,
		qou.FREEPAYMENTTERM,
		qou.TOLARENCEID,
		lcd.BUYERDOCUMENTREQUIRED,
		'The Goods will be Bangladesh Origin' as 'OriginGoods'
		from ABGAPIS.dbo.TBLLCDETAILS as lcd
		inner join ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
		on lcd.PROFORMAINVOICEHEADERID = qou.ID
		inner join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as lpr
		on lpr.PROFORMAINVOICEHEADERID = qou.ID
		inner join ERP_Accounts.dbo.tblBankAccountList as acl
		on acl.intID = qou.SELLERBANKID
		inner join ABGAPIS.dbo.TBLCUSTOMERBANK as cusbank
		on lcd.BUYERBANKID = cusbank.ID
		inner join ERP_SAD.dbo.tblCustomer as cus
		on cus.intCusID = qou.CUSTOMERID
		where lcd.ID = @Id;
END