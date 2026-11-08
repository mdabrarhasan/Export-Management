-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPAPILOGINLOG] 
(
@TYPE varchar(50),
@USERID varchar(50),
@TOKEN varchar(max)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	IF @TYPE='LOGIN'
	BEGIN
	INSERT INTO [dbo].[TBLAPILOGINLOG]
           (
		    [USERID]
           ,[LOGINTIME]
           ,[DOCUMENTCREATEDDATE]
		   ,[TOKEN]
           ,[DESCRIPTION]		   
		   )
     VALUES
           (
		   @USERID,
           GETDATE(),
		   GETDATE(),
		   @TOKEN,
		   'LOGIN'
		   )
	END	

	IF @TYPE='LOGOUT'
	BEGIN
		UPDATE [dbo].[TBLAPILOGINLOG] SET LOGOUTTIME = GETDATE() WHERE USERID=@USERID AND TOKEN=@TOKEN
	END
END