-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprReportBOE1] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT ' 21.01.2023' DATE, 'ARB/2023/0027' ABFL,'Brac Bank' buyerBank,
	'ANIK TOWER, 220B, TAJGAON LINK ROAD,DHAKA-1208, BANGLADESH' bankaddress, '000000203-0101' bin,
	'@30 DAYS  DEFERRED' Delivery_Challan,'308523990014  DATE: 19.01.2023'  DOCUMENTARY_CREDIT_NO,
	'DATE: 31.12.2022'    PI22J024 , '829,063.00'  BDT ,
	' EIGHT HUNDRED TWENTY NINE THOUSAND SIXTY THREE TAKA & TWENTY NINE PAISA ONLY'  IN_WORDS,'PRIME  BANK  LIMITED'
sellerbankname,'RICHMOND  CONCORD (2ND FLOOR) PLOT : 8A, BLOCK:  CES(F),68 GULSHAN  AVENUE , GULSHAN-1 DHAKA-1212, BANGLADESH   '	
, 'PRBLBDDH016' SWIFT ,'VALUES RECEIVED & CHARGE THE SAME TO ACCOUNTS OF AKIJ BIAX FILMS LIMITED,ADD: AKIJ CHAMBER, 73, DILKUSHA C/A, DHAKA-1000, FACTORY.: KHAGATIPARA, TRISHAL, MYMENSINGH ' sellleraddress,
'3920.69.20'  HSCODE,'000163458-0104' BENEFICIARYS_BIN,'ARBAB  PACK LIMITED ' BUYERNAME, 
'SHIMRAIL, DEMRA ROAD SIDDIRGANJ,NARAYANGANJ, BANGLADESH ' ADDRESS,'000002786-0004' buyerIN_No,
'BA136626 / 260326120040719' buyerIRC_NO
END