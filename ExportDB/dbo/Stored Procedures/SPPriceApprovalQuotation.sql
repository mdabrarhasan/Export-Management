--EXEC SPPriceApprovalQuotation 1507
CREATE PROCEDURE [dbo].[SPPriceApprovalQuotation]
@ID INT
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

	--(monPrice/1.15)
	--END 
	--FROM ERP_SAD.DBO.qrySalesEntryDetailsReport WHERE intCustomerId=confirmHeader.CUSTOMERID AND intProductId=confirmLine.ITEMID ORDER BY intId DESC),0)
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
        confirmHeader.ID = @ID and quoLine.ISACTIVE=1 ;
END