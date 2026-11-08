--Declare @word varchar(500);
--select @word = dbo.AmountToWords(70001154.55);
--select @word

CREATE FUNCTION dbo.IntegerToWords2 (@Number BIGINT)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Ones TABLE (ID INT, Word NVARCHAR(20))
    INSERT INTO @Ones VALUES
        (0,'ZERO'),(1,'ONE'),(2,'TWO'),(3,'THREE'),(4,'FOUR'),(5,'FIVE'),
        (6,'SIX'),(7,'SEVEN'),(8,'EIGHT'),(9,'NINE'),(10,'TEN'),(11,'ELEVEN'),
        (12,'TWELVE'),(13,'THIRTEEN'),(14,'FOURTEEN'),(15,'FIFTEEN'),(16,'SIXTEEN'),
        (17,'SEVENTEEN'),(18,'EIGHTEEN'),(19,'NINETEEN')

    DECLARE @Tens TABLE (ID INT, Word NVARCHAR(20))
    INSERT INTO @Tens VALUES
        (2,'TWENTY'),(3,'THIRTY'),(4,'FORTY'),(5,'FIFTY'),
        (6,'SIXTY'),(7,'SEVENTY'),(8,'EIGHTY'),(9,'NINETY')

    DECLARE @Result NVARCHAR(MAX) = ''

    IF @Number = 0
        RETURN 'ZERO'

    DECLARE @Billion INT = @Number / 1000000000
    SET @Number = @Number % 1000000000

    DECLARE @Million INT = @Number / 1000000
    SET @Number = @Number % 1000000

    DECLARE @Thousand INT = @Number / 1000
    SET @Number = @Number % 1000

    DECLARE @Hundred INT = @Number / 100
    SET @Number = @Number % 100

    IF @Billion > 0
        SET @Result = @Result + dbo.IntegerToWords(@Billion) + ' BILLION '

    IF @Million > 0
        SET @Result = @Result + dbo.IntegerToWords(@Million) + ' MILLION '

    IF @Thousand > 0
        SET @Result = @Result + dbo.IntegerToWords(@Thousand) + ' THOUSAND '

    IF @Hundred > 0
        SET @Result = @Result + dbo.IntegerToWords(@Hundred) + ' HUNDRED '

    IF @Number > 0
    BEGIN
        IF LEN(@Result) > 0
            SET @Result = @Result + ''

        IF @Number < 20
            SELECT @Result = @Result + Word + ' ' FROM @Ones WHERE ID = @Number
        ELSE
        BEGIN
            DECLARE @TensDigit INT = @Number / 10
            DECLARE @UnitDigit INT = @Number % 10

            SELECT @Result = @Result + Word + ' ' FROM @Tens WHERE ID = @TensDigit

            IF @UnitDigit > 0
                SELECT @Result = @Result + Word + ' ' FROM @Ones WHERE ID = @UnitDigit
        END
    END

    RETURN RTRIM(@Result)
END



--alter FUNCTION dbo.AmountToWords
--(
--    @Number DECIMAL(18,2)
--)
--RETURNS NVARCHAR(MAX)
--AS
--BEGIN
--    DECLARE @IntegerPart BIGINT = FLOOR(@Number)
--    DECLARE @FractionPart INT = ROUND((@Number - @IntegerPart) * 100, 0)
--    DECLARE @Words NVARCHAR(MAX)

--    SET @Words = dbo.IntegerToWords(@IntegerPart) + ' TAKA'

--    IF @FractionPart > 0
--        SET @Words = @Words + ' & ' + dbo.IntegerToWords(@FractionPart) + ' PAISA'

--    RETURN UPPER(RTRIM(@Words) + ' ONLY')
--END