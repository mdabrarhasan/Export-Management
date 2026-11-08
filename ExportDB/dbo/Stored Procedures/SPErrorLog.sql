
CREATE procedure [dbo].[SPErrorLog]
(
@PROCESSCODE		varchar(50),
@ERRORDETAILS		nvarchar(max),
@ModuleCode			varchar(50),
@PROCESSNAME		varchar(50),
@UNITID				INT,
@DOCUMENTCREATEDBY	int,
@DESCRIPTIONS		varchar(1000)
)
as
begin
insert into TBLERRORLOG values
(
@PROCESSCODE,
@ERRORDETAILS,
@ModuleCode,
@PROCESSNAME,
@UNITID,
GETDATE(),
@DOCUMENTCREATEDBY,
''
)
end;