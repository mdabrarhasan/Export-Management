CREATE FUNCTION dbo.ConvertLessThan100(@number INT)
RETURNS NVARCHAR(100)
AS
BEGIN
    DECLARE @result NVARCHAR(100) = ''
    
    -- Create number-word mappings
    DECLARE @below20 TABLE (id INT, word NVARCHAR(32))
    DECLARE @tens TABLE (id INT, word NVARCHAR(32))
    
    INSERT INTO @below20 VALUES
    (0, ''), (1, 'ONE'), (2, 'TWO'), (3, 'THREE'), (4, 'FOUR'), (5, 'FIVE'),
    (6, 'SIX'), (7, 'SEVEN'), (8, 'EIGHT'), (9, 'NINE'), (10, 'TEN'),
    (11, 'ELEVEN'), (12, 'TWELVE'), (13, 'THIRTEEN'), (14, 'FOURTEEN'),
    (15, 'FIFTEEN'), (16, 'SIXTEEN'), (17, 'SEVENTEEN'), (18, 'EIGHTEEN'),
    (19, 'NINETEEN')
    
    INSERT INTO @tens VALUES
    (2, 'TWENTY'), (3, 'THIRTY'), (4, 'FORTY'), (5, 'FIFTY'),
    (6, 'SIXTY'), (7, 'SEVENTY'), (8, 'EIGHTY'), (9, 'NINETY')
    
    -- Convert numbers less than 100
    IF @number < 20
        SET @result = (SELECT word FROM @below20 WHERE id = @number)
    ELSE
        SET @result = (SELECT word FROM @tens WHERE id = @number/10) + 
                     CASE WHEN @number%10 > 0 THEN ' ' + (SELECT word FROM @below20 WHERE id = @number%10) ELSE '' END
    
    RETURN @result
END