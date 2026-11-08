CREATE FUNCTION dbo.NumberToWords (@Number DECIMAL(18, 2))
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Words NVARCHAR(MAX)
    DECLARE @IntegerPart BIGINT
    DECLARE @FractionPart INT

    -- Splitting the number into integer and fractional parts
    SET @IntegerPart = FLOOR(@Number)
    SET @FractionPart = ROUND((@Number - @IntegerPart) * 100, 0)

    -- Convert integer part to words
    SET @Words = dbo.IntegerToWords(@IntegerPart)

    -- Handle fractional part if present
    IF @FractionPart > 0
    BEGIN
        SET @Words = @Words + ' and ' + dbo.IntegerToWords(@FractionPart) + ' Taka'
    END

    RETURN @Words
END