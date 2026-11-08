
CREATE procedure [dbo].[GetCustomerInfoShort]
(
@id				int
)
as
begin
	begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ERP_SAD.dbo.tblCustomer where intCusID=(select CUSTOMERID from TBLSALESQUOTATIONHEADER where ID=@id);
	end;
end;