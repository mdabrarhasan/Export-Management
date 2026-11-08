-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <30-10-24>
-- Description:	<Need to Get List>
-- =============================================
CREATE procedure [dbo].[SPGetFGNameWithoutProductCode]
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

if @UnitID=91
begin
select  ti.intID as ID,ti.strProductName as Name,'KG' as UoM from ERP_SAD.dbo.tblItem ti   
LEFT JOIN ERP_SAD.dbo.tblUOM TU ON ti.intSellingUOM=TU.intID
where ti.intUnitID=@UnitID and ysnActive=1
and (strProductName like '%'+@strprefix+'%');
end
else
begin
select  ti.intID as ID,ti.strProductName as Name,'KG' as UoM from ERP_SAD.dbo.tblItem ti   
LEFT JOIN ERP_SAD.dbo.tblUOM TU ON ti.intSellingUOM=TU.intID
where ti.intUnitID=@UnitID and ysnActive=1
and (strProductName like '%'+@strprefix+'%');
end

end;