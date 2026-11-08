CREATE PROCEDURE [dbo].[SPDeleteAggrementDetailsByID]
(
@id			int,
@UnitID		int,
@ModuleCode varchar(100),
@Enroll		int,
@ProcessCode varchar(100),
@MessageName varchar(100),
@Msg		varchar(100) out
)
as
begin try
 declare @Log varchar(max)
update TBLPISCLINE
set ISACTIVE=0 where ID=@id;
set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@MessageName)
	set @Log='update TBLPISCLINE set ISACTIVE=0 where ID='+CAST(@id as varchar(10))
	exec SPActivityLog @Log,'',@ProcessCode,@ModuleCode,@ProcessCode,@UNITID,@Enroll
end try

begin catch
	set @Msg=ERROR_MESSAGE()
	rollback
end catch