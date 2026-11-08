CREATE procedure [dbo].[GetCustomerInfoShortPISC]
(
@id				int
)
as
begin
	begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ERP_SAD.dbo.tblCustomer where intCusID=(SELECT CUSTOMERID FROM TBLSALESQUOTATIONHEADER WHERE ID=(SELECT SALESQUOTATIONHEADERID FROM TBLPISCHEADER WHERE ID=@id))
	end;
end;