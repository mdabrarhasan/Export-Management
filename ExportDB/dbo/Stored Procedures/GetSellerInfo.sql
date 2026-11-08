CREATE procedure [dbo].[GetSellerInfo]
(
@Prefix		varchar(100)
)
as
begin
	begin
	select intUnitID as ID,strDescription as Name,strTIN as Tin,strPhone as Phone,strAccEmailAddress as Email,strBusinessArea as Address
	from ERP_HR.dbo.tblUnit where intUnitID in(91,178,182) and (strDescription like '%'+@Prefix+'%' or strDescription like '%'+@Prefix+'%');
	end;
end;