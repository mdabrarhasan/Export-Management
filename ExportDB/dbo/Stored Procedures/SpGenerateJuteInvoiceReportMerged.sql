CREATE PROCEDURE [dbo].[SpGenerateJuteInvoiceReportMerged]
    @PackingRequestNumber AS VARCHAR(50)
AS
BEGIN
    -- Declare a temporary table to store the merged results
    CREATE TABLE #MergedResult (
        SerialNo INT,
        Marks NVARCHAR(255),
        UOM NVARCHAR(50),
        Description NVARCHAR(MAX),
        PRICE DECIMAL(18,2),
        QUANTITY INT,
		Discount DECIMAL(18,2),
        Total DECIMAL(18,2),
		ITEMCODE NVARCHAR(50),
		ITEMNAME NVARCHAR(50),
        INVOICENUMBER NVARCHAR(50),
        INVOICEDATE DATETIME,
        INVOICETO NVARCHAR(255),
        SHIPPEDPER NVARCHAR(255),
        SHIPPEDFROM NVARCHAR(255),
        SHIPPEDTO NVARCHAR(255),
        CONTRACTNO NVARCHAR(255),
        CONTRACTDATE DATETIME,
        PURCHASEORDERNO NVARCHAR(255),
        PURCHASEORDERDATED DATETIME,
        BINNo NVARCHAR(255),
        TIN NVARCHAR(255),
        TotalAmountInWords NVARCHAR(255),
        GrandTotal DECIMAL(18,2) 
    );
    DECLARE @GrandTotal DECIMAL(18, 2);
	SELECT @GrandTotal = sum(QUANTITY * PRICE - DISCOUNT) from ABGAPIS.dbo.TBLPISCLINE as ln
INNER JOIN ABGAPIS.dbo.TBLPISCHEADER as hd
ON hd.ID = ln.PISCHEADER
INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as PH
ON PH.PISCNUMBER = hd.ID
where PH.PACKREQNUMBER =  @PackingRequestNumber	
 --   SELECT @GrandTotal = SUM(PILINE.PRICE * PILINE.QUANTITY)
 --   FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
 --   LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
 --       ON Head.ID = Line.PACKINGREQUESTHEADERID
 --  Left JOIN ABGAPIS.dbo.TBLPISCHEADER as PISH
	--ON Head.PISCNUMBER = PISH.ID
 --   LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE 
 --       ON PILINE.PISCHEADER = PISH.ID
 --   INNER JOIN ERP_SAD.dbo.tblItem AS Item 
 --       ON Line.ITEMID = Item.intID
 --   WHERE Head.PACKREQNUMBER = @PackingRequestNumber AND PILINE.ITEMID= Line.ITEMID;

    INSERT INTO #MergedResult (
        SerialNo, Marks, UOM, Description, PRICE, QUANTITY,Discount, Total,ITEMCODE,ITEMNAME,
        INVOICENUMBER, INVOICEDATE, INVOICETO, SHIPPEDPER, SHIPPEDFROM,
        SHIPPEDTO, CONTRACTNO, CONTRACTDATE, PURCHASEORDERNO,
        PURCHASEORDERDATED, BINNo, TIN, TotalAmountInWords, GrandTotal
    )
    SELECT 
        ROW_NUMBER() OVER (ORDER BY Line.ITEMID) AS SerialNo,
        'Marks: Item-' + CAST(ROW_NUMBER() OVER(ORDER BY Line.ITEMID) AS VARCHAR(10)) AS Marks,
        CASE 
            WHEN ITEM.intUnitID = 91 THEN 'KG' 
            WHEN ITEM.intUnitID = 178 THEN 'Pecs' 
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
		PILINE.DISCOUNT as Discount,
        PILINE.TOTALAMOUNT as Total,
		ITEM.intID,
		ITEM.strProductName,
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
        dbo.MoneyToWords_EN(@GrandTotal) AS TotalAmountInWords,
        @GrandTotal 
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
        ON Head.ID = Line.PACKINGREQUESTHEADERID
	Left JOIN ABGAPIS.dbo.TBLPISCHEADER as PISH
	ON Head.PISCNUMBER = PISH.ID
    LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE 
        ON PILINE.PISCHEADER = PISH.ID
    INNER JOIN ERP_SAD.dbo.tblItem AS Item 
        ON Line.ITEMID = Item.intID
    INNER JOIN ERP_HR.dbo.tblUnit AS unit 
        ON unit.intUnitID = Head.UNITID
    WHERE Head.PACKREQNUMBER = @PackingRequestNumber AND PILINE.ITEMID= Line.ITEMID;
    SELECT * FROM #MergedResult;
    DROP TABLE #MergedResult;
END;