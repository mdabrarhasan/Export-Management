CREATE PROCEDURE [dbo].[sprLogCrud]
    @type           INT,
    @intLogId       INT,
    @strLogType     VARCHAR(10),
    @strActionBy    VARCHAR(50),
    @intOrderId     INT,
    @intEnroll      INT
AS
BEGIN
    IF @type = 1 -- Read all logs
    BEGIN
        SELECT intLogId, intOrderId, strLogType, strActionBy, intActionUserId,
               strProcessName, strActivityLog, strErrorLog, strChannel, dtCreatedDate
        FROM ABGAPIS.dbo.tblLog
        ORDER BY dtCreatedDate DESC;
    END
 
    IF @type = 2 -- Read log by ID
    BEGIN
        SELECT intLogId, intOrderId, strLogType, strActionBy, intActionUserId,
               strProcessName, strActivityLog, strErrorLog, strChannel, dtCreatedDate
        FROM ABGAPIS.dbo.tblLog
        WHERE intLogId = @intLogId;
    END
 
    IF @type = 3 -- Read logs by Order ID
    BEGIN
        SELECT intLogId, intOrderId, strLogType, strActionBy, intActionUserId,
               strProcessName, strActivityLog, strErrorLog, strChannel, dtCreatedDate
        FROM ABGAPIS.dbo.tblLog
        WHERE intOrderId = @intOrderId
        ORDER BY dtCreatedDate ASC;
    END
 
    IF @type = 4 -- Read logs by logType (ACT or ERR)
    BEGIN
        SELECT intLogId, intOrderId, strLogType, strActionBy, intActionUserId,
               strProcessName, strActivityLog, strErrorLog, strChannel, dtCreatedDate
        FROM ABGAPIS.dbo.tblLog
        WHERE strLogType = @strLogType
        ORDER BY dtCreatedDate DESC;
    END
 
    IF @type = 5 -- Read logs by ActionBy role
    BEGIN
        SELECT intLogId, intOrderId, strLogType, strActionBy, intActionUserId,
               strProcessName, strActivityLog, strErrorLog, strChannel, dtCreatedDate
        FROM ABGAPIS.dbo.tblLog
        WHERE strActionBy = @strActionBy
        ORDER BY dtCreatedDate DESC;
    END
END