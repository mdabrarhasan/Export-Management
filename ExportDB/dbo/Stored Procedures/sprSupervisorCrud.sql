CREATE PROCEDURE [dbo].[sprSupervisorCrud]
    @type             INT,
    @intSupervisorId  INT,
    @strName          VARCHAR(100),
    @strAddress       VARCHAR(200),
    @strPhone         VARCHAR(20),
    @intEnroll        INT
AS
BEGIN
    IF @type = 1 -- Read all supervisors
    BEGIN
        SELECT intSupervisorId, strSupervisorName, strAddress, strPhone, strEmail, dtCreatedDate
        FROM ABGAPIS.dbo.tblSupervisor
        WHERE isActive = 1;
    END
 
    IF @type = 2 -- Read supervisor by ID
    BEGIN
        SELECT intSupervisorId, strSupervisorName, strAddress, strPhone, strEmail, dtCreatedDate
        FROM ABGAPIS.dbo.tblSupervisor
        WHERE isActive = 1 AND intSupervisorId = @intSupervisorId;
    END
 
    IF @type = 3 -- Insert supervisor
    BEGIN
        INSERT INTO ABGAPIS.dbo.tblSupervisor (strSupervisorName, strAddress, strPhone, dtCreatedDate)
        VALUES (@strName, @strAddress, @strPhone, GETDATE());
    END
 
    IF @type = 4 -- Update supervisor
    BEGIN
        UPDATE ABGAPIS.dbo.tblSupervisor
        SET strSupervisorName = @strName,
            strAddress        = @strAddress,
            strPhone          = @strPhone,
            dtUpdatedDate     = GETDATE()
        WHERE intSupervisorId = @intSupervisorId;
    END
 
    IF @type = 5 -- Soft delete supervisor
    BEGIN
        UPDATE ABGAPIS.dbo.tblSupervisor
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intSupervisorId = @intSupervisorId;
    END
END