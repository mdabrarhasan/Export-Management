CREATE procedure GetSellerInfoShortForBusiness
(
@TYPEID   INT,
@ID		  INT
)
as
begin
	select intUnitID as ID,strDescription as Name,strTIN as Tin,strPhone as Phone,strAccEmailAddress as Email,'N/A' as Address
	from ERP_HR.dbo.tblUnit where intUnitID=(SELECT intUnitID FROM ERP_SAD.DBO.tblCustomer WHERE intCusID=(SELECT CUSTOMERID FROM TBLQUOTATIONHEADER WHERE ID=@ID))
end;