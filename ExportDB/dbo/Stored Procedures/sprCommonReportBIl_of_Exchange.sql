-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprCommonReportBIl_of_Exchange] 
	-- Add the parameters for the stored procedure here
	--<@Param1, sysname, @p1> <Datatype_For_Param1, , int> = <Default_Value_For_Param1, , 0>, 
	--<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT  '4600009640' BUYERs_PURCHASE_ORDER_NO,'25-11-2023' Date,
	  '143 018 1108 23'  Invoice_NO,'48,100.00' USD,' FORTY EIGHT THOUSAND ONE HUNDRED ' in_word,
	  'COMMERCIAL BANK OF CEYLON PLC, HADI TOWER, NW(K)-1, ROAD NO. 50,
	  KEMAL ATATURK AVENUE  GULSHAN - 2, DHAKA – 1212' seller_bank,'BANK OF ALEXANDRIA' buyer_bank,
	  '10TH OF RAMADAN CITY BRANCH
	  10TH OF RAMADAN CITY
	  EGYPT
	  Postal:44634
	  TEL: 0554369119' buyerbankaddress,'52 tons' total_amount
END