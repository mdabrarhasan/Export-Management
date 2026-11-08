CREATE procedure [dbo].[spGetVatDetails]
@Type				int,
@VatID				int
as
begin
	if @type=1   --all
	begin
	select id,CODE,NAME as VATNAME,VALUE as VATVALUE from TBLVAT
	end;
	else if @type=2 --using id
	begin
	select id,CODE,NAME as VATNAME,VALUE as VATVALUE from TBLVAT where id=@VatID
	end;
end;