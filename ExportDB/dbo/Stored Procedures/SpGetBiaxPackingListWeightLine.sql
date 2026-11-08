-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <01-02-2025>
-- Description:	<Sp Get Biax Report PackingList Weight Line >
-- =============================================
-- 
CREATE PROCEDURE [dbo].[SpGetBiaxPackingListWeightLine]
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
	sum(rc.decWeight) as grossweight
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