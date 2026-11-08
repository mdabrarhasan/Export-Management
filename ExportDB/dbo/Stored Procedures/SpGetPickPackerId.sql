-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <14-11-2024>
-- Description:	<I need the masterID>
-- =============================================
CREATE PROCEDURE SpGetPickPackerId
	@ID int
AS
BEGIN
	 select PPH.ID from ABGAPIS.dbo.TBLAPPROVERMATRIXHISTORY as HS
INNER JOIN  ABGAPIS.dbo.TBLPICKINGPACKINGHEADER as PPH
on HS.PROCESSID = PPH.ID AND HS.PROCESSCODE Like '%PRC%'
where HS.ID = @ID
;
END