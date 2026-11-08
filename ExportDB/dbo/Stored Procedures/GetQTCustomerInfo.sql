CREATE procedure [dbo].[GetQTCustomerInfo]
(
@Prefix		varchar(100),
@Unitid     INT
)
as
begin
	begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ERP_SAD.dbo.tblCustomer where intUnitID in(@Unitid) 
	--and ysnCustActive=1 
	and (strName like '%'+@Prefix+'%' or strName like '%'+@Prefix+'%');
	end;
end;