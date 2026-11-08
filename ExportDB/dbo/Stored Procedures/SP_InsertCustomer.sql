CREATE PROCEDURE SP_InsertCustomer
    @Name NVARCHAR(100),
    @Email NVARCHAR(100)
AS
BEGIN
    INSERT INTO Customers(Name, Email)
    VALUES(@Name, @Email)
END