-- =============================================
-- Author:		<Fahim,Hossain Rafayet>
-- Create date: <22/10/24>
-- Description:	<Merge All Three sp into one>
-- =============================================
CREATE PROCEDURE [dbo].[SpGenerateJuteInvoiceReport]
    @ID AS VARCHAR(50)
AS
BEGIN
    -- Call the first stored procedure
    EXEC [dbo].[SpGetJuteInvoiceReportTotalInWords] @ID;

    -- Call the second stored procedure
    EXEC [dbo].[SpGetAllDetailsForJuteInvoiceReport] @ID;

    -- Call the third stored procedure
    EXEC [dbo].[GetJuteInvoiceReportHeaders] @ID;
END