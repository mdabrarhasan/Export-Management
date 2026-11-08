CREATE procedure [dbo].[SPSaveFileUpload]
(
@typefileupload			TypeFileUpload readonly,
@UnitID int,
@ModuleCode varchar(100),
@Enroll	int,
@ProcessName	varchar(50),
@MessageName	varchar(50),
@Msg			varchar(100) out
)
as
begin try
declare @vPROCESSCODE varchar(100),@PROCESS varchar(100),@FILENAME varchar(100),@FILESIZE varchar(100),@submenuid int,
@FILETYPE varchar(100),@FILEURL varchar(100),@DOCUMENTCREATEDBY int,@CODE VARCHAR(100),@PROCESSID INT,@PROCESSCODE int,
@FILEID VARCHAR(100)
	   DECLARE sql_cursor CURSOR FOR  
	   select  PROCESSID,PROCESSCODE,[PROCESS],[FILENAME],[FILESIZE],[FILETYPE],[FILEURL],[DOCUMENTCREATEDBY] from @typefileupload
	   OPEN sql_cursor;  
	   FETCH NEXT FROM sql_cursor INTO @PROCESSID,@vPROCESSCODE,@PROCESS,@FILENAME,@FILESIZE,@FILETYPE,@FILEURL,@DOCUMENTCREATEDBY; 
	   set @FILEID=(select 'FILE' +''+cast(isnull(max(ID),0)+1 as varchar(100))  from TBLFILEDETAILS)

	   set @submenuid=(select ID from TBLSUBMENU where CODE=@ModuleCode)
	   --SELECT @ProcessID=ID,@vProcessCode=SQNUMBER FROM TBLSALESQUOTATIONHEADER WHERE ID=@PROCESSCODE and UNITID=@UnitID

	 

	   WHILE @@FETCH_STATUS = 0  
	   begin
	   
	   insert into TBLFILEDETAILS
	   (
	    [CODE],
		[SUBMENUID],
		[PROCESSID],
		[PROCESSCODE],
		[PROCESSNAME],
		[FILENAME],
		[FILESIZE],
		[FILETYPE],
		[FILEURL],
		[UNITID],
		[DOCUMENTCREATEDDATE],
		[DOCUMENTCREATEDBY],
		[DOCUMENTUPDATEDBY]
	   )
	   values
	    (
	    @FILEID,
		@submenuid,
		@PROCESSID,
		@vPROCESSCODE,
		@ProcessName,
		@FILENAME,
		@FILESIZE,
		@FILETYPE,
		@FILEURL,
		@UnitID,
		GETDATE(),
		@DOCUMENTCREATEDBY,
		@DOCUMENTCREATEDBY
		)
		FETCH NEXT FROM sql_cursor INTO  @PROCESSID,@vPROCESSCODE,@PROCESS,@FILENAME,@FILESIZE,@FILETYPE,@FILEURL,@DOCUMENTCREATEDBY; 
	end;
	set @Msg=(select trim(name) from TBLMESSAGE where SUBMENUID=@submenuid and CODE=@MessageName);
END try
begin catch
set @Msg=ERROR_MESSAGE()
end catch