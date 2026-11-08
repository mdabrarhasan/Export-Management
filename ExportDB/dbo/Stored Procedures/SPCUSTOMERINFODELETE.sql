CREATE PROCEDURE SPCUSTOMERINFODELETE
    @ID INT,
    @Msg CHAR(100) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Soft delete: mark ISACTIVE = 0
    UPDATE CustomerInfo
    SET ISACTIVE = 0,
        UPDATEDDATE = GETDATE()
    WHERE ID = @ID;

    SET @Msg = 'Customer deleted successfully';
END