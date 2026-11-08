-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <31-1-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprReportCOfOrigin] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT '30 DAYS DEFERRED' payment, '3920.69.20' hscode,'ABFL/ARB/2023/0027 ' invoice
	,'1-2-2023' date,'22J024' PI,'ARBAB  PACK LIMITED ' Buyername,
	'SHIMRAIL, DEMRA ROAD SIDDIRGANJ,NARAYANGANJ, BANGLADESH' BuyerAddress,'000002786-0004' BIN_NO,
	'BA136626 / 260326120040719' IRC_NO,'BRAC BANK LIMITED' bankname,
	'ANIK TOWER, 220B, TAJGAON LINK ROAD,DHAKA-1208, BANGLADESH' bankaddress,
	'SHIMRAIL, DEMRA ROAD SIDDIRGANJ, NARAYANGANJ,  (INCOTERM-2020)' APPLICANT_FACTORY,
	'308523990014' DOCUMENTARY_CREDIT_NO
END