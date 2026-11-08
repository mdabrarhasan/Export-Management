CREATE procedure [dbo].[GetCustomerInfo]
(
@Prefix		varchar(100)
)
as
begin
	begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ERP_SAD.dbo.tblCustomer where intUnitID in(91,178,182) and ysnCustActive=1 and (strName like '%'+@Prefix+'%' or strName like '%'+@Prefix+'%');
	end;
end;