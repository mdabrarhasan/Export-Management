--SELECT DBO.towords(28)

CREATE FUNCTION [dbo].[towords] (
  @M_AMOUNT AS DECIMAL(18,2)
) RETURNS VARCHAR(100)
BEGIN
  DECLARE @M_FIRST AS VARCHAR(50)
  DECLARE @M_LAST AS VARCHAR(50)
  
  SELECT @M_FIRST = 
    CASE WHEN CAST(@M_AMOUNT AS NUMERIC) >= 10 AND CAST(@M_AMOUNT AS NUMERIC) <= 19 THEN
      CASE CAST(@M_AMOUNT AS NUMERIC) 
        WHEN 10 THEN 'Ten'
        WHEN 11 THEN 'Eleven'
        WHEN 12 THEN 'Twelve'
        WHEN 13 THEN 'Thirteen'
        WHEN 14 THEN 'Fourteen'
        WHEN 15 THEN 'Fifteen'
        WHEN 16 THEN 'Sixteen'
        WHEN 17 THEN 'Seventeen'
        WHEN 18 THEN 'Eighteen'
        WHEN 19 THEN 'Nineteen'
        ELSE ''  
      END
    ELSE
      CASE WHEN LEN(CAST(@M_AMOUNT AS NUMERIC)) = 2 THEN
        CASE LEFT(CAST(@M_AMOUNT AS NUMERIC),1) 
          WHEN  2 THEN 'Twenty '
          WHEN  3 THEN 'Thirty '
          WHEN  4 THEN 'Forty '
          WHEN  5 THEN 'Fifty '
          WHEN  6 THEN 'Sixty '
          WHEN  7 THEN 'Seventy '
          WHEN  8 THEN 'Eighty '
          WHEN  9 THEN 'Ninety '
          ELSE ''
        END
      ELSE
        ''
      END
    END

  SELECT @M_LAST = 
  CASE WHEN CAST(@M_AMOUNT AS NUMERIC) >= 10 AND CAST(@M_AMOUNT AS NUMERIC) <= 19 THEN
    ''
  ELSE
    CASE RIGHT(CAST(@M_AMOUNT AS NUMERIC),1) 
      WHEN  1 THEN 'One'
      WHEN  2 THEN 'Two'
      WHEN  3 THEN 'Three'
      WHEN  4 THEN 'Four'
      WHEN  5 THEN 'Five'
      WHEN  6 THEN 'Six'
      WHEN  7 THEN 'Seven'
      WHEN  8 THEN 'Eight'
      WHEN  9 THEN 'Nine'
      ELSE ''
    END
  END

  RETURN RTRIM(LTRIM(@M_FIRST + @M_LAST))
END