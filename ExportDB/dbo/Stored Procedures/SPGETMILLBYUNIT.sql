CREATE   PROCEDURE [dbo].[SPGETMILLBYUNIT]
    @UNITID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        m.ID,
        m.MillName + ' - ' + l.Name AS Name
    FROM TBLLOCATION l
    JOIN TBLMILL m ON m.LOCATIONID = l.ID
    WHERE l.UNITID = @UNITID
    ORDER BY m.MillName, l.Name;
END