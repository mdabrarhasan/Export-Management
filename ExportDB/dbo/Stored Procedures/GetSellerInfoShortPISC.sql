CREATE procedure [dbo].[GetSellerInfoShortPISC]
(
@id				int
)
as
begin
	begin
	
select intUnitID as ID,strDescription as Name,strTIN as Tin,strPhone as Phone,strAccEmailAddress as Email,'N/A' as Address
	from ERP_HR.dbo.tblUnit where intUnitID=(SELECT UNITID FROM TBLSALESQUOTATIONHEADER WHERE ID=(SELECT SALESQUOTATIONHEADERID FROM TBLPISCHEADER WHERE ID=@id))
	end;
end;