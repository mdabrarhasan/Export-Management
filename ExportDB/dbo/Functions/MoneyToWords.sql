-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <06-11-24>
-- Description:	<Convert decimal to words>
-- =============================================
CREATE FUNCTION MoneyToWords(@Number DECIMAL(17,2), @Lang char(2) = 'en')
RETURNS NVARCHAR(MAX)
AS 
BEGIN
	RETURN dbo.MoneyToWords_EN(@Number)
	
END