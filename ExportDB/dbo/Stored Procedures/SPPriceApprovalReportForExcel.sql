-- =============================================
-- Author:		<Fahim Hossain Rafayeth>
-- Create date: <22/1/2025>
-- Description:	<Seeing>
-- =============================================

-- EXEC SPPriceApprovalReportForExcel 'PA-24DEC1172'

CREATE PROCEDURE [dbo].[SPPriceApprovalReportForExcel]
@PCNUM varchar(100)
AS
BEGIN

--SELECT * FROM ERP_SAD.DBO.tblOCFItems
--SELECT * FROM ERP_SAD.DBO.tblOCF
--SELECT * FROM TBLQUOTATIONHEADER

SELECT 
	quoLine.ID,
    tableItem.strProductCode as PRODUCTCODE,
	tableItem.strProductName as PRODUCTNAME,
	confirmLine.THIKNESS, 
	confirmLine.QUANTITY, 
    quoLine.LENGTH as WIDTH, 
	--ISNULL((
	--SELECT TOP 1 CASE WHEN quoHeader.SQTYPEID=135 THEN monPrice
	--ELSE
	--(monPrice-(monPrice*0.15)) 
	--(monPrice/1.15)
	--END 
	--FROM ERP_SAD.DBO.qrySalesEntryDetailsReport WHERE intCustomerId=confirmHeader.CUSTOMERID AND intProductId=confirmLine.ITEMID ORDER BY intId DESC),0)
	/*SELECT TOP 1 
	CASE WHEN OCF.intOCFType=136 THEN (OCFL.decSellingRate_per_kg-(OCFL.decSellingRate_per_kg*0.15))
	ELSE OCFL.decSellingRate_per_kg END
	
	FROM ERP_SAD.DBO.tblOCF OCF 
	INNER JOIN ERP_SAD.DBO.tblOCFItems OCFL ON OCF.intOCFID=OCFL.intOCFID 
	WHERE OCFL.intProductID=confirmLine.ITEMID AND OCF.intCustomerID=quoHeader.CUSTOMERID
	AND (OCFL.decSellingRate_per_kg IS NOT NULL OR OCFL.decSellingRate_per_kg!=0)
	ORDER BY OCFL.intOCFID DESC),0)*/

	ISNULL((SELECT TOP 1 PL.CONFIRMPRICE FROM TBLPRICECONFIRMHEADER PH
		INNER JOIN TBLPRICECONFIRMLINE PL ON PH.ID=PL.PRICECONFIRMHEADERID 
		WHERE PL.ITEMID=tableItem.intID AND PL.THIKNESS=confirmLine.THIKNESS AND CUSTOMERID=tblcus.intCusID AND PH.DOCUMENTSTATUSID=7 ORDER BY PL.ID DESC),0)
	as PREVIOUSBASEDPRICE,
    confirmLine.CONFIRMPRICE as PROPOSEDBASEPRICE,
	tblcus.strName as CUSTOMERTNAME,
	confirmHeader.TERMSCONDITION as TERMSCONDITION,
	confirmHeader.PCNUMBER as REFERENCENUMBER,
	CAST(CAST(confirmHeader.DOCUMENTCREATEDDATE AS DATE) AS VARCHAR(50)) as STARTDATE,
	confirmHeader.PRICEEXDATE AS ENDDATE,
	salestype.NAME as SALESTYPENAME,
	(SELECT STRING_AGG(HSCODE, ', ') FROM ABGAPIS.dbo.TBLQUOTATIONHSCODE WHERE QTID = quoHeader.ID) AS HSCODE,
	(select STRING_AGG(strDescription, ', ')  from ERP_VAT.dbo.tblHS_ServiceCode as sscode inner join  ABGAPIS.dbo.TBLQUOTATIONHSCODE hscode
on hscode.HSCODE = sscode.strHS_ServiceCode  where hscode.QTID = quoHeader.id  ) as ProductHScodeName

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
LEFT JOIN
    ERP_SAD.dbo.tblCustomer  tblcus ON confirmHeader.CUSTOMERID = tblcus.intCusID
LEFT JOIN
    TBLSALESTYPE salestype ON salestype.ID = quoHeader.SALESTYPEID
WHERE 
        confirmHeader.PCNUMBER = @PCNUM;
END