-- =============================================
-- Author:		<Fahim  Hossain Rafayet>
-- Create date: <06-11-24>
-- Description:	<Table details of PICKPACKINGREPORT>
-- =============================================

-- EXEC SPGETPICKPACKINGTABLEREPORT 'PP-051124-67'

CREATE PROCEDURE SPGETPICKPACKINGTABLEREPORT
    @NeedThis Varchar(200)
AS
BEGIN
    SELECT 
	CONCAT(
	      'ITEM-',MDLINE.ID
	           ) AS MARKS,
			   Item.intID as ITEMCODE,
        CONCAT(
            MDLINE.SINO, ')PALLETS(', 
            MDLINE.TOTALPALLET, 'SPOOLS) = ', 
			Item.strProductName,' ',
            MDLINE.ADDITIONALWEIGHT, 'KG',
			'(', 
            MDLINE.MARKINK, ')'
        ) AS 'DESCRIPTION OF GOODS',
        PHLINE.PRICE, 
        PHLINE.QUANTITY, 
        (PHLINE.PRICE * PHLINE.QUANTITY) AS Total 
    FROM 
        ABGAPIS.dbo.TBLPICKINGPACKINGHEADER AS PP
    INNER JOIN 
        ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS MD
        ON PP.PACKINGREQUESTHEADERID = MD.ID
    INNER JOIN 
        ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS MDLINE
        ON MDLINE.PACKINGREQUESTHEADERID = MD.ID
    INNER JOIN 
        ABGAPIS.dbo.TBLPISCHEADER AS PH
        ON PH.ID = MD.PISCNUMBER
    INNER JOIN 
        ABGAPIS.dbo.TBLPISCLINE AS PHLINE
        ON PHLINE.PISCHEADER = PH.ID 
		INNER JOIN ERP_SAD.dbo.tblItem AS Item
ON PHLINE.ITEMID = Item.intID
    WHERE 
        PHLINE.ITEMID = MDLINE.ITEMID 
        AND PP.PICKPACKNUMBER = @NeedThis;
END;