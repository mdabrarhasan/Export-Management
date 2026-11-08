CREATE Procedure [dbo].[GetShippingPoint]
AS
BEGIN
	select intId as ID,strName AS NAME from ERP_SAD.dbo.tblShippingPoint where intUnitId=91
END;