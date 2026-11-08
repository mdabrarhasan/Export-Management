
/* 5) DELETE (SOFT DELETE) */
CREATE   PROCEDURE [dbo].[SPRAY_SPCUSTOMERBANKDELETE]
(
    @ID INT,
    @UPDATEDBY INT,
    @Msg VARCHAR(200) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        UPDATE [dbo].[TBLCUSTOMERBANK]
        SET
            [ISACTIVE] = 0,
            [UPDATEDBY] = @UPDATEDBY,
            [UPDATEDDATE] = GETDATE()
        WHERE [ID] = @ID;

        SET @Msg = 'Customer bank info deleted successfully.';
    END TRY
    BEGIN CATCH
        SET @Msg = ERROR_MESSAGE();
    END CATCH
END