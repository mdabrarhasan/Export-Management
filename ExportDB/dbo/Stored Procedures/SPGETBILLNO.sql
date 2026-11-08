
create PROCEDURE [dbo].[SPGETBILLNO]
@PREFIX VARCHAR(500)
AS
BEGIN
select intBillID AS ID, strCode AS NAME from ERP_DURBIN.dbo.tblCusBilling WHERE strCode LIKE '%'+@PREFIX+'%'

END;