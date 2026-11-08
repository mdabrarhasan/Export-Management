
CREATE procedure SPGetFileConfig
(
@code		varchar(100),
@folderdirectory	varchar(max) output,
@allowedfilesizekb	decimal(18,2) output,
@allowedfiletype	varchar(max) output
)
as
begin
	select @folderdirectory=FOLDERDIRECTORY,@allowedfilesizekb=ALLOWEDFILESIZEASKB,@allowedfiletype=ALLOWEDFILETYPE from TBLFILEUPLOADSETUP where CODE=@code
end;