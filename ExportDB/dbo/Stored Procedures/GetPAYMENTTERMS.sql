-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE GetPAYMENTTERMS
	
AS
BEGIN
	SELECT [ID]
      ,[CODE]
      ,[NAME]
      ,[DESCRIPTION]
      ,[ISACTIVE]
      ,[CREATEDBY]
      ,[CREATEDDATE]
      ,[UPDATEDBY]
      ,[UPDATEDDATE]
  FROM [ABGAPIS].[dbo].[TBLPAYMENTTERMS]
END