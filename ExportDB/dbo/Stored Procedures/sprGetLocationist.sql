-- =============================================
-- Author:		<Sadia Farzana>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
--exec sprGetLocationist
-- =============================================
CREATE PROCEDURE [dbo].[sprGetLocationist]
	
AS
BEGIN
    select geo2.intGeoID as ID,  geo2.intGeoID as CODE, CONCAT( geo1.strGeoName ,' [',geo2.strGeoName,'] ') 	as NAME
	from  [ACRL_APP].[dbo].tblGeoLocationName geo1 
	inner join  
	[ACRL_APP].[dbo].tblGeoLocationName geo2 on geo1.intGeoID = geo2.intParentID
	inner join ACRL_APP.dbo.tblGeoLevel lvl1 on lvl1.intLevelID = geo1.intLevel
	inner join ACRL_APP.dbo.tblGeoLevel lvl2 on lvl2.intLevelID = geo2.intLevel
	where geo2.strGeoName != '' and lvl1.intLevelID =3 and lvl2.intLevelID =4
    order by geo1.strGeoName asc
END