CREATE PROCEDURE [dbo].[sprProductCrud]
    @type           INT,
    @intProductId   INT,
    @strName        VARCHAR(150),
    @strProductCode VARCHAR(50),
    @decPrice       DECIMAL(18,2),
    @intStockQty    INT,
    @strDescription VARCHAR(500),
    @intEnroll      INT
AS
BEGIN
    IF @type = 1 -- Read all products
    BEGIN
        SELECT intProductId, strProductName, strProductCode, decPrice, intStockQty, strDescription, dtCreatedDate
        FROM ABGAPIS.dbo.tblProduct
        WHERE isActive = 1;
    END
 
    IF @type = 2 -- Read product by ID
    BEGIN
        SELECT intProductId, strProductName, strProductCode, decPrice, intStockQty, strDescription, dtCreatedDate
        FROM ABGAPIS.dbo.tblProduct
        WHERE isActive = 1 AND intProductId = @intProductId;
    END
 
    IF @type = 3 -- Insert product
    BEGIN
        INSERT INTO ABGAPIS.dbo.tblProduct (strProductName, strProductCode, decPrice, intStockQty, strDescription, dtCreatedDate)
        VALUES (@strName, @strProductCode, @decPrice, @intStockQty, @strDescription, GETDATE());
    END
 
    IF @type = 4 -- Update product
    BEGIN
        UPDATE ABGAPIS.dbo.tblProduct
        SET strProductName  = @strName,
            strProductCode  = @strProductCode,
            decPrice        = @decPrice,
            intStockQty     = @intStockQty,
            strDescription  = @strDescription,
            dtUpdatedDate   = GETDATE()
        WHERE intProductId = @intProductId;
    END
 
    IF @type = 5 -- Soft delete product
    BEGIN
        UPDATE ABGAPIS.dbo.tblProduct
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intProductId = @intProductId;
    END
END