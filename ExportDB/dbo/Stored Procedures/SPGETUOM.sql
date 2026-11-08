
CREATE PROCEDURE [dbo].[SPGETUOM]
(
@UNITID		INT
)
AS
BEGIN

select intID AS ID,strUOM AS NAME from erp_sad.dbo.tblUOM where intUnitId=91
END;