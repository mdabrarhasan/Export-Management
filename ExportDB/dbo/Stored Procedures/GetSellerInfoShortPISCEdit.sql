CREATE procedure GetSellerInfoShortPISCEdit
(
@id				int
)
as
begin
	begin
	
select intUnitID as ID,strUnit as Name,strTIN as Tin,strPhone as Phone,strAccEmailAddress as Email,'N/A' as Address
	from ERP_HR.dbo.tblUnit where intUnitID=(SELECT UNITID FROM TBLSALESQUOTATIONHEADER WHERE ID=(SELECT SALESQUOTATIONHEADERID FROM TBLLCDETAILS WHERE ID=@id))
	end;
end;