
CREATE procedure [dbo].[SPActivityLog]
(
@ACTIVITYLOG 			nvarchar(max),
@ACTIVITYLOGXML			nvarchar(max),
@CODE					NVARCHAR(500),
@ModuleCode				varchar(100),
@PROCESSNAME			varchar(100),
@UNITID					int,	
@DOCUMENTCREATEDBY		int
)
as
begin try
insert into TBLACTIVITYLOG
VALUES
(
@ACTIVITYLOG,
@ACTIVITYLOGXML,
@CODE,
@PROCESSNAME,
@ModuleCode,
@UNITID,
GETDATE(),
@DOCUMENTCREATEDBY,
''
)
end try
begin catch
 
end catch