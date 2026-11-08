
CREATE PROCEDURE [dbo].[SPDELETEPACKINGREQUEST]
(
@id		int,
@DOCUMENTCREATEDBY	int,
@UNITID					int,
@ModuleCode				varchar(50),
@ProcessCode			varchar(50),
@MessageName			varchar(50),
@Msg    varchar(100) out
)
as
 begin
 declare @Log varchar(max)
	update TBLPACKINGREQUESTHEADER
	set ISACTIVE=0 where ID=@id;
	set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@MessageName)
	set @Log='update TBLPACKINGREQUESTHEADER set ISACTIVE=0 where ID='+CAST(@id as varchar(10))
	exec SPActivityLog @Log,'',@ProcessCode,@ModuleCode,@ProcessCode,@UNITID,@DOCUMENTCREATEDBY
 end