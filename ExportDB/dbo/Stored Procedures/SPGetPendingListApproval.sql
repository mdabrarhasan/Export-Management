CREATE procedure [dbo].[SPGetPendingListApproval]
(
@unitid				int,
@submenuid			int,
@enroll				int
)
as
begin
/*declare @currentactiontacker int,@totalactiontacker int,@totalnextapprovernum int,@nextactiontacker int,@checkenroll int
set @currentactiontacker=(select max(isnull(ACTIONTAKERID,0)) from TBLAPPROVERMATRIXHISTORY a where UNITID=91 and SUBMENUID=1);
set @nextactiontacker=(select max(isnull(ACTIONTAKERID,0))+1 from TBLAPPROVERMATRIXHISTORY a where UNITID=91 and SUBMENUID=1);

set @totalnextapprovernum=(select max(ACTIONTAKERID) from TBLAPPROVERMATRIXHISTORY a where UNITID=91 and SUBMENUID=1);
set @totalactiontacker=(select count(*) from TBLAPPROVERMATRIXHEADER a,TBLAPPROVERMATRIXLINE b where a.ID=b.APPROVERMATRIXHEADERID and a.ID=12 and a.UNITID=91);
	
	if @totalactiontacker=0
		begin
		print('no action tacker')
		end;
	else if(@currentactiontacker<@totalnextapprovernum)*/
		begin
		--set @checkenroll=(select VALUE from TBLAPPROVERMATRIXLINE a where APPROVERMATRIXHEADERID=12 and a.SEQUENCE=@nextactiontacker)
			--if @checkenroll=535949
			begin
			select sqh.UnitID as UnitID,strUnit as UnitName,unit.strAccEmailAddress as SellerEmail,unit.strPhone as SellerPhone,unit.strTIN as SellerTin,
			sqh.CUSTOMERID as CusID,cus.strName as CustomerName,cus.strPhone as CusPhone,cus.strEmailAddress as CusEmail,
			cus.strAddress as CusAddress,cast(sqh.DOCUMENTCREATEDDATE as varchar(100)) as DOCUMENTCREATEDDATE,
			ds.NAME as DocStatus,sqh.id,SQNUMBER,sqh.DESCRIPTIONS,sqh.TERMSCONDITION
			from TBLSALESQUOTATIONHEADER sqh,TBLAPPROVERMATRIXHISTORY apvmh,ERP_HR.dbo.tblUnit unit,ERP_SAD.dbo.tblCustomer cus,TBLDOCUMENTSTATUS ds
			where sqh.ID=apvmh.PROCESSID and sqh.UNITID=unit.intUnitID and sqh.CUSTOMERID=cus.intCusID and sqh.DOCUMENTSTATUSID=ds.ID and sqh.ISACTIVE=1 
			and apvmh.ACTIONTAKERID=@enroll and apvmh.DOCUMENTSTATUSID=1 and apvmh.UNITID=@unitid and SUBMENUID=@submenuid
			order by ID desc;
			end;
		end;
end;