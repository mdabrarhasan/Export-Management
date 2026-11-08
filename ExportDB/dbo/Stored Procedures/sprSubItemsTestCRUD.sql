CREATE PROCEDURE sprSubItemsTestCRUD
    @OperationType NVARCHAR(50),
    @intSubItemId INT = NULL,
    @intItemId INT = NULL,
    @intSubItemCode INT = NULL,
    @intCategoryId INT = NULL,
    @strSubItemName VARCHAR(100) = NULL,
    @intUnitPrice INT = NULL,
    @intStockQuantity INT = NULL,
    @intCreatedBy INT = NULL,
    @intUpdatedBy INT = NULL,
    @dteCreated DATETIME = NULL,
    @dteUpdated DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- SELECT all active sub-items
    IF @OperationType = 'SELECT'
    BEGIN
        SELECT * FROM tblSubItemsTest WHERE ynsActive = 1;
    END

    -- SELECT sub-item by its own ID
    ELSE IF @OperationType = 'SELECTBYID'
    BEGIN
        SELECT * FROM tblSubItemsTest 
        WHERE intSubItemId = @intSubItemId AND ynsActive = 1;
    END

    -- SELECT all sub-items of a specific parent item
    ELSE IF @OperationType = 'SELECTBYITEMID'
    BEGIN
        SELECT * FROM tblSubItemsTest 
        WHERE intItemId = @intItemId AND ynsActive = 1;
    END

    -- INSERT new sub-item
    ELSE IF @OperationType = 'INSERT'
    BEGIN
        INSERT INTO tblSubItemsTest 
        (
            intItemId,
            intSubItemCode,
            intCategoryId,
            strSubItemName,
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
            @intItemId,
            @intSubItemCode,
            @intCategoryId,
            @strSubItemName,
            @intUnitPrice,
            @intStockQuantity,
            1,
            @intCreatedBy,
            NULL,
            GETDATE(),
            NULL
        );
        
        SELECT SCOPE_IDENTITY() AS NewSubItemId;
    END

    -- UPDATE existing sub-item
    ELSE IF @OperationType = 'UPDATE'
    BEGIN
        UPDATE tblSubItemsTest
        SET 
            intItemId = ISNULL(@intItemId, intItemId),
            intSubItemCode = ISNULL(@intSubItemCode, intSubItemCode),
            intCategoryId = ISNULL(@intCategoryId, intCategoryId),
            strSubItemName = ISNULL(@strSubItemName, strSubItemName),
            intUnitPrice = ISNULL(@intUnitPrice, intUnitPrice),
            intStockQuantity = ISNULL(@intStockQuantity, intStockQuantity),
            intUpdatedBy = @intUpdatedBy,
            dteUpdated = GETDATE()
        WHERE intSubItemId = @intSubItemId;
        
        SELECT @@ROWCOUNT AS RowsAffected;
    END

    -- DELETE (Soft delete - just deactivate)
    ELSE IF @OperationType = 'DELETE'
    BEGIN
        UPDATE tblSubItemsTest
        SET 
            ynsActive = 0,
            intUpdatedBy = @intUpdatedBy,
            dteUpdated = GETDATE()
        WHERE intSubItemId = @intSubItemId;
        
        SELECT @@ROWCOUNT AS RowsAffected;
    END

    -- Invalid operation type
    ELSE
    BEGIN
        PRINT 'Invalid OperationType! Use: SELECT, SELECTBYID, SELECTBYITEMID, INSERT, UPDATE, DELETE';
    END
END