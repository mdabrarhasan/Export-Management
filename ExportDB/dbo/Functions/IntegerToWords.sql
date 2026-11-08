
CREATE FUNCTION dbo.IntegerToWords (@Number BIGINT)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Words NVARCHAR(MAX)
    SET @Words = ''

    IF @Number = 0
    BEGIN
        SET @Words = 'Zero'
    END
    ELSE
    BEGIN
        -- Define arrays for words
        DECLARE @Ones TABLE (ID INT, Word NVARCHAR(20))
        INSERT INTO @Ones VALUES (1, 'One'), (2, 'Two'), (3, 'Three'), (4, 'Four'), (5, 'Five'),
                                  (6, 'Six'), (7, 'Seven'), (8, 'Eight'), (9, 'Nine')

        DECLARE @Teens TABLE (ID INT, Word NVARCHAR(20))
        INSERT INTO @Teens VALUES (10, 'Ten'), (11, 'Eleven'), (12, 'Twelve'), (13, 'Thirteen'), (14, 'Fourteen'),
                                  (15, 'Fifteen'), (16, 'Sixteen'), (17, 'Seventeen'), (18, 'Eighteen'), (19, 'Nineteen')

        DECLARE @Tens TABLE (ID INT, Word NVARCHAR(20))
        INSERT INTO @Tens VALUES (2, 'Twenty'), (3, 'Thirty'), (4, 'Forty'), (5, 'Fifty'),
                                  (6, 'Sixty'), (7, 'Seventy'), (8, 'Eighty'), (9, 'Ninety')

        DECLARE @Thousands TABLE (ID INT, Word NVARCHAR(20))
        INSERT INTO @Thousands VALUES (1, 'Thousand'), (2, 'Million'), (3, 'Billion')

        -- Function logic to build words
        WHILE @Number > 0
        BEGIN
            DECLARE @Part INT
            DECLARE @WordPart NVARCHAR(100)

            -- Billions
            IF @Number >= 1000000000
            BEGIN
                SET @Part = FLOOR(@Number / 1000000000)
                SET @Number = @Number % 1000000000
                SET @WordPart = dbo.IntegerToWords(@Part) + ' Billion'
            END
            -- Millions
            ELSE IF @Number >= 1000000
            BEGIN
                SET @Part = FLOOR(@Number / 1000000)
                SET @Number = @Number % 1000000
                SET @WordPart = dbo.IntegerToWords(@Part) + ' Million'
            END
            -- Thousands
            ELSE IF @Number >= 1000
            BEGIN
                SET @Part = FLOOR(@Number / 1000)
                SET @Number = @Number % 1000
                SET @WordPart = dbo.IntegerToWords(@Part) + ' Thousand'
            END
            -- Hundreds
            ELSE IF @Number >= 100
            BEGIN
                SET @Part = FLOOR(@Number / 100)
                SET @Number = @Number % 100
                SET @WordPart = dbo.IntegerToWords(@Part) + ' Hundred'
            END
            -- Tens
            ELSE IF @Number >= 20
            BEGIN
                SET @Part = FLOOR(@Number / 10)
                SET @Number = @Number % 10
                SELECT @WordPart = Word FROM @Tens WHERE ID = @Part
            END
            -- Teens
            ELSE IF @Number >= 10
            BEGIN
                SET @Part = @Number
                SET @Number = 0
                SELECT @WordPart = Word FROM @Teens WHERE ID = @Part
            END
            -- Ones
            ELSE
            BEGIN
                SET @Part = @Number
                SET @Number = 0
                SELECT @WordPart = Word FROM @Ones WHERE ID = @Part
            END

            -- Combine parts
            SET @Words = @Words + CASE WHEN LEN(@Words) > 0 THEN ' ' ELSE '' END + @WordPart
        END
    END

    RETURN @Words
END