-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <17/10/2024>
-- Description:	<SP for CRUD in Export Report to Make Report Live>
-- =============================================

-- spReportExportProcess 'NewCode';

CREATE PROCEDURE [dbo].[spReportExportProcess]
@CODE NVARCHAR(50) = NULL
AS
BEGIN
SELECT
     [ID] as ID,
     [Code] as CODE , 
     [CreatedBy] as CREATEDBY , 
	 [IsActive] as ISACTIVE,
	 [MotherUrl] as MOTHERURL, 
	 [FolderUrl] as FOLDERURL, 
	 [CreatedDate] as CREATEDATE,
	 [OtherUrl] as OTHERURL
            FROM [ABGAPIS].[dbo].[ExportReport]
            WHERE [CODE] = @CODE;
END;