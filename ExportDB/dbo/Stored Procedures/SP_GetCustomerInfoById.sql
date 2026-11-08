
-- Get customer by ID
CREATE PROCEDURE SP_GetCustomerInfoById
    @ID INT
AS
BEGIN
    SELECT *
    FROM CustomerInfoX
    WHERE ID = @ID
END