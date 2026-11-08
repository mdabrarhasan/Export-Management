-- =============================================
-- Author:		<Fahim Hossain rafayet>
-- Create date: <14-11-2024>
-- Description:	<Sp to Get Items>
-- =============================================

-- exec SpGetContractTableDetails  1

CREATE PROCEDURE [dbo].[SpGetContractTableDetails] 
@PackingRequestNumber AS VARCHAR(50)
AS
BEGIN

	--set @ID =1099 ;

	select 
        CONCAT(
            MDLINE.SINO, ')PALLETS(', 
            MDLINE.TOTALPALLET, 'SPOOLS) = ', 
			Item.strProductName,' ',
            MDLINE.ADDITIONALWEIGHT, 'KG',
			'(', 
            MDLINE.MARKINK, ')'
        ) AS 'DESCRIPTION OF GOODS' 
	 from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS MD
    INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS MDLINE
        ON MDLINE.PACKINGREQUESTHEADERID = MD.ID
	INNER JOIN ERP_SAD.dbo.tblItem AS Item
        ON MDLINE.ITEMID = Item.intID
	where MD.PACKREQNUMBER = @PackingRequestNumber
END