-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <14-11-2024>
-- Description:	<I need the masterID>
-- =============================================

-- EXEC SpGetPickPackerIdbyMaster 630

CREATE PROCEDURE SpGetPickPackerIdbyMaster
	@ID int
AS
BEGIN
	 select PPH.ID from ABGAPIS.dbo.TBLAPPROVERMATRIXHISTORY as HS
INNER JOIN  ABGAPIS.dbo.TBLPICKINGPACKINGHEADER as PPH
on HS.PROCESSID = PPH.ID
where HS.ID = @ID
;
END