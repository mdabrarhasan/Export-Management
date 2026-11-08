CREATE procedure [dbo].[SPGetFGName]
(
@UnitID			int,
@strprefix		varchar(100)
)
as
begin
select  ti.intID as ID,'('+ti.strProductCode+')'+ti.strProductName as Name,ISNULL(TU.strUOM,'KG') as UoM from ERP_SAD.dbo.tblItem ti   
LEFT JOIN ERP_SAD.dbo.tblUOM TU ON ti.intSellingUOM=TU.intID
where ti.intUnitID=@UnitID and ysnActive=1
and (strProductName like '%'+@strprefix+'%');
end;


--exec SPGetFGName 91,'bopp'