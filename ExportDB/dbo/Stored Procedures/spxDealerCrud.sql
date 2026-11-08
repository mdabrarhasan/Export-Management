
CREATE PROCEDURE spxDealerCrud
@type INT,
@DealerId INT,
@Name NVARCHAR(100),
@ContactInfo NVARCHAR(255),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Dealers WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Dealers WHERE DealerId = @DealerId AND IsActive = 1;

IF @type = 3
INSERT INTO Dealers(Name, ContactInfo, CreatedBy)
VALUES(@Name, @ContactInfo, @CreatedBy);

IF @type = 4
UPDATE Dealers
SET Name=@Name, ContactInfo=@ContactInfo,
    UpdatedBy=@CreatedBy, UpdatedDate=GETDATE()
WHERE DealerId=@DealerId;

IF @type = 5
UPDATE Dealers SET IsActive=0 WHERE DealerId=@DealerId;

END