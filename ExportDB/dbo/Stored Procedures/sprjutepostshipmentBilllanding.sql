-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprjutepostshipmentBilllanding] 
	
AS
BEGIN
	
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT ph.PICKPACKNUMBER ,ph.DOCUMENTCREATEDDATE,
	tc.strAddress,tc.strPhone,tpi.NUMBER,tcountry.NAME,
	tcou.NAME,tpiline.HSCODE,tbim.strProductName,
	tbpline.PACKINGREQQUANTITY,tpiline.PRICE,
	tpiline.DESCRIPTIONS,tpiline.REMARKS,tpi.NOTIFYPARTY
	from TBLPICKINGPACKINGHEADER ph
	inner join ERP_SAD.dbo.tblCustomer tc 
	on ph.CUSTOMERID=tc.intCusID
	inner join TBLPACKINGREQUESTHEADER pr
	on ph.PACKINGREQUESTHEADERID=pr.ID
	inner join TBLPISCHEADER tpi 
	on pr.PISCNUMBER=tpi.ID
	inner join TBLCOUNTRY tcountry 
	on tpi.TOSHIPMENTCOUNTRYID=tcountry.ID
	inner join TBLCOUNTRY tcou 
	on tpi.FROMSHIPMENTCOUNTRYID=tcou.ID
     inner join TBLPICKINGPACKINGLINE tbpline
	 on ph.ID=tbpline.PICKINGPACKINGHEADERID
	 inner join ERP_SAD.dbo.tblItem tbim on 
	 tbpline.ITEMID=tbim.intID
	 inner join TBLPISCLINE tpiline
	 on tpi.ID=tpiline.PISCHEADER
	 
END