CREATE PROCEDURE [dbo].[SPJannataJuteMillsReportForTable]
@ID INT
AS
BEGIN
    -- Select original data
    SELECT 
        ITEM.strProductName AS Quality,
        LINE.COUNTNO AS 'Cont No',
        CUS.strName AS Buyer,
        LINE.TOTALPALLET AS 'Total Pallet',
        LINE.TOTALCARTOON AS 'Total Cartoon',
        LINE.ADDITIONALWEIGHT AS 'Nett Wt(Kgs)',
        LINE.GROSSWEIGHT AS 'GrossWt(Kgs)',
        LINE.SINO AS 'SI.NO.',
        LINE.TOTALSPOOL AS 'Total Spools',
        LINE.MARKINK AS 'Mark Ink',
        LINE.SPOOLORPALAT AS 'Spool / Pallet'
    FROM 
        ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS LINE
    INNER JOIN 
        ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS HEAD
        ON LINE.PACKINGREQUESTHEADERID = HEAD.id
    INNER JOIN 
        ERP_SAD.dbo.tblCustomer AS CUS
        ON CUS.intCusID = HEAD.CUSTOMERID
    INNER JOIN  
        ERP_SAD.dbo.tblItem AS ITEM
        ON ITEM.intID = LINE.ITEMID
    Where HEAD.id =@ID

    -- Union with the summary row that sums the numerical columns
    --UNION ALL

    ---- Summation of relevant columns
    --SELECT 
    --    'Total' AS Quality,               -- Placeholder for Quality
    --    NULL AS 'Cont No',                -- No content for Cont No in the summary row
    --    NULL AS Buyer,                    -- No content for Buyer in the summary row
    --    SUM(LINE.TOTALPALLET) AS 'Total Pallet',
    --    SUM(LINE.TOTALCARTOON) AS 'Total Cartoon',
    --    SUM(LINE.ADDITIONALWEIGHT) AS 'Nett Wt(Kgs)',
    --    SUM(LINE.GROSSWEIGHT) AS 'GrossWt(Kgs)',
    --    NULL AS 'SI.NO.',                 -- No content for SI.NO.
    --    SUM(LINE.TOTALSPOOL) AS 'Total Spools',
    --    NULL AS 'Mark Ink',               -- No content for Mark Ink in the summary row
    --    NULL AS 'Spool / Pallet'          -- No content for Spool/Pallet in the summary row
    --FROM 
    --    ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS LINE
    --INNER JOIN 
    --    ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS HEAD
    --    ON LINE.PACKINGREQUESTHEADERID = HEAD.id
END;