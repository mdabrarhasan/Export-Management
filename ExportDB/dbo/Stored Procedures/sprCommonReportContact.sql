-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
Create PROCEDURE [dbo].[sprCommonReportContact] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT  '@S/8177  ' COntact_NO,'25-11-2023' Date,
	  '143 018 1108 23'  Invoice_NO,'48,100.00' USD,
	  'ORIENTAL WEAVERS CARPET 
	  10TH OF RAMADAN CITY
	  EGYPT' buyeraddress,'free_text' free_txt
END