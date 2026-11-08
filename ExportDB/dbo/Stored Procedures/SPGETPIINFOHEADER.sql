
--  exec SPGETPIINFOHEADER 1 , 1171
CREATE PROCEDURE [dbo].[SPGETPIINFOHEADER]
(
    @TYPEID INT,
    @ID INT
)
AS
BEGIN
  
  declare @product varchar(1000);
  declare @pitype varchar(100);
  declare @vat decimal(10,2);

  set @pitype= (select sqtypeid from ABGAPIS.dbo.TBLQUOTATIONHEADER where ID =  @ID);

  if @pitype = 136
     set @vat = 0.15
	else
	 set @vat = 1

  set @product ='Product : '+ (SELECT STRING_AGG(sscode.strDescription, ', ') 
                FROM ERP_VAT.dbo.tblHS_ServiceCode AS sscode
                INNER JOIN ABGAPIS.dbo.TBLQUOTATIONHSCODE hscode
                ON hscode.HSCODE = sscode.strHS_ServiceCode
                WHERE hscode.QTID = @ID);

   DECLARE @GrandTotal DECIMAL(18, 2);
 Declare @word varchar(500);
--	SELECT @GrandTotal = (
--	      select 
--     sum(CASE WHEN head.SQTYPEID=136 or head.SQTYPEID IS NULL  THEN LINE.QUANTITY*(LINE.PRICE+(0.15*LINE.PRICE)) ELSE LINE.QUANTITY*LINE.PRICE END)
--		  from ABGAPIS.dbo.TBLQUOTATIONHEADER head
--left join ABGAPIS.dbo.TBLQUOTATIONLINE line
--on head.ID = line.QUOTATIONHEADERID
--     where head.id = @id AND Line.ISACTIVE = 1
--	)

		SELECT @GrandTotal = (
	      select 
     sum(CASE WHEN head.SQTYPEID=136   THEN LINE.QUANTITY*(LINE.PRICE+(0.15*LINE.PRICE)) ELSE LINE.QUANTITY*LINE.PRICE END)
		  from ABGAPIS.dbo.TBLQUOTATIONHEADER head
left join ABGAPIS.dbo.TBLQUOTATIONLINE line
on head.ID = line.QUOTATIONHEADERID
     where head.id = @id AND Line.ISACTIVE = 1
	)
	--select @GrandTotal;
--	select @word = ERP_Global.dbo.funNumToWords(@GrandTotal,'0');
select @word = DBO.NumberToWords(@GrandTotal);

	--select @word


    SELECT 
        ISNULL(QH.ID, 0) AS ID,
        ISNULL(CUS.intCusID, 0) AS CUSTOMERID,
        ISNULL(CUS.strName, '') AS CUSTOMERNAME,
        --ISNULL(CUS.strAddress, '') AS CUSADDRESS,
		(SELECT strAddress FROM ERP_SAD.DBO.tblDisPoint WHERE intdispointid=qh.DELPOINTID) AS CUSADDRESS,
        '' AS TIN, 
        ISNULL(CUS.strVatRegNo, '') AS VATREGNO,
        ISNULL(CAST(CAST(QH.DATE AS DATE) AS VARCHAR(50)), '') AS DATE,
        ISNULL(CAST(CAST(QH.EXPIREDATE AS DATE) AS VARCHAR(50)), '') AS EXPIREDATE,
        ISNULL(SM.NAME, '') AS SHIPPINGMODE,
        ISNULL(TM.NAME, '') AS MODEOFTRANSPORTATION,
        ISNULL(QH.TERMSCONDITION, '') AS TERMSCONDITION,
        ISNULL(SV.strDescription, '') AS DESCRIPTIONS,
        ISNULL(QH.QUOTATIONNUMBER, '') AS QUOTATIONNUMBER,
		ISNULL(REPLACE(currency.NAME, ' ', ' ') + @word, 'ZERO') AS TOTALAMOUNTINWORDS,
        ISNULL((SELECT SUM(QUANTITY) 
                FROM TBLQUOTATIONLINE LINE 
                WHERE LINE.QUOTATIONHEADERID = QH.ID AND LINE.ISACTIVE=1), 0) AS NETWEIGHT,
        ISNULL((SELECT STRING_AGG(HSCODE, ', ') 
                FROM ABGAPIS.dbo.TBLQUOTATIONHSCODE 
                WHERE QTID = @ID), '') AS HSCODE,
        ISNULL(@product, '') AS ProductHScodeName
    FROM                                
        TBLQUOTATIONHEADER QH
    LEFT JOIN		
        ERP_SAD.DBO.tblCustomer CUS ON QH.CUSTOMERID = CUS.intCusID
    LEFT JOIN
        TBLSHIPMENTMODE SM ON QH.SHIPMENTMODEID = SM.ID
    LEFT JOIN
        TBLOADINGBY TM ON QH.LOADINGBYID = TM.ID
    LEFT JOIN
        TBLFROMLOADINGPORT LP ON QH.LOADINGBYID = LP.ID
    LEFT JOIN
        ERP_VAT.dbo.tblHS_ServiceCode SV ON QH.HSCODE = SV.strHS_ServiceCode
    LEFT JOIN 
	    ABGAPIS.dbo.TBLCURRENCY as currency on QH.CURRENCYID = currency.ID
    WHERE 
        QH.ID = @ID 
        AND QH.QUOTATIONTYPEID = @TYPEID;
END;