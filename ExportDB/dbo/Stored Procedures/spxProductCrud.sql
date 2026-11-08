
-- exec [dbo].[spxProductCrud] 1,1,'',45,1,1

CREATE PROCEDURE [dbo].[spxProductCrud]
@type INT,
@ProductId INT,
@ProductName NVARCHAR(100),
@Price DECIMAL(18,2),
@StockQuantity INT,
@CreatedBy INT
AS
BEGIN

IF @type = 1
--SELECT ProductId,ProductName,Price,StockQuantity,* FROM Products WHERE IsActive = 1

SELECT * FROM Products WHERE IsActive = 1

IF @type = 2
SELECT * FROM Products WHERE ProductId = @ProductId AND IsActive = 1;

IF @type = 3
INSERT INTO Products(ProductName, Price, StockQuantity, CreatedBy)
VALUES(@ProductName, @Price, @StockQuantity, @CreatedBy);

IF @type = 4
UPDATE Products
SET ProductName=@ProductName, Price=@Price, StockQuantity=@StockQuantity,
    UpdatedBy=@CreatedBy, UpdatedDate=GETDATE()
WHERE ProductId=@ProductId;

IF @type = 5
UPDATE Products SET IsActive=0 WHERE ProductId=@ProductId;

END