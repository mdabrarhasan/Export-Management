Create PROCEDURE [dbo].[SpGetJuteInvoiceReportMerged]
    @prnum AS VARCHAR(50)
AS
BEGIN
    -- Declare variables
    DECLARE @TotalAmount BIGINT;

    -- Calculate the total amount (sum of PRICE * QUANTITY)
    SELECT @TotalAmount = SUM(PILINE.PRICE * PILINE.QUANTITY)
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
        LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
            ON Head.ID = Line.PACKINGREQUESTHEADERID
        LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
            ON Line.ITEMID = PILINE.ITEMID
    WHERE Head.PACKREQNUMBER = @prnum;

    IF @TotalAmount IS NULL
    BEGIN
        SELECT 'No data found for this Packing Request Header ID.' AS Message;
        RETURN;
    END
    
    -- Section 1: Return the header details along with the total amount in words
    SELECT 
        Head.INVOICENUMBER,
        Head.INVOICEDATE,
        Head.INVOICETO,
        Head.SHIPPEDPER,
        Head.SHIPPEDFROM,
        Head.SHIPPEDTO,
        Head.CONTRACTNO,
        Head.CONTRACTDATE,
        Head.PURCHASEORDERNO,
        Head.PURCHASEORDERDATED,
        unit.strBINNo,
        unit.strTIN,
        dbo.fnNumberToWords(@TotalAmount) AS TotalAmountInWords
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    INNER JOIN ERP_HR.dbo.tblUnit AS unit 
        ON unit.intUnitID = Head.UNITID
    LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
        ON Head.ID = Line.PACKINGREQUESTHEADERID
    LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
        ON Line.ITEMID = PILINE.ITEMID
    INNER JOIN ERP_SAD.dbo.tblItem AS Item
        ON Line.ITEMID = Item.intID
    WHERE Head.PACKREQNUMBER = @prnum;

    -- Section 2: Return all jute invoice details
    SELECT 
        ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS SerialNo,
        'Marks: Item-' + CAST(ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS VARCHAR(10)) AS Marks,
        CASE 
            WHEN Item.intUnitID = 91 THEN 'KG' 
            WHEN Item.intUnitID = 178 THEN 'Pecs' 
            WHEN Item.intUnitID = 182 THEN 'Pallet' 
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
    WHERE Head.PACKREQNUMBER = @prnum;

    -- Section 3: Add summary row for the total amount
    --UNION ALL

    --SELECT 
    --    NULL AS SerialNo,
    --    'Total Amount' AS Marks,
    --    NULL AS UOM,
    --    NULL AS Description,
    --    NULL AS PRICE,
    --    NULL AS QUANTITY,
    --    SUM(ISNULL(PILINE.PRICE * PILINE.QUANTITY, 0)) AS Total
    --FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    --LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
    --    ON Head.ID = Line.PACKINGREQUESTHEADERID
    --LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
    --    ON Line.ITEMID = PILINE.ITEMID
    --WHERE Head.PACKREQNUMBER = @prnum;
END