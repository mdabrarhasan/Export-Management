-- =============================================
-- Author:		<Fahim Hossain rafayet>
-- Create date: <14-11-2024>
-- Description:	<Need Jute Preshipment Packing List Headers>
-- =============================================

-- SpGetJutePreshipmentPackingListHeader 1100

CREATE PROCEDURE [dbo].[SpGetJutePreshipmentPackingListHeader] 
@PackingRequestNumber AS VARCHAR(50)
AS
BEGIN

 -- set @ID = 1100

	select 
INVOICENUMBER,
INVOICEDATE,
CONTRACTNO,
CONTRACTDATE,
SHIPPEDFROM,
SHIPPEDTO,
SHIPPEDPER,
PURCHASEORDERNO,
PURCHASEORDERDATED,
(select sum(ADDITIONALWEIGHT) from ABGAPIS.dbo.TBLPACKINGREQUESTLINE as Line
	where line.PACKINGREQUESTHEADERID = head.id) as 'Total Nett WT',
(select sum(GROSSWEIGHT) from ABGAPIS.dbo.TBLPACKINGREQUESTLINE as Line
	where line.PACKINGREQUESTHEADERID = head.id) as 'Total GROSS WT'
from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as head
where head.PACKREQNUMBER = @PackingRequestNumber
END