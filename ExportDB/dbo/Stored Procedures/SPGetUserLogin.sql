-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPGetUserLogin] 
(
@USERID varchar(50),
@PASSWORD varchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT ID, 'EXEUCTIVE' TYPE, '541511' ENROLL, USERID, NAME, MOBILENO, EMAILID FROM TBLEMPLOYEE where trim(USERID)=@USERID AND 'ADMIN'=@PASSWORD;

END