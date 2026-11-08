
/* 3) DELETE (SOFT DELETE) */
CREATE   PROCEDURE [dbo].[SPMASTERTYPEDELETE]
(
    @ID INT,
    @MASTERTYPE VARCHAR(50),
    @UPDATEDBY INT,
    @Msg VARCHAR(200) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    SET @MASTERTYPE = UPPER(ISNULL(LTRIM(RTRIM(@MASTERTYPE)), ''));

    BEGIN TRY
        IF @MASTERTYPE = 'SIZE'
        BEGIN
            UPDATE [dbo].[TBLSIZE]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Size deleted successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'WEIGHT'
        BEGIN
            UPDATE [dbo].[TBLWEIGHT]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Weight deleted successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'CONSTRUCTION'
        BEGIN
            UPDATE [dbo].[TBLCONSTRUCTION]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Construction deleted successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'SLIT'
        BEGIN
            UPDATE [dbo].[TBLSLIT]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Slit deleted successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'SCRIM'
        BEGIN
            UPDATE [dbo].[TBLSCRIM]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Scrim deleted successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'QUALITY'
        BEGIN
            UPDATE [dbo].[TBLQUALITY]
            SET [ISACTIVE] = 0, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
            WHERE [ID] = @ID;
            SET @Msg = 'Quality deleted successfully.';
            RETURN;
        END

        SET @Msg = 'Error: Invalid master type.';
    END TRY
    BEGIN CATCH
        SET @Msg = 'Error: ' + ERROR_MESSAGE();
    END CATCH
END