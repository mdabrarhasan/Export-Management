

/*
DECLARE @Msg VARCHAR(100)
EXEC SPApprove 2414,178,'PC00001',536167,0,'','APPR','PCAPPR','PCAPPROVE','PC',@Msg OUTPUT
SELECT @Msg
*/

--SELECT * FROM TBLAPPROVERMATRIXHISTORY WHERE PROCESSNAME='PC'


CREATE procedure [dbo].[SPApprove]
(
@HistryID		int,
@unitid			int,
@ModuleCode		varchar(100),
@Enroll			int,
@ID				int,
@Remarks		varchar(500),
@ApproveCode	varchar(100),
@ApproveMsg		varchar(100),
@Notification	varchar(100),
@ProcessName	varchar(100),	
@Msg			varchar(100) output
)
as
begin try

		declare @hid int,@lineid int,@batchid varchar(100),@processid int,@process varchar(100),@initiatorid int,@currentactiontacker int,
		@nextactiontacker int,@description varchar(100),@doccreateddate date,@doccreatedby int,@checksequence int,@approvalcount int,@checkcom int,@checkcurrentsequence int,
		@checkpending int,@checkapprove int, @sqllog varchar(max),@submenuid int,@processcode varchar(100),@CHECKAPPROVEALLOWED INT

		set @checkcom=(select id from TBLDOCUMENTSTATUS where CODE='COMP')
		set @checkpending=(select id from TBLDOCUMENTSTATUS where CODE='PEND')
		set @checkapprove=(select id from TBLDOCUMENTSTATUS where CODE='APPR')
		set @submenuid=(select ID from TBLSUBMENU where CODE=@ModuleCode)
		--set @hid=(select ID from TBLAPPROVERMATRIXHEADER where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and UNITID=@unitid)
		--set @lineid=(select ID from TBLAPPROVERMATRIXLINE where APPROVERMATRIXHEADERID=@hid and VALUE=@Enroll)


		SET @HID=(SELECT TOP 1 ID FROM TBLAPPROVERMATRIXHEADER WHERE SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE))
		SET @LINEID=CASE WHEN @unitid=0 THEN (SELECT ID FROM TBLAPPROVERMATRIXLINE WHERE APPROVERMATRIXHEADERID=@HID AND VALUE=@ENROLL) ELSE (SELECT ID FROM TBLAPPROVERMATRIXLINE WHERE APPROVERMATRIXHEADERID=@HID AND VALUE=@ENROLL AND UNITID=@unitid) END  

		/*set @checkcurrentsequence=(select SEQUENCE from TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b where a.ID=b.APPROVERMATRIXHEADERID and SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and VALUE=@Enroll and a.UNITID=@unitid);
		set @checksequence=(select SEQUENCE+1 from TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b where a.ID=b.APPROVERMATRIXHEADERID and APPROVERMATRIXHEADERID=@hid and VALUE=@Enroll and a.UNITID=@unitid);
		set @nextactiontacker=(select VALUE from TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b where a.ID=b.APPROVERMATRIXHEADERID and APPROVERMATRIXHEADERID=@hid and b.SEQUENCE=@checksequence and a.UNITID=@unitid);*/


		SET @checkcurrentsequence=CASE WHEN @unitid=0 THEN (SELECT SEQUENCE FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) AND VALUE=@ENROLL) ELSE 
		(SELECT SEQUENCE FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) AND VALUE=@ENROLL AND B.UNITID=@unitid) END


		SET @checksequence=CASE WHEN @unitid=0 THEN (SELECT SEQUENCE+1 FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND APPROVERMATRIXHEADERID=@HID AND VALUE=@ENROLL) ELSE
		(SELECT SEQUENCE+1 FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND APPROVERMATRIXHEADERID=@HID AND VALUE=@ENROLL AND B.UNITID=@unitid) END

		SET @nextactiontacker=CASE WHEN @unitid=0 THEN  (SELECT VALUE FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND APPROVERMATRIXHEADERID=@HID AND b.SEQUENCE=@checksequence ) ELSE 
		(SELECT VALUE FROM TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b WHERE a.ID=b.APPROVERMATRIXHEADERID AND APPROVERMATRIXHEADERID=@HID AND b.SEQUENCE=@checksequence AND B.UNITID=@unitid ) END


		select @batchid=BATCHID,@processid=PROCESSID,@process=PROCESSNAME,@processcode=PROCESSCODE,@initiatorid=INITIATORID,@description=DESCRIPTIONS,@doccreateddate=DOCUMENTCREATEDDATE,@doccreatedby=DOCUMENTCREATEDBY from TBLAPPROVERMATRIXHISTORY 
		where ID=@HistryID --APPROVERMATRIXHEADERID=@hid and SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and PROCESSID=@ID and ACTIONTAKERID=@Enroll;


		set @approvalcount=CASE WHEN @unitid=0 THEN (select max(SEQUENCE) from TBLAPPROVERMATRIXLINE where APPROVERMATRIXHEADERID=@hid) ELSE
		(select max(SEQUENCE) from TBLAPPROVERMATRIXLINE where APPROVERMATRIXHEADERID=@hid AND UNITID=@unitid) END
		--set @approvalcount=(select max(SEQUENCE) from TBLAPPROVERMATRIXLINE where APPROVERMATRIXHEADERID=(select ID from TBLSUBMENU where CODE=@ModuleCode))
		SET @CHECKAPPROVEALLOWED=(select ISAPPROVALALLOWED from TBLAPPROVERMATRIXHEADER where ID=@hid)

		if (@approvalcount=@checkcurrentsequence) OR (@CHECKAPPROVEALLOWED=0)        ---FINAL APPROVER
		begin
			update TBLAPPROVERMATRIXHISTORY
			set DOCUMENTSTATUSID=@checkapprove,DOCUMENTCREATEDDATE=GETDATE(),DOCUMENTCREATEDBY=@Enroll,DESCRIPTIONS=@Remarks where ID=@HistryID;-- APPROVERMATRIXHEADERID=@hid and SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and PROCESSID=@ID and ACTIONTAKERID=@Enroll;


			IF @ModuleCode='SQ00001' 
			BEGIN
			update TBLSALESQUOTATIONHEADER 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='PI00001' OR @ModuleCode='SC00001'
			BEGIN
			update TBLPISCHEADER 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='LC00001'
			BEGIN
			update TBLLCDETAILS 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='PC00001'
			BEGIN
			SELECT @checkcom,@processid
			update TBLPRICECONFIRMHEADER 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='PR00001'
			BEGIN
			update TBLPACKINGREQUESTHEADER 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			EXEC SPSAVEPICKPACKCONFIRM @processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='PRC00001'
			BEGIN
			update TBLPICKINGPACKINGHEADER 
			set DOCUMENTSTATUSID=@checkcom where ID=@processid
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE IF @ModuleCode='IC00001' --FOR TREASURY
			BEGIN
			UPDATE TBLINTERESTCALCULATION  
			set DOCSTATUSID=@checkcom where ID=@processid
			set @Msg='DATA APPROVED SUCCESSFULLY.'
			--set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			END
			ELSE
			BEGIN
			SET @MODULECODE=(SELECT CODE FROM TBLSUBMENU WHERE ID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID))
			--set @ApproveMsg=(select id from TBLDOCUMENTSTATUS where CODE=@RejectCode)
			--set @hid=(select ID from TBLAPPROVERMATRIXHEADER where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and UNITID=@unitid)
		
			SET @ProcessName=(SELECT PROCESSNAME FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID)
			SET @ProcessCode=@ProcessName+cast(@ID as varchar(100))
				  IF @MODULECODE='PRE00001'
				  BEGIN
				  SET @PROCESSNAME='PRE'
				  SET @ApproveMsg='PREAPPR'
				  set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID) and CODE=@ApproveMsg)
				  END;

				  ELSE IF @MODULECODE='POST00001'
				  BEGIN
				  SET @PROCESSNAME='POST'
				  SET @ApproveMsg='POSTAPPR'
				  set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID) and CODE=@ApproveMsg)
				  END;

				UPDATE TBLDOCHEADER
				SET DOCUMENTSTATUSID=@checkcom,FLAG=1 WHERE ID=(SELECT PROCESSID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID)
			  END;
		
		end;
		else
		begin 
			IF @ModuleCode='SQ00001' 
			BEGIN
			update TBLSALESQUOTATIONHEADER 
			set FLAG=1 where ID=@processid
			
			END
			ELSE IF @ModuleCode='PI00001' OR @ModuleCode='SC00001'
			BEGIN
			update TBLPISCHEADER 
			set FLAG=1 where ID=@processid
			
			END
			ELSE IF @ModuleCode='LC00001'
			BEGIN
			update TBLLCDETAILS 
			set FLAG=1 where ID=@processid
		
			END
			ELSE IF @ModuleCode='PC00001'
			BEGIN
	
			update TBLPRICECONFIRMHEADER 
			set FLAG=1 where ID=@processid
			END

			ELSE IF @ModuleCode='PR00001'
			BEGIN
			update TBLPRICECONFIRMHEADER 
			set FLAG=1 where ID=@processid
			END

			ELSE IF @ModuleCode='PRC00001'
			BEGIN
			update TBLPRICECONFIRMHEADER 
			set FLAG=1 where ID=@processid
			END
			ELSE IF @ModuleCode='IC00001' --TREASURY
			BEGIN
			update TBLINTERESTCALCULATION 
			set FLAG=1 where ID=@processid
			END

			ELSE
			BEGIN
			SET @MODULECODE=(SELECT CODE FROM TBLSUBMENU WHERE ID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID))
			--set @ApproveMsg=(select id from TBLDOCUMENTSTATUS where CODE=@RejectCode)
			--set @hid=(select ID from TBLAPPROVERMATRIXHEADER where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and UNITID=@unitid)
		
			SET @ProcessName=(SELECT PROCESSNAME FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID)
			SET @ProcessCode=@ProcessName+cast(@ID as varchar(100))

				  IF @MODULECODE='PRE00001'
				  BEGIN
				  SET @PROCESSNAME='PRE'
				  SET @ApproveMsg='PREAPPR'
				  set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID) and CODE=@ApproveMsg)
				  END;

				  ELSE IF @MODULECODE='POST00001'
				  BEGIN
				  SET @PROCESSNAME='POST'
				  SET @ApproveMsg='POSTAPPR'
				  set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(SELECT SUBMENUID FROM TBLAPPROVERMATRIXHISTORY WHERE ID=@ID) and CODE=@ApproveMsg)
				  END;

			update TBLDOCHEADER 
			set FLAG=1 where ID=@processid
			END

			insert into TBLAPPROVERMATRIXHISTORY
			(
			[APPROVERMATRIXHEADERID],
			[APPROVERMATRIXLINEID],
			[SUBMENUID],
			[BATCHID],
			[PROCESSID],
			[PROCESSCODE],
			PROCESSNAME,
			[INITIATORID],
			[ACTIONTAKERID],
			[DOCUMENTSTATUSID],
			[UNITID],
			--DESCRIPTIONS,
			DOCUMENTCREATEDDATE,
			DOCUMENTCREATEDBY
			)
			values
			(
			@hid,
			@lineid,
			@submenuid,
			@batchid,
			@processid,
			@processcode,
			@process,
			@initiatorid,
			@nextactiontacker,
			@checkpending,
			@unitid,
			--@Remarks,
			@doccreateddate,
			@doccreatedby
			)

			update TBLAPPROVERMATRIXHISTORY
			set DOCUMENTSTATUSID=@checkapprove,DOCUMENTCREATEDDATE=GETDATE(),DOCUMENTCREATEDBY=@Enroll,DESCRIPTIONS=@Remarks where ID=@HistryID --APPROVERMATRIXHEADERID=@hid and SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and PROCESSID=@ID and ACTIONTAKERID=@Enroll;
			set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@ApproveMsg)
			end;

			Update ABGAPIS.dbo.TBLSALESQUOTATIONHEADER
            Set flag=1
            where DOCUMENTSTATUSID=7;

			Update ABGAPIS.dbo.TBLPACKINGREQUESTHEADER
            Set flag=1
            where DOCUMENTSTATUSID=7;

			Update ABGAPIS.dbo.TBLPISCHEADER
            Set flag=1
            where DOCUMENTSTATUSID=7;

			Update ABGAPIS.dbo.TBLPICKINGPACKINGHEADER
            Set flag=1
            where DOCUMENTSTATUSID=7;

			Update ABGAPIS.dbo.TBLINTERESTCALCULATION --FOR TREASURY
            Set flag=1 where DOCSTATUSID=7;
			--EXEC SPEmailSend @id,@MODULECODE,@ProcessCode,@ProcessName,@Notification
end try
begin catch
set @Msg=ERROR_MESSAGE()
end catch