
CREATE PROCEDURE [dbo].[SPGETBANKINFO]
@PINO			 INT			 
AS
BEGIN
--select INTID AS ID,'('+strAccountNo+')   '+strBankName AS NAME from ERP_Accounts.dbo.tblBankAccountList where intUnitID=91 


SELECT INFO.INTBANKID AS ID,INFO.strBankName+'['+strAccountNo+']' AS NAME FROM ERP_Accounts.DBO.qryBankAccInfoForDDL DDL INNER JOIN ERP_Accounts.DBO.tblBankInfo INFO
ON DDL.intBankID=INFO.intBankID
where intUnitID=91
--AND strBankName in ('SCB','CBC','EBL','BRAC','JAMUNA','HSBC')
END;