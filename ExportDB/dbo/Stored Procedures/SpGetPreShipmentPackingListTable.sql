-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <14-11-2024>
-- Description:	<Procedure to get Preshipment Packing List Table>
-- =============================================

-- exec SpGetPreShipmentPackingListTable 1

CREATE PROCEDURE [dbo].[SpGetPreShipmentPackingListTable]
@PackingRequestNumber AS VARCHAR(50)
AS
BEGIN
	-- set @ID =1100 ;

	select 
	 Item.strProductName as 'MARKS',
       CONCAT(
            MDLINE.SINO, ')PALLETS(', 
            MDLINE.TOTALPALLET, 'SPOOLS) = ', 
			Item.strProductName,' ',
            MDLINE.ADDITIONALWEIGHT, 'KG',
			'(', 
            MDLINE.MARKINK, ')',
			'(',
			'GROSS WT. ',
			MDLINE.GROSSWEIGHT,
			'KG',')'
        ) AS 'DESCRIPTION OF GOODS' 
	 from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS MD
    INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS MDLINE
        ON MDLINE.PACKINGREQUESTHEADERID = MD.ID
	INNER JOIN ERP_SAD.dbo.tblItem AS Item
        ON MDLINE.ITEMID = Item.intID
	where MD.PACKREQNUMBER= @PackingRequestNumber;
END