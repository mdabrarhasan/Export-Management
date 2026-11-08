--EXEC SpGetComInvoiceReportLineBiax 546
CREATE PROCEDURE [dbo].[SpGetComInvoiceReportLineBiax] 
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
--select @BILL,@LCVSBILL,@PriceName,@OCfname
;WITH PriceCTE AS (
    SELECT 
	DISTINCT
        THIKNESS, 
        ITEMID, 
        PRICECONFIRMHEADERID, 
        CONFIRMPRICE
    FROM ABGAPIS.dbo.TBLPRICECONFIRMLINE
    WHERE PRICECONFIRMHEADERID = (
        SELECT ID 
        FROM ABGAPIS.dbo.TBLPRICECONFIRMHEADER 
        WHERE PCNUMBER = @PriceName
    )
),
RollData AS (
    SELECT 
        1 AS SlNo,
        si.strProductName as MetarialDescription,
        si.strProductCode AS productcode,
        CAST(rc.decThickness AS int) AS thikness,
        CAST(MAX(rc.decWidth) AS int) AS width,
        CAST(MAX(rc.decLength) AS int) AS decLength,
        count(rc.intRollID) AS RollNo,
		
        SUM(rc.decWeight - rc.decCoreWeight) AS netweight,
        SUM(rc.decWeight) AS GrossWeight,
        rc.decThickness,
        rc.intProductID
    FROM ERP_Label_ABX.dbo.tblRollNumber rc
    JOIN ERP_SAD.dbo.tblTreatmentDirection sd ON rc.intTreatmentDirection = sd.intTreatmentDirection
    JOIN ERP_Label_ABX.dbo.tblPallet p ON rc.intPalletID = p.intPalletID
    JOIN erp_sAD.DBO.tblItem si ON rc.intProductID = si.intID
    JOIN ERP_Label_ABX.dbo.tblPackingList pl ON p.intPackingListID = pl.intPackingListID
    WHERE intSvID IN (
        SELECT intSvID
        FROM ERP_DURBIN.dbo.tblBillingSV
        WHERE intBillID = @BILL
    )
    GROUP BY si.strProductCode, rc.decThickness, si.strProductName, rc.intProductID,rc.decWidth
)
SELECT  
    rd.SlNo,
    rd.MetarialDescription,
    rd.productcode,
    rd.thikness,
    rd.width,
    rd.decLength,
    rd.RollNo,
    rd.netweight,
    rd.GrossWeight,
    pc.CONFIRMPRICE AS baseprice,
    pc.CONFIRMPRICE + (0.15 * pc.CONFIRMPRICE) AS unitpricebdt,
    0.15 * pc.CONFIRMPRICE AS vat,
    rd.netweight * cast((pc.CONFIRMPRICE + (0.15 * pc.CONFIRMPRICE)) as decimal(18,2)) AS value
FROM RollData rd
LEFT JOIN PriceCTE pc ON pc.THIKNESS = rd.decThickness AND pc.ITEMID = rd.intProductID

END
--select
----item.intID,
--ROW_NUMBER() OVER (ORDER BY PCLINE.ID) AS SlNo,
--item.strProductName as 'MetarialDescription' ,
--item.strProductCode as productcode,
--PCLINE.THIKNESS as thikness,
--PCLINE.WIDTH as width,

--ISNULL((select count(rc.intRollID) from ERP_Label_ABX.dbo.tblRollNumber rc 
--where   item.intID = rc.intProductID and PCLINE.THIKNESS = rc.decThickness 
----and PCLINE.WIDTH  = rc.decWidth
--),0) as RollNo,

--ISNULL((select sum(rc.decWeight-rc.decCoreWeight) from ERP_Label_ABX.dbo.tblRollNumber rc 
--where item.intID = rc.intProductID and PCLINE.THIKNESS = rc.decThickness 
----and PCLINE.WIDTH  = rc.decWidth
--),0) as netweight,

--ISNULL((select sum(rc.decWeight) from ERP_Label_ABX.dbo.tblRollNumber rc 
--where   item.intID = rc.intProductID and PCLINE.THIKNESS = rc.decThickness 
----and PCLINE.WIDTH  = rc.decWidth
--),0) as grossweight,
--PCLINE.PRICE as baseprice,--*
--PCLINE.PRICE+(0.15*PCLINE.PRICE) as unitpricebdt,--*
--0.15*PCLINE.PRICE as vat,--*
--ISNULL((select sum(rc.decWeight-rc.decCoreWeight) from ERP_Label_ABX.dbo.tblRollNumber rc 
--where item.intID = rc.intProductID and PCLINE.THIKNESS = rc.decThickness 
----and PCLINE.WIDTH  = rc.decWidth
--),0)*PCLINE.PRICE+(0.15*PCLINE.PRICE) as value--*

--from ERP_SAD.dbo.tblOCF as OCF
--JOIN ERP_SAD.dbo.tblOCFItems on tblOCFItems.strOCFNo =OCF.strOCFNo 
--left join ABGAPIS.dbo.TBLPRICECONFIRMLINE PCLINE ON PCLINE.ITEMID=tblOCFItems.intProductID 
--AND PCLINE.THIKNESS=tblOCFItems.decThickness 
----AND PCLINE.WIDTH=tblOCFItems.decWidth
--inner join erp_sAD.DBO.tblItem as Item on Item.intID = PCLINE.ITEMID 
--WHERE OCF.strOCFNo = @OCfname and strOCFSatus !='Close' --and strOCFDOType ='O-O'
--and PCLINE.PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)
---//
--select 

--1 AS SlNo,
--     si.strProductName as 'MetarialDescription' ,
--	si.strProductCode AS productcode,
--	cast(rc.decThickness as int) as thikness, 
--	cast(sum(rc.decWidth) as int) as width, 
	
--	cast(sum(rc.decLength) as int) as decLength,
--	sum(rc.intRollID) AS RollNo,
--	(sum(rc.decWeight)-sum(rc.decCoreWeight)) as netweight,
--	sum(rc.decWeight) as GrossWeight,
--(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)) as baseprice
--,
--(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))
--+(0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))) 
--as unitpricebdt,
--0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName)) as vat
--,
--(((sum(rc.decWeight)-sum(rc.decCoreWeight))*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))
--+(0.15*(select CONFIRMPRICE from ABGAPIS.dbo.TBLPRICECONFIRMLINE 
--where THIKNESS=rc.decThickness and itemid=rc.intProductID and PRICECONFIRMHEADERID=(select ID from ABGAPIS.dbo.TBLPRICECONFIRMHEADER where PCNUMBER=@PriceName))
--)) )
--as value
--from
--ERP_Label_ABX.dbo.tblRollNumber rc
--join ERP_SAD.dbo.tblTreatmentDirection sd on rc.intTreatmentDirection=sd.intTreatmentDirection
--join ERP_Label_ABX.dbo.tblPallet p on rc.intPalletID = p.intPalletID
--join erp_sAD.DBO.tblItem si on rc.intProductID = si.intID
--join ERP_Label_ABX.dbo.tblPackingList pl on p.intPackingListID = pl.intPackingListID
----join ERP_SAD.dbo.tblOCF as OCF on ocf.intocfid=rc.intocfid
----JOIN ERP_SAD.dbo.tblOCFItems on tblOCFItems.strOCFNo =OCF.strOCFNo 

--where intSvID in (SELECT intSvID
--FROM ERP_DURBIN.dbo.tblBillingSV
--WHERE intBillID = @BILL)
--group by si.strProductCode,rc.decThickness,si.strProductName,rc.intProductID