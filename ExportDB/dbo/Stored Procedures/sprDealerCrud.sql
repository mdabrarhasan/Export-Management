CREATE PROCEDURE [dbo].[sprDealerCrud]
    @type           INT,
    @intDealerId    INT,
    @strName        VARCHAR(100),
    @strAddress     VARCHAR(200),
    @strPhone       VARCHAR(20),
    @intExecutiveId INT,
    @intEnroll      INT
AS
BEGIN
    IF @type = 1 -- Read all dealers
    BEGIN
        SELECT intDealerId, strDealerName, strAddress, strPhone, strEmail, intExecutiveId, dtCreatedDate
        FROM ABGAPIS.dbo.tblDealer
        WHERE isActive = 1;
    END
 
    IF @type = 2 -- Read dealer by ID
    BEGIN
        SELECT intDealerId, strDealerName, strAddress, strPhone, strEmail, intExecutiveId, dtCreatedDate
        FROM ABGAPIS.dbo.tblDealer
        WHERE isActive = 1 AND intDealerId = @intDealerId;
    END
 
    IF @type = 3 -- Insert dealer
    BEGIN
        INSERT INTO ABGAPIS.dbo.tblDealer (strDealerName, strAddress, strPhone, intExecutiveId, dtCreatedDate)
        VALUES (@strName, @strAddress, @strPhone, @intExecutiveId, GETDATE());
    END
 
    IF @type = 4 -- Update dealer
    BEGIN
        UPDATE ABGAPIS.dbo.tblDealer
        SET strDealerName   = @strName,
            strAddress      = @strAddress,
            strPhone        = @strPhone,
            intExecutiveId  = @intExecutiveId,
            dtUpdatedDate   = GETDATE()
        WHERE intDealerId = @intDealerId;
    END
 
    IF @type = 5 -- Soft delete dealer
    BEGIN
        UPDATE ABGAPIS.dbo.tblDealer
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intDealerId = @intDealerId;
    END
END