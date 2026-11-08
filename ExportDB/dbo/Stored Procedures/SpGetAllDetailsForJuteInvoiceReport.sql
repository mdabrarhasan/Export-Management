
-- =============================================
-- Author:		<Fahim Hossain>
-- Create date: <20-10-2024>
-- Description:	<Jute Report 2>
-- =============================================

-- EXEC SpGetAllDetailsForJuteInvoiceReport 'MD-301024-93'

CREATE PROCEDURE [dbo].[SpGetAllDetailsForJuteInvoiceReport]
     @AJR as varchar(50)
AS
BEGIN
    -- Main query to get packing request details
    SELECT 
        ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS SerialNo,
        'Marks: Item-' + CAST(ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS VARCHAR(10)) AS Marks,
		Item.intID as ITEMCODE ,
		Item.strProductName as ITEMNAME,
        CAST(Line.TOTALCARTOON AS VARCHAR(50)) + ' CARTOON, ' +
        CAST(Line.TOTALPALLET AS VARCHAR(50)) + ' PALLET, ' +
        CAST(Line.TOTALSPOOL AS VARCHAR(50)) + ' SPOOL, ' +
        CAST(Line.ADDITIONALWEIGHT AS VARCHAR(50)) + ' KG, ' +
        CAST(Line.SPOOLORPALAT AS VARCHAR(50)) + ' SPOOL/PALLET (' +
        CAST(Line.MARKINK AS VARCHAR(50)) + ')' AS Description,
		CASE 
            WHEN ITEM.intUnitID = 91 THEN 'KG' 
            WHEN ITEM.intUnitID = 178 THEN 'pecs' 
            WHEN ITEM.intUnitID = 182 THEN 'Pecs' 
        END AS UOM,
		PILINE.PRICE as Price, 
        PILINE.QUANTITY as Quantity,
		PILINE.DISCOUNT as Discount,
        PILINE.TOTALAMOUNT AS Total
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line
        ON Line.PACKINGREQUESTHEADERID = Head.ID
	INNER JOIN ABGAPIS.dbo.TBLPISCHEADER as PISH
	ON PISH.ID = head.PISCNUMBER
    INNER JOIN ABGAPIS.dbo.TBLPISCLINE AS PILine
       ON PISH.ID = PILine.PISCHEADER
    INNER JOIN ERP_SAD.dbo.tblItem AS Item
        ON Line.ITEMID = Item.intID
    WHERE Line.ITEMID = PILine.ITEMID 
    AND Head.PACKREQNUMBER = @AJR
END