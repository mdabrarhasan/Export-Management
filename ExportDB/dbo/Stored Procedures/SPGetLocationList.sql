-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SPGetLocationList] 
--(
--@USERID varchar(50),
--@DEVICEINFO varchar(max)
--)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT ID, CODE, NAME FROM TBLEMPLOYEE;

END