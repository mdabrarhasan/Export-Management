-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

-- exec SpGetCommissionerMail 1

CREATE PROCEDURE [dbo].[SpGetCommissionerMail]
	@PackingRequestNumber AS VARCHAR(50)
AS
BEGIN
	

	declare @Name varchar(50) = 'SILVER SYNDICATE';
	
	select CONTRACTNO,SHIPPEDFROM, CONTRACTDATE,@Name as name,INVOICEDATE from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER  as head
	where head.PACKREQNUMBER = @PackingRequestNumber
	;

END