-- exec sprItemsTestCRUD 'SELECTBYID', 2
CREATE PROCEDURE sprItemsTestCRUD
    @OperationType NVARCHAR(50),
    @intItemId INT = NULL,
    @intItemCode INT = NULL,
    @intCategoryId INT = NULL,
    @strItemName VARCHAR(100) = NULL,
    @intUnitPrice INT = NULL,
    @intStockQuantity INT = NULL,
    @intCreatedBy INT = NULL,
    @intUpdatedBy INT = NULL,
    @dteCreated DATETIME = NULL,
    @dteUpdated DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @OperationType = 'SELECT'
    BEGIN
        SELECT * FROM tblItemsTest WHERE ynsActive = 1;
    END

    ELSE IF @OperationType = 'SELECTBYID'
    BEGIN
        SELECT * FROM tblItemsTest WHERE intItemId = @intItemId and ynsActive=1;
    END

    ELSE IF @OperationType = 'INSERT'
    BEGIN
        INSERT INTO tblItemsTest 
        (
            intItemCode,
            intCategoryId,
            strItemName,
            intUnitPrice,
            intStockQuantity,
            ynsActive,
            intCreatedBy,
            intUpdatedBy,
            dteCreated,
            dteUpdated
        )
        VALUES
        (
            @intItemCode,
            @intCategoryId,
            @strItemName,
            @intUnitPrice,
            @intStockQuantity,
            1,
            @intCreatedBy,
            NULL,
            GETDATE(),
            NULL
        );
        
        SELECT SCOPE_IDENTITY() AS NewItemId;
    END

    ELSE IF @OperationType = 'UPDATE'
    BEGIN
        UPDATE tblItemsTest
        SET 
            intItemCode = ISNULL(@intItemCode, intItemCode),
            intCategoryId = ISNULL(@intCategoryId, intCategoryId),
            strItemName = ISNULL(@strItemName, strItemName),
            intUnitPrice = ISNULL(@intUnitPrice, intUnitPrice),
            intStockQuantity = ISNULL(@intStockQuantity, intStockQuantity),
            intUpdatedBy = @intUpdatedBy,
            dteUpdated = GETDATE()
        WHERE intItemId = @intItemId;
        
        SELECT @@ROWCOUNT AS RowsAffected;
    END

    ELSE IF @OperationType = 'DELETE'
    BEGIN
        UPDATE tblItemsTest
        SET 
            ynsActive = 0,
            intUpdatedBy = @intUpdatedBy,
            dteUpdated = GETDATE()
        WHERE intItemId = @intItemId;
        
        SELECT @@ROWCOUNT AS RowsAffected;
    END

    ELSE
    BEGIN
        PRINT 'Invalid OperationType! Use: SELECT, SELECTBYID, INSERT, UPDATE, DELETE';
    END
END