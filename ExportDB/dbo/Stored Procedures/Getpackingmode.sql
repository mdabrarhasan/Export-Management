CREATE Procedure [dbo].[Getpackingmode]
AS
BEGIN
	select intPackagingModeID AS ID,strPackagingModeDetails AS NAME from ERP_SAD.dbo.tblPackagingMode
END;