CREATE PROCEDURE [dbo].[SPINSERTCUSTOMERINFO]
    @CUSTOMERNAME VARCHAR(100),
    @CUSTOMERBANKBRANCHNAME VARCHAR(500),
    @CUSTOMERBANKNAME VARCHAR(500),
    @CUSTOMERBANKADDRESSLINEONE VARCHAR(500),
    @CUSTOMERBANKADDRESSLINETWO VARCHAR(500),
    @CUSTOMERBANKADDRESSLINETHREE VARCHAR(500),
    @CUSTOMERBANKBINNO VARCHAR(500),

    @CREATEDBY INT,
    @UPDATEDBY INT,

    @Msg VARCHAR(200) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        -- =====================================================
        -- 1) GENERATE NEXT ID
        -- =====================================================



        -- =====================================================
        -- 2) INSERT DATA
        -- =====================================================
        INSERT INTO dbo.TBLCUSTOMERBANK
        (
            
            CUSTOMERNAME,
            CUSTOMERBANKBRANCHNAME,
            CUSTOMERBANKNAME,
            CUSTOMERBANKADDRESSLINEONE,
            CUSTOMERBANKADDRESSLINETWO,
            CUSTOMERBANKADDRESSLINETHREE,
            CUSTOMERBANKBINNO,
            ISACTIVE,
            CREATEDBY,
            CREATEDDATE,
            UPDATEDBY,
            UPDATEDDATE
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
            1,               -- always active on insert
            @CREATEDBY,
            GETDATE(),
            @UPDATEDBY,
            GETDATE()
        );


        -- =====================================================
        -- 3) SUCCESS MESSAGE
        -- =====================================================
        SET @Msg = 'Customer saved successfully';

    END TRY

    BEGIN CATCH

        -- =====================================================
        -- 4) ERROR MESSAGE
        -- =====================================================
        SET @Msg = ERROR_MESSAGE();

    END CATCH

END