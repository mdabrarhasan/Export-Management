-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <20-2-2024>
-- Description:	<deliverychallan report>
-- =============================================
CREATE PROCEDURE [dbo].[sprReportGatePass] 
	@pickpackingid int
AS
BEGIN
	
	SET NOCOUNT ON;
	declare @lcno varchar(50) ,@pi int,@packingreqlineid int, @pickingpackingreqid int,@pickingpackinginvoice int,@pickingpackingnumber varchar(50),@datepicking varchar(50);
	--select @packingreqlineid=ID from TBLPACKINGREQUESTHEADER where PISCNUMBER=@pinumber; -- pi number
	select @pickingpackingreqid=PACKINGREQUESTHEADERID,@packingreqlineid=ID,@pickingpackinginvoice=INVOICENO,@pickingpackingnumber=PICKPACKNUMBER,@datepicking=PICKPACKDATE from TBLPICKINGPACKINGHEADER where ID=@pickpackingid;
	select @pi=PISCNUMBER from TBLPACKINGREQUESTHEADER where ID=@pickingpackingreqid
	select @lcno=LCNUMBER from TBLLCDETAILS

	SELECT pd.strItemName,pd.strUoM,pi.QUANTITY,pi.TRUCKNO,@lcno as Lcno, 
(select strName from ERP_SAD.dbo.tblCustomer where intCusID=(select CUSTOMERID from TBLPICKINGPACKINGHEADER where ID=pi.PICKINGPACKINGHEADERID)) as customername,
(select strAddress from ERP_SAD.dbo.tblCustomer where intCusID=(select CUSTOMERID from TBLPICKINGPACKINGHEADER where ID=pi.PICKINGPACKINGHEADERID)) as customeraddress,
(select strPhone from ERP_SAD.dbo.tblCustomer where intCusID=(select CUSTOMERID from TBLPICKINGPACKINGHEADER where ID=pi.PICKINGPACKINGHEADERID)) as customerphone
,@datepicking as date,@pickingpackinginvoice as deliverychallan,@pickingpackingnumber as po_number FROM ERP_Inventory.dbo.tblItemList pd
 JOIN TBLPICKINGPACKINGLINE pi ON pd.intItemID = pi.ITEMID where pi.PICKINGPACKINGHEADERID=@pickpackingid;
    
	
END