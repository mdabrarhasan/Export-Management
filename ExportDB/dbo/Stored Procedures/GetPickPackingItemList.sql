-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <15-10-24>
-- Description:	<Item List for Packing Request>
-- =============================================


-- EXEC GetPickPackingItemList 76

CREATE PROCEDURE [dbo].[GetPickPackingItemList]
    @HeaderID INT -- This parameter will allow you to dynamically pass the Head.id
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        MAX(LINE.ID) AS ID,
        LINE.ITEMID,
        ITEM.strProductName AS ITEMNAME,
        CASE 
            WHEN ITEM.intUnitID = 91 THEN 'KG' 
            WHEN ITEM.intUnitID = 178 THEN 'pecs' 
            WHEN ITEM.intUnitID = 182 THEN 'Pecs' 
        END AS UOM,
        MAX(LINE.QUANTITY) AS QUANTITY,
        SUM(LINE.PACKINGREQQUANTITY) AS PACKINGREQQUANTITY,
        MAX(LINE.QUANTITY) - SUM(LINE.PACKINGREQQUANTITY) AS REMAININGQTY,
        0 AS PACKINGREQUESTHEADERID
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS LINE
        ON LINE.PACKINGREQUESTHEADERID = Head.id
    INNER JOIN ERP_SAD.dbo.tblItem AS ITEM
        ON ITEM.intID = LINE.ITEMID
    WHERE 
        Head.id = @HeaderID
    GROUP BY 
        LINE.ITEMID,
        ITEM.strProductName,
        CASE 
            WHEN ITEM.intUnitID = 91 THEN 'KG' 
            WHEN ITEM.intUnitID = 178 THEN 'pecs' 
            WHEN ITEM.intUnitID = 182 THEN 'Pecs' 
        END
    --HAVING 
    --    MAX(LINE.QUANTITY) - SUM(LINE.PACKINGREQQUANTITY) != 0;
END;