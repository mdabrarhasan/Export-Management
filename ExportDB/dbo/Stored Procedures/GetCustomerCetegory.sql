CREATE Procedure [dbo].[GetCustomerCetegory]
AS
BEGIN
	select CAST(intCustomerCategory AS INT) AS ID,strCustomerCategory AS NAME from ERP_SAD.dbo.tblCustomerCategory
END;