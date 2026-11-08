-- =============================================
-- Author:		<Kazi Mahamud Hasan>
-- Create date: <1-2-2024>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sprcancle] 
	
	@unitid int,
	@ModuleCode varchar(50),@Enroll int,@ID int,@Remarks int,@mgs varchar(100) output
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
    DECLARE @Sqid int,@piid int,@PRID INT,@pc int,@pr int ,@ppid int,@lcid int,@procode varchar(50)
	select @SQid=ID from TBLSALESQUOTATIONHEADER WHERE ID=@Remarks AND DOCUMENTSTATUSID=7 ;
	--IF(@SQid IS NOT NULL)
	--BEGIN
	
	--END
	--ELSE
	--BEGIN
	
	--END
	
if(@ID=1)
    
begin
select @piid=ID from TBLPISCHEADER where SALESQUOTATIONHEADERID=@SQid AND DOCUMENTSTATUSID=7;
	select @lcid=ID from TBLLCDETAILS where PISCHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pc=ID FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pr=ID FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
	select @ppid=ID from TBLPICKINGPACKINGHEADER where PACKINGREQUESTHEADERID=@pr AND DOCUMENTSTATUSID=7
if (@piid IS NOT NULL)
BEGIN
    set @mgs='Please At First Cancle The Profoma Invoice Request' 
END
else
begin
select @SQid=ID,@procode=SQNUMBER from TBLSALESQUOTATIONHEADER WHERE ID=@ID AND DOCUMENTSTATUSID=7 ;
 exec SPActivityLog 'cancled SQ','',@ModuleCode,'SQ',@procode,@unitid,@Enroll
update TBLSALESQUOTATIONHEADER set ISACTIVE=0,DOCUMENTSTATUSID=3 where ID=@Remarks;
end

end
ELSE IF(@ID=2)
begin
select @piid=ID from TBLPISCHEADER where ID=@Remarks AND DOCUMENTSTATUSID=7;
	select @lcid=ID from TBLLCDETAILS where PISCHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pc=ID FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pr=ID FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
	select @ppid=ID from TBLPICKINGPACKINGHEADER where PACKINGREQUESTHEADERID=@pr AND DOCUMENTSTATUSID=7
if (@PRID IS NOT NULL)
BEGIN
    set @mgs='Please At First Cancle The Packing Request '
END
else if(@pc IS NOT NULL)
begin
 set @mgs='Please At First Cancle The Price Confirm Request '
end
else if(@lcid IS NOT NULL)
begin
 set @mgs='Please At First Cancle The LC Request '
end
else
begin
select @piid=ID,@procode=NUMBER from TBLPISCHEADER where SALESQUOTATIONHEADERID=@SQid AND DOCUMENTSTATUSID=7;
exec SPActivityLog 'cancled PI','',@ModuleCode,'PI',@procode,@unitid,@Enroll
update TBLPISCHEADER set ISACTIVE=0,DOCUMENTSTATUSID=3 where ID=@piid;
end
end
ELSE IF(@ID=3)
begin
select @piid=ID from TBLPISCHEADER where ID=@Remarks AND DOCUMENTSTATUSID=7;
	select @lcid=ID from TBLLCDETAILS where PISCHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pc=ID FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pr=ID FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
	select @ppid=ID from TBLPICKINGPACKINGHEADER where PACKINGREQUESTHEADERID=@pr AND DOCUMENTSTATUSID=7
if (@ppid IS NOT NULL)
BEGIN
    set @mgs='This Cancle is not Possible Beacuse Alreay Delivery Complete '
END
else
begin
SELECT @pr=ID,@procode=PACKREQNUMBER FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
exec SPActivityLog 'cancled PR','',@ModuleCode,'PR',@procode,@unitid,@Enroll
update TBLPACKINGREQUESTHEADER set ISACTIVE=0,DOCUMENTSTATUSID=3 where ID=@pr;

end
end
ELSE IF(@ID=4)
begin
select @piid=ID from TBLPISCHEADER where ID=@Remarks AND DOCUMENTSTATUSID=7;
	select @lcid=ID from TBLLCDETAILS where PISCHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pc=ID FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pr=ID FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
	select @ppid=ID from TBLPICKINGPACKINGHEADER where PACKINGREQUESTHEADERID=@pr AND DOCUMENTSTATUSID=7
if(@pc is not null)
begin
if (@PRID IS NOT NULL)
begin
  set @mgs='Please At First Cancle The Packing Request '
end
else
begin
SELECT @procode=PCNUMBER FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7
exec SPActivityLog 'cancled PC','',@ModuleCode,'PC',@procode,@unitid,@Enroll
update TBLLCDETAILS set ISACTIVE=0,DOCUMENTSTATUSID=3 where ID=@lcid;
end
end
end
ELSE IF(@ID=5)
begin
select @piid=ID from TBLPISCHEADER where ID=@Remarks AND DOCUMENTSTATUSID=7;
	select @lcid=ID from TBLLCDETAILS where PISCHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pc=ID FROM TBLPRICECONFIRMHEADER WHERE PROFORMAINVOICEHEADERID=@piid AND DOCUMENTSTATUSID=7;
	SELECT @pr=ID FROM TBLPACKINGREQUESTHEADER WHERE PISCNUMBER=@piid AND DOCUMENTSTATUSID=7
	select @ppid=ID from TBLPICKINGPACKINGHEADER where PACKINGREQUESTHEADERID=@pr AND DOCUMENTSTATUSID=7
if(@lcid is not null)
begin
if (@PRID IS NOT NULL)
begin
  set @mgs='Please At First Cancle The Packing Request '
end
else
begin
SELECT @procode=LCNUMBER FROM TBLLCDETAILS WHERE PISCHEADERID=@piid AND DOCUMENTSTATUSID=7
exec SPActivityLog 'cancled LC','',@ModuleCode,'LC',@procode,@unitid,@Enroll
update TBLLCDETAILS set ISACTIVE=0,DOCUMENTSTATUSID=3 where ID=@lcid;
end
end
end
end
--	IF (@ppid IS NOT NULL)
--BEGIN
--    set @mgs='It not will  be Cancled Beacuse It Delivered'
--END
--else if (@PRID IS NOT NULL)
--BEGIN
--    set @mgs='Please At First Cancle The Packing Request '
--END
--else if (@piid IS NOT NULL)
--BEGIN
--    set @mgs='Please At First Cancle The Profoma Invoice Request '
--END
--else if (@sqid IS NOT NULL)
--BEGIN
--    set @mgs='Please At First Cancle The Sales Quotation Request '
--END
--END