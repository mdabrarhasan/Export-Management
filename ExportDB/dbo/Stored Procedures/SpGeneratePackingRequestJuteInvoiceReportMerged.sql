-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <22-10-2024>
-- Description:	<to get the PackingReqHeader>
-- =============================================
CREATE PROCEDURE [dbo].[SpGeneratePackingRequestJuteInvoiceReportMerged]
AS
BEGIN
	SELECT  PACKREQNUMBER 
  FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER
 ORDER BY ID desc;
END