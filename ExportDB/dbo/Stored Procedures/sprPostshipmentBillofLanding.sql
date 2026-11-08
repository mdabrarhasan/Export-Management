-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprPostshipmentBillofLanding] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT  'JANATA JUTE MILLS LIMITED.
SIMPLETREE LIGHTHOUSE (5TH FLOOR),
53,KEMAL ATATURK AVENUE,
BANANI, DHAKA-1213.
BANGLADESH   ' Supplier_name, '24-12-2023  '  Date,
	'COSU6373356720' Bl_No , 'COMMERCIAL BANK OF CEYLON PLC
HADI TOWER, NW(K)-1, ROAD NO. 50,
KEMAL ATATURK AVENUE, 
GULSHAN - 2, DHAKA - 1212,
BANGLADESH. ' UNTO_THE_ORDER_OF,'ORIENTAL WEAVERS CARPET,
10TH OF RAMADAN CITY,
EGYPT' NOTIFY_PARTY,'SOL RELIANCE V-074S' VESSEL ,
	   ' CHITTAGONG, BANGLADESH'   From_, 'ALEXANDRIA,EGYPT'  To_
	,  'free_text' free_txt
END