-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <09-12-24>
-- Description:	<SP to get the Line in Sales Contract>
-- =============================================

-- exec  SpGetLcRelatedSalesContractItemLine 28


CREATE PROCEDURE  [dbo].[SpGetLcRelatedSalesContractItemLine]
       @id int 
AS
BEGIN

--   SELECT strProductCode,LINE.THIKNESS,CONFIRMPRICE FROM TBLPRICECONFIRMLINE LINE,ERP_SAD.DBO.tblItem ITEM
--WHERE LINE.ITEMID=ITEM.intID
--AND LINE.PRICECONFIRMHEADERID=1072
--AND intUnitID=91


SELECT 
    ROW_NUMBER() OVER (ORDER BY LINE.ITEMID) AS SerialNumber, -- Adds a serial number
    strProductCode,
    LINE.THIKNESS,
    CONFIRMPRICE,
    core.strBiaxFlimCoreID
FROM 
    ABGAPIS.dbo.TBLPRICECONFIRMLINE LINE
left JOIN 
    ERP_SAD.DBO.tblItem ITEM
    ON LINE.ITEMID = ITEM.intID
left  JOIN 
    ABGAPIS.dbo.TBLPRICECONFIRMHEADER prchead
    ON prchead.ID = LINE.PRICECONFIRMHEADERID
left  JOIN 
    ABGAPIS.dbo.TBLQUOTATIONHEADER qouhead
    ON qouhead.ID = prchead.PROFORMAINVOICEHEADERID
left  JOIN 
    ABGAPIS.dbo.TBLQUOTATIONLINE qouline
    ON qouline.QUOTATIONHEADERID = qouhead.ID
left  JOIN 
    ERP_SAD.DBO.tblBiaxFlimCoreID core
    ON qouline.COREID = core.intBiaxFlimCoreID
right JOIN 
    ABGAPIS.dbo.TBLLCDETAILS lc
    ON lc.PROFORMAINVOICEHEADERID = qouhead.ID
WHERE 
    LINE.ITEMID = ITEM.intID 
    AND qouline.ITEMID = LINE.ITEMID 
    AND lc.ID = @id;


END