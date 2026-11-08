-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <06-11-24>
-- Description:	<Convert decimal to words>
-- =============================================
Create FUNCTION [dbo].[fnDecimalNumberToWords](@Number AS DECIMAL(38, 18))
RETURNS VARCHAR(2048)
AS
BEGIN
    DECLARE @Below20 TABLE (ID INT IDENTITY(0,1), Word VARCHAR(32))
    DECLARE @Below100 TABLE (ID INT IDENTITY(2,1), Word VARCHAR(32))

    -- Populating the tables with words for numbers
    INSERT @Below20 (Word) VALUES
        ('Zero'), ('One'), ('Two'), ('Three'),
        ('Four'), ('Five'), ('Six'), ('Seven'),
        ('Eight'), ('Nine'), ('Ten'), ('Eleven'),
        ('Twelve'), ('Thirteen'), ('Fourteen'),
        ('Fifteen'), ('Sixteen'), ('Seventeen'),
        ('Eighteen'), ('Nineteen')

    INSERT @Below100 VALUES ('Twenty'), ('Thirty'), ('Forty'), ('Fifty'),
                            ('Sixty'), ('Seventy'), ('Eighty'), ('Ninety')

    -- Declare variables for integer and decimal parts
    DECLARE @IntegerPart BIGINT = FLOOR(@Number)
    DECLARE @DecimalPart DECIMAL(38, 18) = @Number - @IntegerPart
    DECLARE @DecimalWords VARCHAR(1024) = ''
    DECLARE @English VARCHAR(2048) = ''

    -- Function to convert integer part
    SET @English = (
        SELECT CASE
            WHEN @IntegerPart = 0 THEN 'Zero'
            WHEN @IntegerPart BETWEEN 1 AND 19
                THEN (SELECT Word FROM @Below20 WHERE ID=@IntegerPart)
            WHEN @IntegerPart BETWEEN 20 AND 99
                THEN (SELECT Word FROM @Below100 WHERE ID=@IntegerPart / 10) + '-' +
                    dbo.fnNumberToWords(@IntegerPart % 10)
            WHEN @IntegerPart BETWEEN 100 AND 999
                THEN dbo.fnNumberToWords(@IntegerPart / 100) + ' Hundred ' +
                    dbo.fnNumberToWords(@IntegerPart % 100)
            WHEN @IntegerPart BETWEEN 1000 AND 999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000) + ' Thousand ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000)
            WHEN @IntegerPart BETWEEN 1000000 AND 999999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000000) + ' Million ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000000)
            WHEN @IntegerPart BETWEEN 1000000000 AND 999999999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000000000) + ' Billion ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000000000)
            WHEN @IntegerPart BETWEEN 1000000000000 AND 999999999999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000000000000) + ' Trillion ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000000000000)
            WHEN @IntegerPart BETWEEN 1000000000000000 AND 999999999999999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000000000000000) + ' Quadrillion ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000000000000000)
            WHEN @IntegerPart BETWEEN 1000000000000000000 AND 999999999999999999999
                THEN dbo.fnNumberToWords(@IntegerPart / 1000000000000000000) + ' Quintillion ' +
                    dbo.fnNumberToWords(@IntegerPart % 1000000000000000000)
            ELSE ' INVALID INPUT' END
    )

    -- Process the decimal part if it exists
    IF @DecimalPart > 0
    BEGIN
        SET @DecimalWords = ' Point'
        
        -- Convert each decimal digit to word
        DECLARE @Digit CHAR(1)
        WHILE LEN(CAST(@DecimalPart AS VARCHAR(38))) > 0
        BEGIN
            SET @Digit = LEFT(CAST(@DecimalPart * 10 AS VARCHAR(38)), 1)
            SET @DecimalWords = @DecimalWords + ' ' + (SELECT Word FROM @Below20 WHERE ID = CAST(@Digit AS INT))
            SET @DecimalPart = (@DecimalPart * 10) - FLOOR(@DecimalPart * 10)
        END
    END

    -- Concatenate integer part and decimal part words
    RETURN RTRIM(@English) + @DecimalWords
END