
-- Delete customer
CREATE PROCEDURE SP_DeleteCustomerInfo
    @ID INT
AS
BEGIN
    DELETE FROM CustomerInfoX WHERE ID = @ID
END