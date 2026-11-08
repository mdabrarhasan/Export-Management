
CREATE PROCEDURE spxLogCrud
@type INT,
@LogId INT,
@OrderId INT,
@Action NVARCHAR(255),
@PerformedBy NVARCHAR(100),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Logs WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Logs WHERE LogId = @LogId AND IsActive = 1;

IF @type = 3
INSERT INTO Logs(OrderId, Action, PerformedBy, CreatedBy)
VALUES(@OrderId, @Action, @PerformedBy, @CreatedBy);

IF @type = 4
UPDATE Logs
SET OrderId=@OrderId,
    Action=@Action,
    PerformedBy=@PerformedBy,
    UpdatedBy=@CreatedBy,
    UpdatedDate=GETDATE()
WHERE LogId=@LogId;

IF @type = 5
UPDATE Logs SET IsActive=0 WHERE LogId=@LogId;

END