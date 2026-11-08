
CREATE PROCEDURE spxOrderCrud
@type INT,
@OrderId INT,
@RetailerId INT,
@DealerId INT,
@ExecutiveId INT,
@SupervisorId INT,
@Status NVARCHAR(50),
@TotalAmount DECIMAL(18,2),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Orders WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Orders WHERE OrderId = @OrderId AND IsActive = 1;

IF @type = 3
INSERT INTO Orders(RetailerId, DealerId, ExecutiveId, SupervisorId, Status, TotalAmount, CreatedBy)
VALUES(@RetailerId, @DealerId, @ExecutiveId, @SupervisorId, @Status, @TotalAmount, @CreatedBy);

IF @type = 4
UPDATE Orders
SET RetailerId=@RetailerId,
    DealerId=@DealerId,
    ExecutiveId=@ExecutiveId,
    SupervisorId=@SupervisorId,
    Status=@Status,
    TotalAmount=@TotalAmount,
    UpdatedBy=@CreatedBy,
    UpdatedDate=GETDATE()
WHERE OrderId=@OrderId;

IF @type = 5
UPDATE Orders SET IsActive=0 WHERE OrderId=@OrderId;

END