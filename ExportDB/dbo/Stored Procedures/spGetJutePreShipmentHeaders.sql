-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <14-11-2024>
-- Description:	<Jute Contract Headers Preshipment>
-- =============================================
CREATE PROCEDURE [dbo].[spGetJutePreShipmentHeaders]
@PackingRequestNumber AS VARCHAR(50)
AS
BEGIN
   -- set @ID = 1098  

	select * from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as Head
	where Head.PACKREQNUMBER = @PackingRequestNumber
END