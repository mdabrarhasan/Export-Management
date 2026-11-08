-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
 --exec sprPackingRequestReport 'PR-200324-14'
-- =============================================
CREATE PROCEDURE [dbo].[sprPackingRequestReport] 
	@prnum as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
declare @PIID INT,
@PINUM						VARCHAR(100),
@PIDATE						datetime,
@lcnum					VARCHAR(100),
@lcdate					datetime,@ocfcheck varchar(50),@ocf varchar(50);

	select @PIID=PISCNUMBER,@ocfcheck=PACKREQNUMBER from TBLPACKINGREQUESTHEADER where PACKREQNUMBER=@prnum;
	SELECT @PINUM=NUMBER,@PIDATE=DATE FROM TBLPISCHEADER where ID=@PIID
	SELECT @lcnum=LCNUMBER,@lcdate=LCISSUEDATE from TBLLCDETAILS  where PISCHEADERID=@PIID

	set @ocfcheck='OCF'+@ocfcheck;

	SELECT  @ocf=isnull(strOCFNo,null) FROM ERP_SAD.DBO.tblOCF where strPONO=@ocfcheck

	select unit.intUnitID as UnitID, @ocf as ocf,unit.strDescription as SellerName,@PINUM AS PINUMBER,@PIDATE AS PIDATE, @lcnum AS LCNUM,@lcdate AS LCDATE,
	unit.strPhone as SellerPhone,unit.strAccEmailAddress as SellerEmail,unitaddress.strAddress as SellerAddress ,
	cus.intCusID as ID,cus.strName as Name,cus.strPhone as Phone,cus.strEmailAddress as Email,cus.strAddress as Address,
	tml.strProductName,tml.strProductCode,sql.QUANTITY,sql.PACKINGREQQUANTITY,sqh.DOCUMENTCREATEDDATE,sqh.PACKREQNUMBER,
	isnull(ims.HEIGHT,null) as Height,isnull(ims.WEIGHT,null) as weight,isnull(ims.THICKNESS,null) as Thickness,isnull(ims.WIDTH,null) as Width,ISNULL(ims.LENGTH,null) as Length 
	,ISNULL(TU.strUOM,'KG') as UoM from TBLPACKINGREQUESTHEADER sqh  
	inner join ERP_HR.dbo.tblUnit unit on sqh.UNITID=unit.intUnitID
	inner join ERP_HR.dbo.tblUnitAddress unitaddress on unit.intUnitID=unitaddress.intUnitID
	inner join ERP_SAD.dbo.tblCustomer cus on sqh.CUSTOMERID=cus.intCusID
	inner join TBLPACKINGREQUESTLINE sql on sqh.ID=sql.PACKINGREQUESTHEADERID 
	inner join ERP_SAD.dbo.tblItem tml on sql.ITEMID=tml.intID
	left join TBLITEMORDERSPEC ims on sql.ITEMID=ims.ITEMID
	LEFT JOIN ERP_SAD.dbo.tblUOM TU ON tml.intSellingUOM=TU.intID
	where unitaddress.intAddressTypeID=2 and  sqh.PACKREQNUMBER=@prnum;
	
END