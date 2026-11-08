-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <04-12-24>
-- Description:	<Del point for Biax>
-- =============================================

-- exec SPGETDELPOINTBYUNITANDTYPE 91,135,0,'Akij'

CREATE PROCEDURE [dbo].[SPGETDELPOINTBYUNITANDTYPE] 
	@intUnitId int,
	@intType int,
	@customerId int,
	@strprefix  varchar(100)
AS
BEGIN
   select intDisPointId as ID,
   strDisPointName + ' [' + CAST(intDisPointId AS VARCHAR) + ']' AS strDisPointName,
   strAddress as 'Address',
   strContactNo as 'Contractno',
   strContactPerson as 'ContractPerson'
   from ERP_SAD.dbo.qryDisPoint where 
   --intCusID=@customerId AND 
   intUnitId=@intUnitId 
   AND (strDisPointName like '%'+@strprefix+'%') ;
END