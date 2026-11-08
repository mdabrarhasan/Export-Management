
CREATE PROCEDURE spxSupervisorCrud
@type INT,
@SupervisorId INT,
@Name NVARCHAR(100),
@ContactInfo NVARCHAR(255),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Supervisors WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Supervisors WHERE SupervisorId = @SupervisorId AND IsActive = 1;

IF @type = 3
INSERT INTO Supervisors(Name, ContactInfo, CreatedBy)
VALUES(@Name, @ContactInfo, @CreatedBy);

IF @type = 4
UPDATE Supervisors
SET Name=@Name, ContactInfo=@ContactInfo,
    UpdatedBy=@CreatedBy, UpdatedDate=GETDATE()
WHERE SupervisorId=@SupervisorId;

IF @type = 5
UPDATE Supervisors SET IsActive=0 WHERE SupervisorId=@SupervisorId;

END