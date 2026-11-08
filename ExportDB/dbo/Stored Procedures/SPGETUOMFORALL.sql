CREATE PROCEDURE [dbo].[SPGETUOMFORALL]
(
@UNITID		INT
)
AS
BEGIN
select intID AS ID,strUOM AS NAME from erp_sad.dbo.tblUOM where intUnitId=@UNITID
END;