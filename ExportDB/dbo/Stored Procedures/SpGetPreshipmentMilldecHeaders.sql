-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <16-11-2024>
-- Description:	<Headers for Jute Preshipment Mill dec. >
-- =============================================

-- exec SpGetPreshipmentMilldecHeaders 'MD-101124-1098'

CREATE PROCEDURE SpGetPreshipmentMilldecHeaders
	@PackReqNumber varchar(50)
AS
BEGIN
	
	--set @PackReqNumber = 'MD-101124-1098'
	
	select 
sum(TOTALPALLET) as TotalPallet,
sum(TOTALCARTOON) as TotalCartoon,
sum(ADDITIONALWEIGHT) as NettWt,
sum(GROSSWEIGHT) as GrossWt,
sum(TOTALSPOOL) as Totalspools
from ABGAPIS.dbo.TBLPACKINGREQUESTLINE as line
inner join ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as Head
on line.PACKINGREQUESTHEADERID = head.ID
where head.PACKREQNUMBER = @PackReqNumber
Group by head.ID
;
END