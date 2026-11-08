-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <16-11-2024>
-- Description:	<Jute Report Mill declaration>
-- =============================================
CREATE PROCEDURE [dbo].[SpGetJuteMillDecReport]
	@PackReqNumber varchar(50)
AS
BEGIN
    -- set @PackReqNumber = 'MD-101124-1098'


select  
        SERIALNO as 'Serial No.',
	    item.strProductName as 'Quality',
        CONTRACTNO as 'Cont No',
        cus.strName as 'Buyer',
		TOTALPALLET as 'Total Pallet',
		TOTALCARTOON as 'Total Cartoon',
		ADDITIONALWEIGHT as 'Nett Wt.',
		GROSSWEIGHT as 'Gross Wt.',
		SINO as 'SI.NO.',
		TOTALSPOOL as 'Total Spools',
		MARKINK as 'Mark Ink',
		SPOOLORPALAT as 'SPOOL/PALLET'
        from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as Head
Inner join ABGAPIS.dbo.TBLPACKINGREQUESTLine as line 
on line.PACKINGREQUESTHEADERID = head.ID
Inner join ABGAPIS.dbo.TBLPISCHEADER as ps
on ps.ID = head.PISCNUMBER
inner join ERP_SAD.dbo.tblCustomer as cus
on cus.intCusID =ps.CUSTOMERID
inner join ERP_SAD.dbo.tblItem ITEM 
on  ITEM.intID = line.ITEMID
where head.PACKREQNUMBER = @PackReqNumber
;
END