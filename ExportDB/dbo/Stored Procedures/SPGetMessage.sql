-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPGetMessage] 
(
@CODE varchar(50)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT 
      [CODE]
      ,[MESSAGECODE]
      ,[MESSAGE]
	  ,[STATUS]
	FROM [ABGAPIS].[dbo].[TBLAPIMESSAGE] WHERE TRIM(CODE)=TRIM(@CODE)

END