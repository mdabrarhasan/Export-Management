CREATE PROCEDURE [dbo].[SPQuo]
@ID INT
AS
BEGIN
	SELECT 
    tableItem.strProductCode as PRODUCTCODE,
	tableItem.strProductName as PRODUCTNAME,
	quoLine.THIKNESS, 
    quoLine.WIDTH as LENGTH, 
	0.0 as PREVIOUSBASEDPRICE,
    confirmLine.CONFIRMPRICE as PROPOSEDBASE_PRICE
FROM 
    TBLQUOTATIONHEADER quoHeader
INNER JOIN 
    TBLQUOTATIONLINE quoLine ON quoHeader.ID = quoLine.QUOTATIONHEADERID
INNER JOIN 
    TBLPRICECONFIRMLINE confirmLine ON quoLine.ID = confirmLine.QUOTATIONLINEID
INNER JOIN 
    TBLPRICECONFIRMHEADER confirmHeader ON confirmLine.PRICECONFIRMHEADERID= confirmHeader.ID
INNER JOIN 
    ERP_SAD.dbo.tblItem tableItem ON confirmLine.ITEMID = tableItem.intID
where tableItem.intID = 235782;
END