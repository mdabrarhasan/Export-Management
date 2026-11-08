-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
 --exec sprSalesContactReport 'SC-040324-3'
-- =============================================
CREATE PROCEDURE [dbo].[sprSalesContactReport] 
	@pinum as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
declare @LENGTH						VARCHAR(100),
@WIDTH						VARCHAR(100),
@HEIGHT						VARCHAR(100),
@THICKNESS					VARCHAR(100),
@countryid int,@tosh int,@formsh int,@toshiping varchar(50),@formshiping varchar(50),
@WEIGHT 					VARCHAR(100),@tolid int,@pisclineid int,@ToleranceName varchar(50) ;

    
	select @ToleranceName=NAME from TBLTOLERANCE where ID=@tolid
	select TOP 1 @tolid=TOLERANCEID from TBLPISCLINE where PISCHEADER=@pisclineid
	select @formsh=FROMSHIPMENTCOUNTRYID, @tosh=TOSHIPMENTCOUNTRYID,@pisclineid=ID from TBLPISCHEADER  where  NUMBER=@pinum;
	SELECT @toshiping=NAME from TBLCOUNTRY where ID=@tosh ;
	SELECT @formshiping=NAME from TBLCOUNTRY where ID=@formsh ;

	select 
	@HEIGHT=ims.HEIGHT,@WEIGHT=ims.WEIGHT,@THICKNESS=ims.THICKNESS,@WIDTH=ims.WIDTH,@LENGTH=ims.LENGTH from TBLPISCHEADER sqh
	inner join TBLPISCLINE sql on sqh.ID=sql.PISCHEADER 
	inner join TBLITEMORDERSPEC ims on sql.ITEMID=ims.ITEMID
	where NUMBER=@pinum;

	select unit.intUnitID as UnitID,unit.strDescription as SellerName,
	unit.strPhone as SellerPhone,unit.strAccEmailAddress as SellerEmail,unitaddress.strAddress as SellerAddress ,
	cus.intCusID as ID,cus.strName as Name,cus.strPhone as Phone,cus.strEmailAddress as Email,cus.strAddress as Address,
	tml.strProductName,tml.strProductCode,sql.QUANTITY,sql.PRICE,sql.TOTALAMOUNT,sql.DISCOUNT ,sqh.DATE,sqh.NUMBER,sqh.TARRIFCODE,sqh.DESCRIPTIONS,sqh.EXPIREDATE,
	@toshiping as toshipingcountry,@formshiping as fromshipingcountry,@ToleranceName AS ToleranceName,
	isnull(ims.HEIGHT,null) as Height,isnull(ims.WEIGHT,null) as weight,isnull(ims.THICKNESS,null) as Thickness,isnull(ims.WIDTH,null) as Width,ISNULL(ims.LENGTH,null) as Length ,
	tbl.strBankName as SellerBank,tinterm.NAME as IncotermName,tpt.NAME as Payterm from TBLPISCHEADER sqh  
	inner join ERP_HR.dbo.tblUnit unit on sqh.UNITID=unit.intUnitID
	inner join ERP_HR.dbo.tblUnitAddress unitaddress on unit.intUnitID=unitaddress.intUnitID
	inner join ERP_SAD.dbo.tblCustomer cus on sqh.CUSTOMERID=cus.intCusID
	inner join TBLPISCLINE sql on sqh.ID=sql.PISCHEADER  
	inner join ERP_SAD.dbo.tblItem tml on sql.ITEMID=tml.intID
	inner join ERP_Accounts.dbo.tblBankAccountList tbl on sqh.SELLERBANKID=tbl.intID
	inner join TBLINCOTERM tinterm on sqh.INCOTERM=tinterm.ID
	inner join TBLPAYMENTTERMS tpt on sqh.PAYMENTTERMID=tpt.ID
	--inner join TBLTOLERANCE tt on sql.TOLERANCEID=tt.ID
	left join TBLITEMORDERSPEC ims on sql.ITEMID=ims.ITEMID
    where unitaddress.intAddressTypeID=2 and  sqh.NUMBER=@pinum ;
	
END