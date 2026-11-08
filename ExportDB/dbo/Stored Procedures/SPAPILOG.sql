-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPAPILOG] 
(
@TYPE varchar(50),
@LOG varchar(max),
@PROCESSNAME varchar(50),
@DOCUMENTCREATEDBY varchar(50),
@token varchar(max)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	IF @TYPE='ACT'
	BEGIN
		
		INSERT INTO [dbo].[TBLAPIACTIVITYLOG]
			   ([ACTIVITYLOG]
			   ,[PROCESSNAME]
			   ,[DOCUMENTCREATEDDATE]
			   ,[DOCUMENTCREATEDBY]
			   ,[TOKEN])
		 VALUES
			   (
			   UPPER(@LOG),
			   @PROCESSNAME,
			   GETDATE(),
			   @DOCUMENTCREATEDBY,
			   @token
			   )
		
	END

	IF @TYPE='ERR'
	BEGIN
		INSERT INTO [dbo].[TBLAPIERRORLOG]
			   ([ERRORLOG]
			   ,[PROCESSNAME]
			   ,[DOCUMENTCREATEDDATE]
			   ,[DOCUMENTCREATEDBY]
			   ,[TOKEN])
		 VALUES
			   (
			   UPPER(@LOG),
			   @PROCESSNAME,
			   GETDATE(),
			   @DOCUMENTCREATEDBY,
			   @token
			   )
	END
END