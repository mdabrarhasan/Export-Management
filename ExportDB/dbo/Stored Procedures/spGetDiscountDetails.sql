
CREATE procedure [dbo].[spGetDiscountDetails]
@type				int,
@disid				int
as
begin
	if @type=1   --all
	begin
	select id,CODE,NAME as DISNAME,VALUE as DISVALUE from TBLDISCOUNT
	end;
	else if @type=2 --using id
	begin
	select id,CODE,NAME as DISNAME,VALUE as DISVALUE from TBLDISCOUNT where id=@disid
	end;
end;