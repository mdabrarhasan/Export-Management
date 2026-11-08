-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <23-10-24>
-- Description:	<From and To shipment>
-- =============================================

-- EXEC SPGetTextFromShipmentAndCountry 51

CREATE PROCEDURE SPGetTextFromShipmentAndCountry
@ID INT
AS
BEGIN
    SELECT SQH.ID as ID, SQH.TEXTFROMSHIPMENT as TOSHIPMENT, coun.NAME as FROMSHIPMENT
    FROM  ABGAPIS.dbo.TBLSALESQUOTATIONHEADER AS SQH
    JOIN ABGAPIS.dbo.TBLCOUNTRY AS coun
    ON coun.ID = SQH.FROMSHIPMENT
	JOIN ABGAPIS.dbo.TBLPISCHEADER as PIS
	ON PIS.SALESQUOTATIONHEADERID = SQH.ID 
	where PIS.ID = @ID;
END;