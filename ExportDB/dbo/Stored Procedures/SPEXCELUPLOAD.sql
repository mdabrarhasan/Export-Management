

CREATE PROCEDURE SPEXCELUPLOAD
(
@TYPEEXCELUPLOAD			TYPEEXCELUPLOAD readonly,
@Msg						VARCHAR(100) OUTPUT
)
AS
BEGIN
DECLARE @strOCFNo  			VARCHAR(500),
@strProductCode				VARCHAR(500),
@strProductName				VARCHAR(500),
@intProductID				INT,
@decThickness				DECIMAL(18,2),
@decWidth					DECIMAL(18,2),
@decLength					DECIMAL(18,2),
@strTreatmentLavel			VARCHAR(200),
@strTreatmentDirection		VARCHAR(200),	
@intTreatmentDirectionID	INT,
@strCoreID					VARCHAR(200),
@intCoreID					INT,	
@strRealOD					VARCHAR(200),
@intOrderQty				INT,
@dteDesiredDateofDelivery	VARCHAR(200),	
@dteTentativeDateofDelivery	VARCHAR(200),	
@strUOM						VARCHAR(200),	
@intUOM						INT,	
@strRemarks					VARCHAR(200)	


DELETE FROM TBLEXCELUPLOAD

  DECLARE SQL_CURSOR CURSOR FOR  
	 SELECT strOCFNo,strProductCode,strProductName,intProductID,decThickness,decWidth,decLength,strTreatmentLavel,strTreatmentDirection,
			intTreatmentDirectionID,strCoreID,intCoreID,strRealOD,intOrderQty,dteDesiredDateofDelivery,dteTentativeDateofDelivery,
			strUOM,intUOM,strRemarks
	 FROM @TYPEEXCELUPLOAD
	 OPEN SQL_CURSOR
	 FETCH NEXT FROM SQL_CURSOR INTO @strOCFNo,@strProductCode,@strProductName,@intProductID,@decThickness,@decWidth,@decLength,@strTreatmentLavel,@strTreatmentDirection,
	 @intTreatmentDirectionID,@strCoreID,@intCoreID,@strRealOD,@intOrderQty,@dteDesiredDateofDelivery,@dteTentativeDateofDelivery,
	 @strUOM,@intUOM,@strRemarks
	 WHILE @@FETCH_STATUS = 0  
  BEGIN
  
  INSERT INTO TBLEXCELUPLOAD
  (
	strOCFNo,
	strProductCode,
	strProductName,
	intProductID,
	decThickness,
	decWidth,
	decLength,
	strTreatmentLavel,
	strTreatmentDirection,
	intTreatmentDirectionID,
	strCoreID,
	intCoreID,
	strRealOD,
	intOrderQty,
	dteDesiredDateofDelivery,
	dteTentativeDateofDelivery,
	strUOM,
	intUOM,
	strRemarks
  )
  VALUES
  (
	@strOCFNo,  
	@strProductCode,
	@strProductName,
	@intProductID,
	@decThickness,
	@decWidth,
	@decLength,
	@strTreatmentLavel,
	@strTreatmentDirection,
	@intTreatmentDirectionID,
	@strCoreID,
	@intCoreID,
	@strRealOD,
	@intOrderQty,
	@dteDesiredDateofDelivery,
	@dteTentativeDateofDelivery,
	@strUOM,
	@intUOM,
	@strRemarks
  )
  FETCH NEXT FROM sql_cursor INTO @strOCFNo,@strProductCode,@strProductName,@intProductID,@decThickness,@decWidth,@decLength,@strTreatmentLavel,@strTreatmentDirection,
	 @intTreatmentDirectionID,@strCoreID,@intCoreID,@strRealOD,@intOrderQty,@dteDesiredDateofDelivery,@dteTentativeDateofDelivery,
	 @strUOM,@intUOM,@strRemarks
 END

 SET @Msg='UPLOADED'
  END;