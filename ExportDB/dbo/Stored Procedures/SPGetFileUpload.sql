-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <30-10-24>
-- Description:	<To get The uploaded file>
-- =============================================

-- EXEC SPGetFileUpload 'MD-311024-100'

CREATE PROCEDURE [dbo].[SPGetFileUpload]
(
    @proc varchar(50)
 
)
AS
BEGIN TRY
     SELECT TOP 1 
	   fd.[ID] ,
        fd.[CODE],
        fd.[PROCESSID],
        fd.[PROCESSCODE],
        fd.[PROCESSNAME],
        fd.[FILENAME],
        fd.[FILESIZE],
        fd.[FILETYPE],
        fd.[FILEURL],
        fd.[UNITID],
        fd.[DOCUMENTCREATEDDATE],
        fd.[DOCUMENTCREATEDBY],
        fd.[DOCUMENTUPDATEDBY]
    FROM 
        TBLFILEDETAILS fd
    WHERE fd.[PROCESSCODE] = @proc
	ORDER BY 
        fd.[DOCUMENTCREATEDDATE] DESC; 
       
       

END TRY
BEGIN CATCH
    -- In case of an error, return the error message
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMessage, 16, 1);
END CATCH