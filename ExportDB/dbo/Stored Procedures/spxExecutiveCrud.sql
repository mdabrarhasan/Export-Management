
CREATE PROCEDURE spxExecutiveCrud
@type INT,
@ExecutiveId INT,
@Name NVARCHAR(100),
@ContactInfo NVARCHAR(255),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Executives WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Executives WHERE ExecutiveId = @ExecutiveId AND IsActive = 1;

IF @type = 3
INSERT INTO Executives(Name, ContactInfo, CreatedBy)
VALUES(@Name, @ContactInfo, @CreatedBy);

IF @type = 4
UPDATE Executives
SET Name=@Name, ContactInfo=@ContactInfo,
    UpdatedBy=@CreatedBy, UpdatedDate=GETDATE()
WHERE ExecutiveId=@ExecutiveId;

IF @type = 5
UPDATE Executives SET IsActive=0 WHERE ExecutiveId=@ExecutiveId;

END