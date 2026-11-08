
CREATE procedure [dbo].[SPEmailSend]
(
@ID				INT,
@MODULECODE		VARCHAR(50),
@ProcessCode	VARCHAR(50),
@PROCESSNAME	VARCHAR(50),
@Notification	varchar(100)
)
AS
BEGIN 
	declare @sellermail varchar(200),@buyermail	varchar(200),@sqnumber varchar(100),@strSubject varchar(500),@strBody nvarchar(max),@unitid	int, 
	@strInsertionTime varchar(50),@xml NVARCHAR(MAX),@totalprice decimal(18,2),@ccemailadd varchar(200),@emialadd varchar(200),@subject varchar(200),
	@notificationdetails varchar(max),@mailtypeid int,@CHECK INT

	SELECT @CHECK=COUNT(*)
	from TBLNOTIFICATION where SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) and CODE=@Notification and ISACTIVE=1

	IF @CHECK> 0
	BEGIN
		IF @PROCESSNAME='SQ'
			BEGIN
			SELECT @emialadd=EMAILADD,@ccemailadd=CCEMAILADD,@subject=SUBJECT,@notificationdetails=NOTIFICATIONDETAILS,@mailtypeid=MAILTYPEID 
			from TBLNOTIFICATION where SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) and CODE=@Notification and ISACTIVE=1
			SET @notificationdetails=(SELECT REPLACE(@notificationdetails,'@SQNUMBER',@ProcessCode))
			END;
		ELSE IF @PROCESSNAME='PI' OR @PROCESSNAME='SC'
			BEGIN
			SELECT @emialadd=EMAILADD,@ccemailadd=CCEMAILADD,@subject=SUBJECT,@notificationdetails=NOTIFICATIONDETAILS,@mailtypeid=MAILTYPEID 
			from TBLNOTIFICATION where SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) and CODE=@Notification and ISACTIVE=1
			SET @notificationdetails=(SELECT REPLACE(@notificationdetails,'@PINUMBER',@ProcessCode))
			END
		ELSE IF @PROCESSNAME='PC'
			BEGIN
			SELECT @emialadd=EMAILADD,@ccemailadd=CCEMAILADD,@subject=SUBJECT,@notificationdetails=NOTIFICATIONDETAILS,@mailtypeid=MAILTYPEID 
			from TBLNOTIFICATION where SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) and CODE=@Notification and ISACTIVE=1
			SET @notificationdetails=(SELECT REPLACE(@notificationdetails,'@PCNUMBER',@ProcessCode))
			END
		ELSE IF @PROCESSNAME='LC'
			BEGIN
			SELECT @emialadd=EMAILADD,@ccemailadd=CCEMAILADD,@subject=SUBJECT,@notificationdetails=NOTIFICATIONDETAILS,@mailtypeid=MAILTYPEID 
			from TBLNOTIFICATION where SUBMENUID=(SELECT ID FROM TBLSUBMENU WHERE CODE=@MODULECODE) and CODE=@Notification and ISACTIVE=1
			SET @notificationdetails=(SELECT REPLACE(@notificationdetails,'@LCNUMBER',@ProcessCode))
			END

			--INSERT INTO ERP_Global.dbo.tblEmailSend
			--		(
			--		[strEmailAdd],
			--		[strCCEmailAdd],
			--		[strSubject],
			--		[strBody],
			--		[dteInsertTime],
			--		[intMailTypeID],
			--		[ysnHTML]
			--		)
			--		VALUES
			--		(
			--		@emialadd,
			--		@ccemailadd,
			--		@subject,
			--		@notificationdetails,
			--		GETDATE(),
			--		@mailtypeid,
			--		1
			--		)
	END	
END