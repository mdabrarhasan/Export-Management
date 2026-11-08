-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- exec sprDasboard
-- =============================================
CREATE PROCEDURE [dbo].[sprDasboard] 
	@Enroll int
AS
BEGIN
	
	SET NOCOUNT ON;
	declare  
	     @ID INT,
	    @sqp int,
		@sqc int,
		@sqr int,
		@pip int,
		@pic int,
		@pir int,
		@scp int,
		@scc int,
		@scr int,
		@lcp int,
		@lcc int,
		@lcr int,
		@pcp int,
		@pcc int,
		@pcr int,
		@prp int,
		@prc int,
		@prr int,
		@ppp int,
		@ppc int,
		@ppr int
		 
   select @sqc=count(DOCUMENTSTATUSID) from TBLSALESQUOTATIONHEADER where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @sqp=count(DOCUMENTSTATUSID) from TBLSALESQUOTATIONHEADER where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @sqr=count(DOCUMENTSTATUSID) from TBLSALESQUOTATIONHEADER where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll
    select @pic=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @pip=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @pir=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll
   select @scc=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=7 and AGREEMENTTYPEID=2 and DOCUMENTCREATEDBY=@Enroll
   select @scp=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=1 AND AGREEMENTTYPEID=2 and DOCUMENTCREATEDBY=@Enroll
   select @scr=count(DOCUMENTSTATUSID) from TBLPISCHEADER where DOCUMENTSTATUSID=3 AND AGREEMENTTYPEID=2 and DOCUMENTCREATEDBY=@Enroll

   select @lcc=count(DOCUMENTSTATUSID) from TBLLCDETAILS where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @lcp=count(DOCUMENTSTATUSID) from TBLLCDETAILS where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @lcr=count(DOCUMENTSTATUSID) from TBLLCDETAILS where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll

         select @pcc=count(DOCUMENTSTATUSID) from TBLPRICECONFIRMHEADER where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @pcp=count(DOCUMENTSTATUSID) from TBLPRICECONFIRMHEADER where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @pcr=count(DOCUMENTSTATUSID) from TBLPRICECONFIRMHEADER where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll

      select @prc=count(DOCUMENTSTATUSID) from TBLPACKINGREQUESTHEADER where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @prp=count(DOCUMENTSTATUSID) from TBLPACKINGREQUESTHEADER where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @prr=count(DOCUMENTSTATUSID) from TBLPACKINGREQUESTHEADER where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll

   select @ppc=count(DOCUMENTSTATUSID) from TBLPICKINGPACKINGHEADER where DOCUMENTSTATUSID=7 and DOCUMENTCREATEDBY=@Enroll
   select @ppp=count(DOCUMENTSTATUSID) from TBLPICKINGPACKINGHEADER where DOCUMENTSTATUSID=1 and DOCUMENTCREATEDBY=@Enroll
   select @ppr=count(DOCUMENTSTATUSID) from TBLPICKINGPACKINGHEADER where DOCUMENTSTATUSID=3 and DOCUMENTCREATEDBY=@Enroll
   SET @ID=1;

		SELECT 
		@ID as ID,@sqp as SQP,@sqc AS SQC ,
		@sqr AS SQR,
		@pip AS PIP,
		@pic AS PIC,
		@pir AS PIR,
		@scp AS SCP,
		@scc  AS SCC ,
		@scr AS SCR,
		@lcp  AS LCP,
		@lcc AS LCC,
		@lcr AS LCR,
		@pcp AS PCP,
		@pcc AS PCC,
		@pcr AS PCR,
		@prp AS PRP,
		@prc  AS PRC,
		@prr AS PRR,
		@ppp AS PPP,
		@ppc AS PPC,
		@ppr AS PPR ;


	
END