-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <24-12-2024>
-- Description:	<Sp to Get Challan report table biax>
-- =============================================

-- exec SpGetBCORReportLineBiax 24

CREATE PROCEDURE [dbo].[SpGetBCORReportLineBiax] 
	@ID INT
AS
BEGIN
declare @PriceName varchar(100),
	   @OCfname varchar(100)
declare @BILL int,@LCVSBILL INT 
SET @BILL=(SELECT TOP 1 BILLID FROM TBLLCVSBILL WHERE ID=@ID)
SET @LCVSBILL=(SELECT TOP 1 LCSCID FROM TBLLCVSBILL WHERE ID=@ID)
SET @PriceName=(SELECT PCNUMBER FROM  TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=(SELECT PROFORMAINVOICEHEADERID FROM TBLLCDETAILS WHERE ID=@LCVSBILL))
SET @OCfname=(select STROCFNO from erp_sad.dbo.tblOCF where intocfid=(SELECT OCFITEMID FROM  TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=(SELECT PROFORMAINVOICEHEADERID FROM TBLLCDETAILS WHERE ID=@LCVSBILL)))
select 

1 AS SlNo,
     si.strProductName as 'MetarialDescription' ,
	si.strProductCode AS productcode,
	cast(rc.decThickness as int) as thikness, 
	cast(sum(rc.decWidth) as int) as width, 
	
	cast(sum(rc.decLength) as int) as decLength,
	count(rc.intRollID) AS RollNo,
	(sum(rc.decWeight)-sum(rc.decCoreWeight)) as netweight,
	sum(rc.decWeight) as grossWeight,
--(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)) 
0.00 as baseprice
,
--(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))
--+(0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))) 
0.00 as unitpricebdt,
--0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)) 
0.00 as vat
,
--(sum(rc.decWeight)-sum(rc.decCoreWeight))*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))+(0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)))
0.00 as value
from
ERP_Label_ABX.dbo.tblRollNumber rc
join ERP_SAD.dbo.tblTreatmentDirection sd on rc.intTreatmentDirection=sd.intTreatmentDirection
join ERP_Label_ABX.dbo.tblPallet p on rc.intPalletID = p.intPalletID
join erp_sAD.DBO.tblItem si on rc.intProductID = si.intID
join ERP_Label_ABX.dbo.tblPackingList pl on p.intPackingListID = pl.intPackingListID
--join ERP_SAD.dbo.tblOCF as OCF on ocf.intocfid=rc.intocfid
--JOIN ERP_SAD.dbo.tblOCFItems on tblOCFItems.strOCFNo =OCF.strOCFNo 

where intSvID in (SELECT intSvID
FROM ERP_DURBIN.dbo.tblBillingSV
WHERE intBillID = @BILL)
group by si.strProductCode,rc.decThickness,si.strProductName,rc.intProductID
END