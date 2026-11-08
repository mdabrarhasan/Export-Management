CREATE procedure [dbo].[GetCustomerInfoShortPISCExtra]
(
@id				int
)
as
begin
	begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ABGAPIS.dbo.TBLPACKINGREQUESTHEADER as Head 
	INNER JOIN ERP_SAD.dbo.tblCustomer as Cus
    ON Cus.intCusID = Head.CUSTOMERID
	Where Head.id = @id;
	end;
end;