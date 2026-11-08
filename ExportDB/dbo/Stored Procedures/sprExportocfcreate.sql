-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
--exec sprExportocfcreate 535950
-- =============================================
CREATE PROCEDURE [dbo].[sprExportocfcreate] 
	@Enroll						INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @NUMBER varchar(50),@enrol int ,@unit int
 select @NUMBER=PACKREQNUMBER,@enrol=DOCUMENTCREATEDBY,@unit=UNITID from   TBLPACKINGREQUESTHEADER where ID=(select max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll)
SET @NUMBER='OCF'+@NUMBER;
  CREATE TABLE OCFData (
    Datacounter_ INT IDENTITY(1,1) PRIMARY KEY,
    strOCFNo NVARCHAR(50),
    intProductID INT,
   strProductCode NVARCHAR(50),
   strProductName NVARCHAR(255),
    decThickness DECIMAL(18, 2),
    decWidth DECIMAL(18, 2),
    decLength DECIMAL(18, 2),
    strTreatmentLavel NVARCHAR(50),
	intTreatmentDirectionID int,
    strTreatmentDirection NVARCHAR(50),
    intCoreID INT,
    strRealOD NVARCHAR(50),
    intOrderQty INT,
    dteDesiredDateOfDelivery DATETIME,
    dteTentativeDateOfDelivery DATETIME,
   isCreateBoppPlan BIT,
    isCompleteBopp BIT,
    isCreateSlittingPlan BIT,
    isCompleteSlitting BIT,
    intUnitId INT,
    intInsertBy INT,
    intUOM INT,
	strUOM varchar(50),
    strRemarks NVARCHAR(MAX)
);
declare @checkdes varchar(100),@custype INT,
@ocf varchar(50),@datetime datetime,@packingreqid int
,@salername varchar(50),@cusname  varchar(50),@cusid int ,
@address varchar(50),@phone varchar(50),@tol int
select @datetime=PACKREQDATE from TBLPACKINGREQUESTHEADER 
where ID=(select max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll)

select @packingreqid=max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll

select @salername=strEmployeeName from erp_hr.dbo.tblEmployee where intEmployeeID=@enrol

select @tol=isnull(TOLERANCEID,0) from TBLPACKINGREQUESTLINE 
where PACKINGREQUESTHEADERID=(select max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll)

select @cusid=intCusID,@custype=intCusType,@cusname=strName,@address=strAddress,@phone=strPhone 
from erp_sad.dbo.tblCustomer where intCusID=(select CUSTOMERID from   TBLPACKINGREQUESTHEADER 
where ID=(select max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll))
   
DECLARE @ocftemp table (
strOCFCodeFull varchar(100), msg varchar(100)

)
DECLARE @CUSCATENAME VARCHAR(50),@PACKMODENAME VARCHAR(50),@CUSCATEID INT,
@PACKMODEID INT,@SHIPPOINTID INT,@BIAXPTYPE VARCHAR(50)

select @PACKMODEID=PACKINGMODE,@CUSCATEID=CUSTOMERCATEGORY,@SHIPPOINTID=SHIPPOINT,@BIAXPTYPE=BIAXPRODUCTTYPE from TBLPACKINGREQUESTHEADER 
where ID=(select max(ID) from TBLPACKINGREQUESTHEADER where DOCUMENTCREATEDBY=@Enroll)

