CREATE PROCEDURE [dbo].[sprExecutiveCrud]
    @type             INT,
    @intExecutiveId   INT,
    @strName          VARCHAR(100),
    @strAddress       VARCHAR(200),
    @strPhone         VARCHAR(20),
    @intSupervisorId  INT,
    @intEnroll        INT
AS
BEGIN
    IF @type = 1 -- Read all executives
    BEGIN
        SELECT intExecutiveId, strExecutiveName, strAddress, strPhone, strEmail, intSupervisorId, dtCreatedDate
        FROM ABGAPIS.dbo.tblExecutive
        WHERE isActive = 1;
    END
 
    IF @type = 2 -- Read executive by ID
    BEGIN
        SELECT intExecutiveId, strExecutiveName, strAddress, strPhone, strEmail, intSupervisorId, dtCreatedDate
        FROM ABGAPIS.dbo.tblExecutive
        WHERE isActive = 1 AND intExecutiveId = @intExecutiveId;
    END
 
    IF @type = 3 -- Insert executive
    BEGIN
        INSERT INTO ABGAPIS.dbo.tblExecutive (strExecutiveName, strAddress, strPhone, intSupervisorId, dtCreatedDate)
        VALUES (@strName, @strAddress, @strPhone, @intSupervisorId, GETDATE());
    END
 
    IF @type = 4 -- Update executive
    BEGIN
        UPDATE ABGAPIS.dbo.tblExecutive
        SET strExecutiveName = @strName,
            strAddress       = @strAddress,
            strPhone         = @strPhone,
            intSupervisorId  = @intSupervisorId,
            dtUpdatedDate    = GETDATE()
        WHERE intExecutiveId = @intExecutiveId;
    END
 
    IF @type = 5 -- Soft delete executive
    BEGIN
        UPDATE ABGAPIS.dbo.tblExecutive
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intExecutiveId = @intExecutiveId;
    END
END