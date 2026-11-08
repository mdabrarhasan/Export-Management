CREATE procedure [dbo].[GetSellerInfoShortGeneral]
(
@id				int
)
as
begin
	begin
	select intUnitID as ID,strDescription as Name,strTIN as Tin,strPhone as Phone,strAccEmailAddress as Email,'N/A' as Address
	from ERP_HR.dbo.tblUnit where intUnitID=@id
	end;
end;