select @CUSCATENAME=strCustomerCategory from ERP_SAD.dbo.tblCustomerCategory where intCustomerCategory=@CUSCATEID
select @PACKMODENAME=strPackagingModeDetails from ERP_SAD.dbo.tblPackagingMode where intPackagingModeID=@PACKMODEID
--insert into @ocftemp exec ERP_SAD.dbo.sprOCFcreate @unit,2,1,@custype,@datetime,
--@NUMBER,@datetime,@enrol,@salername,3,'tes',1,'testpackingMode',@tol
--,@cusid,@cusname,@phone,
--@address,@phone,
--@cusid,@cusname,@phone,@address,@phone,@unit,@enrol,2;
-- select  @ocf=strOCFCodeFull from @ocftemp
insert into @ocftemp exec ERP_SAD.dbo.sprOCFcreate @unit,@SHIPPOINTID,446,@custype,@datetime,
@NUMBER,@datetime,@enrol,@salername,@CUSCATEID,@CUSCATENAME,@PACKMODEID,@PACKMODENAME,@tol
,@cusid,@cusname,@phone,
@address,@phone,
@cusid,@cusname,@phone,@address,@phone,@unit,@enrol,@BIAXPTYPE;
 select  @ocf=strOCFCodeFull from @ocftemp

     INSERT INTO OCFData (
    strOCFNo,
   intProductID,
    strProductCode,
    strProductName,
    decThickness,
    decWidth,
    decLength,
    strTreatmentLavel,
	intTreatmentDirectionID,
   strTreatmentDirection,
    intCoreID,
    strRealOD,
    intOrderQty,
    dteDesiredDateOfDelivery,
    dteTentativeDateOfDelivery,
    isCreateBoppPlan,
    isCompleteBopp,
    isCreateSlittingPlan,
    isCompleteSlitting,
    intUnitId,
    intInsertBy,
    intUOM,
	strUOM,
    strRemarks
)
SELECT 
    @ocf,
    PRL.ITEMID,
    ti.strProductCode,
    ti.strProductName,
    tbis.THICKNESS,
    tbis.WIDTH,
    tbis.LENGTH,
    'BOTHSIDE',
	1,
    'BOTHSIDE',
    tbis.CORE,
    'BOTHSIDE',
    PRL.QUANTITY,
    GETDATE(),
    GETDATE(),
    0,
    0,
    0,
    0,
   @unit,
    @enrol,  
     1126,
     'KG',
    'kk' 
FROM 
    TBLPACKINGREQUESTLINE PRL
LEFT JOIN 
    TBLITEMORDERSPEC tbis ON PRL.ITEMID = tbis.ITEMID
INNER JOIN 
    ERP_SAD.dbo.tblItem ti ON PRL.ITEMID = ti.intID
--LEFT JOIN 
-- ERP_SAD.dbo.tblUOM TU ON ti.intUnitID = TU.intUnitId
WHERE 
    PACKINGREQUESTHEADERID IN (SELECT ID FROM TBLPACKINGREQUESTHEADER WHERE ID = @packingreqid);

	DECLARE @XmlData XML
 set @XmlData=(SELECT 
    Data.Datacounter_ AS '@counter_', 
    Data.strOCFNo AS '@strOCFNo', 
    Data.intProductID AS '@intProductID', 
    Data.strProductCode AS '@strProductCode', 
    Data.strProductName AS '@strProductName', 
    Data.decThickness AS '@decThickness', 
    Data.decWidth AS '@decWidth', 
    Data.decLength AS '@decLength', 
    Data.strTreatmentLavel AS '@strTreatmentLavel', 
    Data.intTreatmentDirectionID AS '@intTreatmentDirectionID', 
    Data.strTreatmentDirection AS '@strTreatmentDirection', 
    Data.intCoreID AS '@intCoreID', 
    Data.strRealOD AS '@strRealOD', 
    Data.intOrderQty AS '@intOrderQty', 
    Data.dteDesiredDateOfDelivery AS '@dteDesiredDateOfDelivery', 
    Data.dteTentativeDateOfDelivery AS '@dteTentativeDateOfDelivery', 
    Data.isCreateBoppPlan AS '@isCreateBoppPlan', 
    Data.isCompleteBopp AS '@isCompleteBopp', 
    Data.isCreateSlittingPlan AS '@isCreateSlittingPlan', 
    Data.isCompleteSlitting AS '@isCompleteSlitting', 
    Data.intUnitId AS '@intUnitId', 
    Data.intInsertBy AS '@intInsertBy', 
    Data.intUOM AS '@intUOM', 
    Data.strUOM AS '@strUOM', 
    Data.strRemarks AS '@strRemarks'
FROM 
    OCFData AS Data
FOR XML PATH('Data'), ROOT('OCF'));
exec ERP_SAD.dbo.sprOCFItemEntry @XmlData,1
drop table OCFData
	
END