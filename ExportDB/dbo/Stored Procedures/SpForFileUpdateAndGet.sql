-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <11/02/2024>
-- Description:	<For getting file and updating file>
-- =============================================

-- EXEC SpForFileUpdateAndGet 2,'PRE1','';

CREATE PROCEDURE SpForFileUpdateAndGet
    @Type INT,
    @PROCESSCODE VARCHAR(20),
    @FILENAME VARCHAR(20)
AS
BEGIN
    IF @Type = 1
    BEGIN
        UPDATE ABGAPIS.dbo.TBLFILEDETAILS
        SET FILENAME = @FILENAME
        WHERE PROCESSCODE = @PROCESSCODE;


    END
    ELSE IF @Type = 2
    BEGIN
        SELECT FILENAME 
        FROM ABGAPIS.dbo.TBLFILEDETAILS
        WHERE PROCESSCODE = @PROCESSCODE;
    END
END