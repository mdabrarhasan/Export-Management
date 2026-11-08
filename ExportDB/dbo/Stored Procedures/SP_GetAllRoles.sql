-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetAllRoles] 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT 
	   [ID]
      ,[CODE]
      ,[NAME]
      ,[DESCRIPTIONS]
      ,[ISACTIVE]
      ,[CREATEDBY]
      ,[CREATEDDATE]
      ,[UPDATEDBY]
      ,[UPDATEDDATE]
  FROM [ABGAPIS].[dbo].[ROLES]

END