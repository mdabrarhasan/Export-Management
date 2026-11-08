-- =============================================
-- Author:		<Fahim Hossain>
-- Create date: <20-10-2024>
-- Description:	<Jute Report 2>
-- =============================================
CREATE PROCEDURE dbo.GetPackingRequestDetails
    --@HeadID INT
AS
BEGIN
    -- Main query to get packing request details
    SELECT 
        ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS SerialNo,
        'Marks: Item-' + CAST(ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS VARCHAR(10)) AS Marks,
        CASE 
            WHEN ITEM.intUnitID = 91 THEN 'KG' 
            WHEN ITEM.intUnitID = 178 THEN 'pecs' 
            WHEN ITEM.intUnitID = 182 THEN 'Pecs' 
        END AS UOM,
        CAST(Line.TOTALCARTOON AS VARCHAR(50)) + ' CARTOON, ' +
        CAST(Line.TOTALPALLET AS VARCHAR(50)) + ' PALLET, ' +
        CAST(Line.TOTALSPOOL AS VARCHAR(50)) + ' SPOOL, ' +
        CAST(Line.ADDITIONALWEIGHT AS VARCHAR(50)) + ' KG, ' +
        Item.strProductName + ', ' +
        CAST(Line.SPOOLORPALAT AS VARCHAR(50)) + ' SPOOL/PALLET (' +
        CAST(Line.MARKINK AS VARCHAR(50)) + ')' AS Description,
        PILINE.PRICE, 
        PILINE.QUANTITY,
        (PILINE.PRICE * PILINE.QUANTITY) AS Total
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
        ON Head.ID = Line.PACKINGREQUESTHEADERID
    LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
        ON Line.ITEMID = PILINE.ITEMID
    INNER JOIN ERP_SAD.dbo.tblItem AS Item
        ON Line.ITEMID = Item.intID
    WHERE Head.ID = 84

    -- Union to add a summary row at the end
    UNION ALL

    -- Summary row with total calculations
    SELECT 
        NULL AS SerialNo,
        'Total Amount' AS Marks,
        NULL AS UOM,
        NULL AS Description,
        NULL AS PRICE,
        NULL AS QUANTITY,
        SUM(PILINE.PRICE * PILINE.QUANTITY) AS Total
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
        ON Head.ID = Line.PACKINGREQUESTHEADERID
    LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
        ON Line.ITEMID = PILINE.ITEMID
    WHERE Head.ID = 84;
END