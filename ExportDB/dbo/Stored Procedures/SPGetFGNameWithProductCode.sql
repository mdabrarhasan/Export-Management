CREATE procedure SPGetFGNameWithProductCode
(
@UnitID			int,
@strprefix		varchar(100)
)
as
--begin
--select  ti.intID as ID,ti.strProductName as Name,ISNULL(TU.strUOM,'KG') as UoM from ERP_SAD.dbo.tblItem ti   
--LEFT JOIN ERP_SAD.dbo.tblUOM TU ON ti.intSellingUOM=TU.intID
--where ti.intUnitID=@UnitID and ysnActive=1
--and (strProductName like '%'+@strprefix+'%');
--end;

begin
select  ti.intID as ID,ti.strProductCode AS PRODUCTCODE, ti.strProductName as Name,'KG' as UoM from ERP_SAD.dbo.tblItem ti   
LEFT JOIN ERP_SAD.dbo.tblUOM TU ON ti.intSellingUOM=TU.intID
where ti.intUnitID=@UnitID and ysnActive=1
and (strProductName like '%'+@strprefix+'%');
end;