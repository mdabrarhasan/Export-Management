-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <01-12-24>
-- Description:	<Get Buyer Bank details>
-- =============================================

-- exec SPGETBUYERBANK;

CREATE PROCEDURE [dbo].[spGetBuyerBank] 
AS
BEGIN
	select ID,CUSTOMERBANKNAME+' ['+ CUSTOMERBANKADDRESSLINEONE+' ]' AS NAME from ABGAPIS.dbo.TBLCUSTOMERBANK ;
	--SELECT ID,NAME AS NAME FROM TBLINCOTERM 
END