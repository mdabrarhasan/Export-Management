CREATE PROCEDURE [dbo].[SPGetUploadedFiles]
    @UnitID INT,
    @ModuleCode VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        fd.CODE,
        fd.PROCESSNAME,
        fd.FILENAME,
        fd.FILESIZE,
        fd.FILETYPE,
        fd.FILEURL
    FROM 
        TBLFILEDETAILS fd
    INNER JOIN 
        TBLSUBMENU sm ON fd.SUBMENUID = sm.ID
    WHERE 
        fd.UNITID = @UnitID AND sm.CODE = @ModuleCode;
END