
Create PROCEDURE spxRetailerCrud
@type INT,
@RetailerId INT,
@Name NVARCHAR(100),
@Address NVARCHAR(255),
@ContactNumber NVARCHAR(20),
@CreatedBy INT
AS
BEGIN

IF @type = 1
SELECT * FROM Retailers WHERE IsActive = 1;

IF @type = 2
SELECT * FROM Retailers WHERE RetailerId = @RetailerId AND IsActive = 1;

IF @type = 3
INSERT INTO Retailers(Name, Address, ContactNumber, CreatedBy)
VALUES(@Name, @Address, @ContactNumber, @CreatedBy);

IF @type = 4
UPDATE Retailers
SET Name=@Name, Address=@Address, ContactNumber=@ContactNumber,
    UpdatedBy=@CreatedBy, UpdatedDate=GETDATE()
WHERE RetailerId=@RetailerId;

IF @type = 5
UPDATE Retailers SET IsActive=0 WHERE RetailerId=@RetailerId;

END