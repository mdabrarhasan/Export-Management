-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <10/14/2024>
-- Description:	<Headers for SP >
-- =============================================

-- EXEC SPJannataJuteMillsReportForTableHeader

CREATE PROCEDURE [dbo].[SPJannataJuteMillsReportForTableHeader]
    --@Id INT
AS
BEGIN
    SELECT 
	    Head.SHIPPINGINVOICENO as 'INVOICE NO',
		Head.SHIPPINGINVOICEDATED as 'DATED',
        Cus.strName AS 'INVOICE TO',
        Head.SHIPPEDPER AS 'SHIPPED PER',
        country.NAME AS 'FROM',
        Head.SHIPPEDTO AS 'TO',
        Head.OURCONTRACTNO AS 'OUR CONTRACT NO',
        Head.OURCONTRACTDATED AS 'CONTRACT DATED',
        Head.PURCHASEORDERNO AS 'PURCHASE ORDER NO',
        Head.PURCHASEORDERDATED AS 'PURCHASE DATE'
    FROM 
        ABGAPIS.dbo.TBLPACKINGREQUESTHEADER AS Head
    LEFT JOIN 
        ABGAPIS.dbo.TBLPACKINGREQUESTLINE AS Line
        ON Head.ID = Line.PACKINGREQUESTHEADERID
    INNER JOIN 
        ABGAPIS.dbo.TBLCOUNTRY AS country
        ON country.ID = Head.SHIPPEDFROMID
		 INNER JOIN 
        ERP_SAD.dbo.tblCustomer AS CUS
        ON CUS.intCusID = HEAD.CUSTOMERID
    WHERE 
        Head.ID = 77;
END;