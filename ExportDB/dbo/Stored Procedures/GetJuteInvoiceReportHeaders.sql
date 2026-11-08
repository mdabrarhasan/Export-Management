-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <20-10-24>
-- Description:	<Jute Invoice Report Headers>
-- =============================================

-- EXEC GetJuteInvoiceReportHeaders 'MD-191124-1103'

CREATE PROCEDURE [dbo].[GetJuteInvoiceReportHeaders]
    @prnum as varchar(50)
AS
BEGIN

DECLARE @TotalAmount BIGINT;
DECLARE @hh decimal(20,2);



    -- Calculate the total amount (sum of PRICE * QUANTITY)
    SELECT @TotalAmount = (
	
	select sum(QUANTITY * PRICE - DISCOUNT) from ABGAPIS.dbo.TBLPISCLINE as ln
INNER JOIN ABGAPIS.dbo.TBLPISCHEADER as hd
ON hd.ID = ln.PISCHEADER
INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as PH
ON PH.PISCNUMBER = hd.ID
where PH.PACKREQNUMBER = @prnum	
	)

	SELECT @hh = (
	
	select sum(QUANTITY * PRICE - DISCOUNT) from ABGAPIS.dbo.TBLPISCLINE as ln
INNER JOIN ABGAPIS.dbo.TBLPISCHEADER as hd
ON hd.ID = ln.PISCHEADER
INNER JOIN ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as PH
ON PH.PISCNUMBER = hd.ID
where PH.PACKREQNUMBER = @prnum	
	)

    SELECT 
        INVOICENUMBER,
		CONVERT(DATE, INVOICEDATE) as INVOICEDATE,
        INVOICETO,
		cus.strAddress,
        SHIPPEDPER,
        SHIPPEDFROM,
        SHIPPEDTO,
        CONTRACTNO,
		CONVERT(DATE, CONTRACTDATE) as CONTRACTDATE,
        PURCHASEORDERNO,
		CONVERT(DATE, PURCHASEORDERDATED) as PURCHASEORDERDATED,
		unit.strBINNo,
		unit.strTIN,
		@hh as ToTalAMount,
		dbo.MoneyToWords(@hh,'en') AS TotalAmountInWords
    FROM ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as Head
	INNER JOIN ERP_HR.dbo.tblUnit as unit 
	ON unit.intUnitID = Head.UNITID
	INNER JOIN ABGAPIS.dbo.TBLPISCHEADER as PIS
	ON PIS.ID = Head.PISCNUMBER
	INNER JOIN ERP_SAD.dbo.tblCustomer as cus
	ON cus.intCusID = PIS.CUSTOMERID
	 LEFT JOIN ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line 
            ON Head.ID = Line.PACKINGREQUESTHEADERID
        LEFT JOIN ABGAPIS.dbo.TBLPISCLINE AS PILINE
            ON Line.ITEMID = PILINE.ITEMID
        INNER JOIN ERP_SAD.dbo.tblItem AS Item
            ON Line.ITEMID = Item.intID
    WHERE PACKREQNUMBER = @prnum;
END