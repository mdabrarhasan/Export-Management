
CREATE PROCEDURE [dbo].[SPUpdateSalesQuatation]
(
    @ID                     INT,
    @CUSTOMERID             INT,
    @UNITID                 INT,
    @QUANTITYSUMMARY        NVARCHAR(500),
    @DESCRIPTIONSPECIFICATION NVARCHAR(1000),
    @DESCRIPTIONS           NVARCHAR(MAX),
    @DOCUMENTCREATEDBY      INT,
    @DOCUMENTSTATUSID       INT,
    @SHIPMENTMODE           INT,
    @FROMSHIPMENT           INT,
    @TOSHIPMENT             INT,
    @CURRENCY               INT,
    @LOADINGPLACE           NVARCHAR(500),
    @LOADINGPORT            INT,
    @DESTINATIONPORT        NVARCHAR(50),
    @INCOTERM               INT,
    @TRANSPORTATIONMODE     INT,
    @TERMSCONDITION         NVARCHAR(MAX),
    @PAYMENTTERMS           NVARCHAR(500),
    @PAYMENTTERMS_OTHERS    NVARCHAR(500),
    @PAYMENTTERMSID         INT,
    @SHIPPINGPERIOD         NVARCHAR(50),
    @SQTYPEID               INT,
    @EXPIREDATE             DATE = NULL,
    @ModuleCode             VARCHAR(50),
    @ProcessName            VARCHAR(50),
    @MessageName            VARCHAR(50),
    @Notification           VARCHAR(50),
    @Msg                    NVARCHAR(100) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DECLARE @Log NVARCHAR(1000),
                @ProcessCode NVARCHAR(100);

        -- Update the Sales Quotation Header
        UPDATE TBLSALESQUOTATIONHEADER
        SET 
            CUSTOMERID = @CUSTOMERID,
            UNITID = @UNITID,
            PRODUCT_QUANTITY = @QUANTITYSUMMARY,
            DESCRIPTION_SPECIFICATION = @DESCRIPTIONSPECIFICATION,
            DESCRIPTIONS = @DESCRIPTIONS,
            DOCUMENTSTATUSID = @DOCUMENTSTATUSID,
            SHIPMENTMODE = @SHIPMENTMODE,
            FROMSHIPMENT = @FROMSHIPMENT,
            TOSHIPMENT = @TOSHIPMENT,
            CURRENCY = @CURRENCY,
            LOADINGPLACE = @LOADINGPLACE,
            LOADINGPORT = @LOADINGPORT,
            DESTINATIONPORT = @DESTINATIONPORT,
            INCOTERM = @INCOTERM,
            TRANSPORTATIONMODE = @TRANSPORTATIONMODE,
            TERMSCONDITION = @TERMSCONDITION,
            PAYMENTTERMS = @PAYMENTTERMS,
            PAYMENTTERMS_OTHERS = @PAYMENTTERMS_OTHERS,
            PAYMENTTERMS_ID = @PAYMENTTERMSID,
            SHIPPINGPERIOD = @SHIPPINGPERIOD,
            SQTYPEID = @SQTYPEID,
            EXPIREDATE = @EXPIREDATE
        WHERE ID = @ID;

        -- Prepare log and process code
        SET @Log = 'Updated Sales Quotation: ID=' + CAST(@ID AS NVARCHAR)
                 + ', CUSTOMERID=' + CAST(@CUSTOMERID AS NVARCHAR)
                 + ', UNITID=' + CAST(@UNITID AS NVARCHAR);

        SET @ProcessCode = @ProcessName + CAST(@ID AS NVARCHAR);

        -- Fetch message
        SELECT @Msg = NAME 
        FROM TBLMESSAGE 
        WHERE SUBMENUID = (
                SELECT ID 
                FROM TBLSUBMENU 
                WHERE CODE = @ModuleCode
              )
          AND CODE = @MessageName;

        SET @Msg = ISNULL(@Msg, 'Updated Successfully') + ': SQ' + CAST(@ID AS NVARCHAR);

        -- Execute Email
        EXEC SPEmailSend 
            @ID,
            @ModuleCode,
            @ProcessCode,
            @ProcessName,
            @Notification;

        -- Log Activity
        EXEC SPActivityLog 
            @Log,
            '',
            @ProcessCode,
            @ModuleCode,
            @ProcessCode,
            @UNITID,
            @DOCUMENTCREATEDBY;

    END TRY
    BEGIN CATCH
        SET @Msg = ERROR_MESSAGE();
    END CATCH
END