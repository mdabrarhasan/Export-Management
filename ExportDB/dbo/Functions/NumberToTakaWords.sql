CREATE FUNCTION dbo.NumberToTakaWords(@amount DECIMAL(18,2))
RETURNS NVARCHAR(MAX)
AS
BEGIN
  DECLARE @integerPart BIGINT = FLOOR(@amount)
    DECLARE @decimalPart INT = ROUND((@amount - @integerPart) * 100, 0)
    DECLARE @result NVARCHAR(MAX) = ''
    DECLARE @remainingAfterBillion BIGINT
    DECLARE @remainingAfterMillion BIGINT
    DECLARE @remainingAfterThousand BIGINT
    
    -- Handle zero case
    IF @integerPart = 0 AND @decimalPart = 0
        RETURN 'ZERO TAKA ONLY'
    
    -- Convert integer part (Taka)
    IF @integerPart > 0
    BEGIN
        -- Process billions
        IF @integerPart >= 1000000000
        BEGIN
            SET @result = dbo.ConvertLessThan1000(@integerPart/1000000000) + ' BILLION'
            SET @remainingAfterBillion = @integerPart % 1000000000
            
            IF @remainingAfterBillion > 0
            BEGIN
                -- Process millions
                SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterBillion/1000000) + ' MILLION'
                SET @remainingAfterMillion = @remainingAfterBillion % 1000000
                
                IF @remainingAfterMillion > 0
                BEGIN
                    -- Process thousands
                    SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterMillion/1000) + ' THOUSAND'
                    SET @remainingAfterThousand = @remainingAfterMillion % 1000
                    
                    IF @remainingAfterThousand > 0
                        SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterThousand)
                END
            END
        END
        -- Process millions (if less than 1 billion)
        ELSE IF @integerPart >= 1000000
        BEGIN
            SET @result = dbo.ConvertLessThan1000(@integerPart/1000000) + ' MILLION'
            SET @remainingAfterMillion = @integerPart % 1000000
            
            IF @remainingAfterMillion > 0
            BEGIN
                -- Process thousands
                SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterMillion/1000) + ' THOUSAND'
                SET @remainingAfterThousand = @remainingAfterMillion % 1000
                
                IF @remainingAfterThousand > 0
                    SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterThousand)
            END
        END
        -- Process thousands (if less than 1 million)
        ELSE IF @integerPart >= 1000
        BEGIN
            SET @result = dbo.ConvertLessThan1000(@integerPart/1000) + ' THOUSAND'
            SET @remainingAfterThousand = @integerPart % 1000
            
            IF @remainingAfterThousand > 0
                SET @result = @result + ' ' + dbo.ConvertLessThan1000(@remainingAfterThousand)
        END
        -- Process hundreds (if less than 1 thousand)
        ELSE
            SET @result = dbo.ConvertLessThan1000(@integerPart)
        
        SET @result = UPPER(LTRIM(RTRIM(@result))) + ' TAKA'
    END
    
    -- Convert decimal part (Paisa)
    IF @decimalPart > 0
    BEGIN
        DECLARE @paisaWords NVARCHAR(100) = dbo.ConvertLessThan100(@decimalPart)
        
        IF LEN(@result) > 0
            SET @result = @result + ' AND ' + UPPER(LTRIM(RTRIM(@paisaWords))) + ' PAISA'
        ELSE
            SET @result = UPPER(LTRIM(RTRIM(@paisaWords))) + ' PAISA'
    END
    
    RETURN @result + ' ONLY'
END