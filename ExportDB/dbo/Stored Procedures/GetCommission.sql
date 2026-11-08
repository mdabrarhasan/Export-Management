
create procedure GetCommission
	(
	@ComID  int
	)
    as  
    begin
	if @ComID=0
	begin
	select ID,NAME,VALUE from TBLCOMMISSION
	end
	else
	begin
	select ID,NAME,VALUE from TBLCOMMISSION where ID=@ComID
	end;
	end;