-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
 --exec sprSalesQuotationReport 'SQ-040324-2'
-- =============================================
CREATE PROCEDURE [dbo].[sprSalesQuotationReport] 
	@sqnum as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
declare @LENGTH						VARCHAR(100),
@WIDTH						VARCHAR(100),
@HEIGHT						VARCHAR(100),
@THICKNESS					VARCHAR(100),
@WEIGHT 					VARCHAR(100);

	select @HEIGHT=ims.HEIGHT,@WEIGHT=ims.WEIGHT,@THICKNESS=ims.THICKNESS,@WIDTH=ims.WIDTH,@LENGTH=ims.LENGTH from TBLSALESQUOTATIONHEADER sqh
	inner join TBLSALESQUOTATIONLINE sql on sqh.ID=sql.SALESQUOTATIONHEADERID 
	inner join TBLITEMORDERSPECSTAGING ims on sql.ITEMID=ims.ITEMID
	where SQNUMBER=@sqnum;

	select unit.intUnitID as UnitID,unit.strDescription as SellerName,
	unit.strPhone as SellerPhone,unit.strAccEmailAddress as SellerEmail,unitaddress.strAddress as SellerAddress ,
	cus.intCusID as ID,cus.strName as Name,cus.strPhone as Phone,cus.strEmailAddress as Email,cus.strAddress as Address,
	tml.strProductName,tml.strProductCode,sql.QUANTITY,sql.PRICE,sql.TOTALAMOUNT ,sql.DISCOUNT,sqh.EXPIREDATE,sqh.DOCUMENTCREATEDDATE,sqh.SQNUMBER,
	isnull(ims.HEIGHT,null) as Height,isnull(ims.WEIGHT,null) as weight,isnull(ims.THICKNESS,null) as Thickness,isnull(ims.WIDTH,null) as Width,ISNULL(ims.LENGTH,null) as Length 
	from TBLSALESQUOTATIONHEADER sqh  
	inner join ERP_HR.dbo.tblUnit unit on sqh.UNITID=unit.intUnitID
	inner join ERP_HR.dbo.tblUnitAddress unitaddress on unit.intUnitID=unitaddress.intUnitID
	inner join ERP_SAD.dbo.tblCustomer cus on sqh.CUSTOMERID=cus.intCusID
	inner join TBLSALESQUOTATIONLINE sql on sqh.ID=sql.SALESQUOTATIONHEADERID 
	inner join ERP_SAD.dbo.tblItem tml on sql.ITEMID=tml.intID
	left join TBLITEMORDERSPEC ims on sql.ITEMID=ims.ITEMID
	
	where unitaddress.intAddressTypeID=2 and  sqh.SQNUMBER=@sqnum;
	
END