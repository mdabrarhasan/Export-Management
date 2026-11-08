create Procedure [dbo].[GetAgreementtype]
AS
BEGIN
	SELECT ID,CODE,NAME FROM TBLAGREEMENTTYPE
END;