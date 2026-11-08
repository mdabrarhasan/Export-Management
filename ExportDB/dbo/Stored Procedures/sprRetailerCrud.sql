-- ============================================================
-- STORED PROCEDURE 1: sprRetailerCrud
-- exec sprRetailerCrud 1,0,'','','',0,569266
-- exec sprRetailerCrud 2,1,'','','',0,569266
-- exec sprRetailerCrud 3,0,'Rahim Traders','Mirpur','01711000001',5,569266
-- exec sprRetailerCrud 4,1,'Rahim Traders','Mirpur','01711000001',5,569266
-- exec sprRetailerCrud 5,1,'','','',0,569266
-- ============================================================
CREATE PROCEDURE [dbo].[sprRetailerCrud]
    @type           INT,
    @intRetailerId  INT,
    @strName        VARCHAR(100),
    @strAddress     VARCHAR(200),
    @strPhone       VARCHAR(20),
    @intDealerId    INT,
    @intEnroll      INT
AS
BEGIN
    IF @type = 1 -- Read all retailers
    BEGIN
        SELECT intRetailerId, strRetailerName, strAddress, strPhone, strEmail, intDealerId, dtCreatedDate
        FROM ABGAPIS.dbo.tblRetailer
        WHERE isActive = 1;
    END
 
    IF @type = 2 -- Read retailer by ID
    BEGIN
        SELECT intRetailerId, strRetailerName, strAddress, strPhone, strEmail, intDealerId, dtCreatedDate
        FROM ABGAPIS.dbo.tblRetailer
        WHERE isActive = 1 AND intRetailerId = @intRetailerId;
    END
 
    IF @type = 3 -- Insert retailer
    BEGIN
        INSERT INTO ABGAPIS.dbo.tblRetailer (strRetailerName, strAddress, strPhone, intDealerId, dtCreatedDate)
        VALUES (@strName, @strAddress, @strPhone, @intDealerId, GETDATE());
    END
 
    IF @type = 4 -- Update retailer
    BEGIN
        UPDATE ABGAPIS.dbo.tblRetailer
        SET strRetailerName = @strName,
            strAddress      = @strAddress,
            strPhone        = @strPhone,
            intDealerId     = @intDealerId,
            dtUpdatedDate   = GETDATE()
        WHERE intRetailerId = @intRetailerId;
    END
 
    IF @type = 5 -- Soft delete retailer
    BEGIN
        UPDATE ABGAPIS.dbo.tblRetailer
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intRetailerId = @intRetailerId;
    END
END