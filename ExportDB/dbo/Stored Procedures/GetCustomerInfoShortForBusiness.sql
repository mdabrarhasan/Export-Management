--EXEC GetCustomerInfoShortForBusiness 
CREATE procedure [dbo].[GetCustomerInfoShortForBusiness]
(
@TYPEID   INT,
@ID		  INT
)
as
begin
	select intCusID as ID,strName as Name,strPhone as Phone,strEmailAddress as Email,'N/A' as 'Tin',strAddress as Address 
	from ERP_SAD.dbo.tblCustomer where intCusID=(SELECT CUSTOMERID FROM TBLQUOTATIONHEADER WHERE ID=@ID)
end;