
-- =============================================
-- Author:		<Fahim,Hossain>
-- Create date: <21/10/24>
-- Description:	<Total amount for JuteInvoiceReport>
-- =============================================

-- EXEC SpGetJuteInvoiceReportTotalInWords 1130

CREATE PROCEDURE [dbo].[SpGetJuteInvoiceReportTotalInWords]
     @data as varchar(50)
AS
BEGIN
    -- Declare a variable to store the total sum
    DECLARE @TotalAmount BIGINT;

    -- Calculate the total amount (sum of PRICE * QUANTITY)
    SELECT @TotalAmount = SUM(PILINE.PRICE * PILINE.QUANTITY)
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
        LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
            ON Head.ID = Line.PACKINGREQUESTHEADERID
        LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
            ON Line.ITEMID = PILINE.ITEMID
        INNER JOIN ERP_SAD.dbo.tblItem AS Item
            ON Line.ITEMID = Item.intID
    WHERE Head.PACKREQNUMBER = @data;

   
    IF @TotalAmount IS NULL
    BEGIN
        SELECT 'No data found for this Packing Request Header ID.' AS Message;
    END
    ELSE
    BEGIN
        -- Return the total sum in words
        SELECT dbo.NumberToWords(@TotalAmount) AS TotalAmountInWords;
    END
END