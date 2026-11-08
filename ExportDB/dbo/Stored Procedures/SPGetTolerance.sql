

CREATE procedure SPGetTolerance
	(
	@Type   int,
	@TolID  int
	)
    as  
    begin
	if @Type=1
	begin
	select ID,NAME,VALUE from TBLTOLERANCE
	end
	else if @Type=2
	begin
	select ID,NAME,VALUE from TBLTOLERANCE where ID=@TolID
	end;
	end;