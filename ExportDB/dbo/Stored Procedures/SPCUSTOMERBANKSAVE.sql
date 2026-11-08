
/* 3) SAVE / CREATE */
CREATE   PROCEDURE [dbo].[SPCUSTOMERBANKSAVE]
(
    @CUSTOMERNAME                 VARCHAR(500),
    @CUSTOMERBANKBRANCHNAME       VARCHAR(500),
    @CUSTOMERBANKNAME             VARCHAR(500),
    @CUSTOMERBANKADDRESSLINEONE   VARCHAR(500),
    @CUSTOMERBANKADDRESSLINETWO   VARCHAR(500),
    @CUSTOMERBANKADDRESSLINETHREE VARCHAR(500),
    @CUSTOMERBANKBINNO            VARCHAR(500),
    @ISACTIVE                     INT = 1,
    @CREATEDBY                    INT,
    @MODULECODE                   VARCHAR(100) = NULL,
    @MsgStatus                    VARCHAR(100) = NULL,
    @Msg                          VARCHAR(200) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO [dbo].[TBLCUSTOMERBANK]
        (
            [CUSTOMERNAME],
            [CUSTOMERBANKBRANCHNAME],
            [CUSTOMERBANKNAME],
            [CUSTOMERBANKADDRESSLINEONE],
            [CUSTOMERBANKADDRESSLINETWO],
            [CUSTOMERBANKADDRESSLINETHREE],
            [CUSTOMERBANKBINNO],
            [CREATEDBY],
            [UPDATEDBY],
            [CREATEDDATE],
            [UPDATEDDATE],
            [ISACTIVE]
        )
        VALUES
        (
            @CUSTOMERNAME,
            @CUSTOMERBANKBRANCHNAME,
            @CUSTOMERBANKNAME,
            @CUSTOMERBANKADDRESSLINEONE,
            @CUSTOMERBANKADDRESSLINETWO,
            @CUSTOMERBANKADDRESSLINETHREE,
            @CUSTOMERBANKBINNO,
            @CREATEDBY,
            @CREATEDBY,
            GETDATE(),
            GETDATE(),
            ISNULL(@ISACTIVE, 1)
        );

        IF @MsgStatus IS NOT NULL
        BEGIN
            SELECT TOP 1 @Msg = [NAME]
            FROM [dbo].[TBLMESSAGE]
            WHERE [SUBMENUID] = (SELECT TOP 1 [ID] FROM [dbo].[TBLSUBMENU] WHERE [CODE] = ISNULL(@MODULECODE, 'CUSTOMERBANK00001'))
              AND [CODE] = @MsgStatus;
        END

        IF @Msg IS NULL OR LTRIM(RTRIM(@Msg)) = ''
            SET @Msg = 'Customer bank info saved successfully.';
    END TRY
    BEGIN CATCH
        SET @Msg = ERROR_MESSAGE();
    END CATCH
END