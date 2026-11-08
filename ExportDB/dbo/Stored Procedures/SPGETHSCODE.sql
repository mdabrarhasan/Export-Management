CREATE PROCEDURE [dbo].[SPGETHSCODE]
@Prefix		varchar(100)
AS
BEGIN
SELECT distinct strHS_ServiceCode AS ID,strHS_ServiceCode+'    ' +strDescription AS NAME FROM ERP_VAT.dbo.tblHS_ServiceCode where
 (strHS_ServiceCode like '%'+@Prefix+'%' OR  strDescription like '%'+@Prefix+'%');
--,CD,SD,VAT,AIT,AT,RD,EXD,TTI
END;