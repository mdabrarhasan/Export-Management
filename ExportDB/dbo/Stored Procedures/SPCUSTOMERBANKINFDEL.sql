CREATE PROCEDURE SPCUSTOMERBANKINFDEL
    @ID INT,
    @Msg CHAR(100) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE [ABGAPIS].[dbo].[TBLCUSTOMERBANK]
        SET ISACTIVE = 0,
            UPDATEDDATE = GETDATE()
        WHERE ID = @ID
        
        SET @Msg = 'Record deleted successfully'
    END TRY
    BEGIN CATCH
        SET @Msg = ERROR_MESSAGE()
    END CATCH
END