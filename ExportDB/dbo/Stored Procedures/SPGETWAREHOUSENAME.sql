CREATE PROCEDURE [dbo].[SPGETWAREHOUSENAME]
(
@TYPE					INT,
@USERID					INT,
@UNITID					INT,
@YSNENABLED				BIT
)
AS
BEGIN
	--SELECT intWHID AS ID,strWareHoseName AS NAME FROM ERP_Inventory.DBO.tblWearHouse WHERE intUnitID=91 AND ysnActive=1
	--EXEC ERP_SAD.DBO.sprShipPointByUser @USERID,@UNITID,@YSNENABLED
	SELECT distinct[intShipPointId] AS ID,[strName] AS NAME FROM ERP_SAD.[dbo].[qryShipPointByOperator] WHERE intUnitId=91
	and isnull(ysnWareHouseOnly,0)=0 
END;