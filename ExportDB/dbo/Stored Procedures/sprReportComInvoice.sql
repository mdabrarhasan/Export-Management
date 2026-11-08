-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprReportComInvoice] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT  'ARB/2023/0027' ABFL, '308523990014  '  DOCUMENTARY_CREDIT_NO,
	'22J024'    PI , 'PACK LIMITED ' ARBAB ,
	   ' BANK LIMITED'   BRAC, '30 DAYS DEFERRED'  Payment
	,  '3920.69.20'  HSCODE,'CORONA TREATED POLYESTER FILM' NON_PRINTED
END