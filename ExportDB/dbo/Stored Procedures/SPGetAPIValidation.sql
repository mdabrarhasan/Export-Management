-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPGetAPIValidation] 
(
@USERNAME varchar(50),
@PASSWORD varchar(max)
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT USERNAME, PASSWORD, ASSIGNEEPARTY from TBLAPIACCESSPERMISSION where trim(USERNAME)=@USERNAME and trim(PASSWORD)=@PASSWORD

END