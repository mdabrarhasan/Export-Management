-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <27/10/24>
-- Description:	<TO get PackingReQuest Details View(MODE) >
-- =============================================

-- EXEC  SPGetPackingRequestLandingHeader 88

CREATE PROCEDURE [dbo].[SPGetPackingRequestLandingHeader]
    @ID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
	ID,
        INVOICENUMBER,
        INVOICEDATE,
        INVOICETO,
        SHIPPEDFROM,
        SHIPPEDTO,
        SHIPPEDPER,
        CONTRACTNO,
        PACKREQDATE,
        SHIPMENTPERIOD,
        PURCHASEORDERNO,
        PURCHASEORDERDATED,
		PACKREQNUMBER,
		PISCNUMBER
    FROM 
        ABGAPIS.dbo.TBLPACKINGREQUESTHEADER
    WHERE 
        ID = @ID;
END