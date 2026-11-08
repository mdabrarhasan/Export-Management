CREATE procedure [dbo].[DeleteSQDetailsByID]
(
@id			int,
@Msg		varchar(100) out
)
as
begin
update TBLSALESQUOTATIONLINE
set ISACTIVE=0 where ID=@id;
set @Msg='Data Deleted Successfully.';
end;