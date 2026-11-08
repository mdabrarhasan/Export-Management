
/* ============================================================
   SPRAY Customer Bank Stored Procedures
   Prefix added: SPRAY_
   Table: dbo.TBLCUSTOMERBANK
   ============================================================ */

/* 1) GET ALL */
CREATE   PROCEDURE [dbo].[SPRAY_SPCUSTOMERBANKGETALL]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        [ID],
        [CUSTOMERNAME],
        [CUSTOMERBANKBRANCHNAME],
        [CUSTOMERBANKNAME],
        [CUSTOMERBANKADDRESSLINEONE],
        [CUSTOMERBANKADDRESSLINETWO],
        [CUSTOMERBANKADDRESSLINETHREE],
        [CUSTOMERBANKBINNO],
        [ISACTIVE],
        [CREATEDBY],
        [CREATEDDATE],
        [UPDATEDBY],
        [UPDATEDDATE]
    FROM [dbo].[TBLCUSTOMERBANK]
    WHERE ISNULL([ISACTIVE], 1) = 1
    ORDER BY [ID] DESC;
END