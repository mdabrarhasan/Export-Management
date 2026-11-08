CREATE FUNCTION dbo.ConvertLessThan1000(@number INT)
RETURNS NVARCHAR(100)
AS
BEGIN
    DECLARE @result NVARCHAR(100) = ''
    
    IF @number < 100
        SET @result = dbo.ConvertLessThan100(@number)
    ELSE
        SET @result = dbo.ConvertLessThan100(@number/100) + ' HUNDRED' + 
                     CASE WHEN @number%100 > 0 THEN ' ' + dbo.ConvertLessThan100(@number%100) ELSE '' END
    
    RETURN @result
END