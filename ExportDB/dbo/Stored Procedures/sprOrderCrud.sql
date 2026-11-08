CREATE   PROCEDURE [dbo].[sprOrderCrud]
    @type               INT,
    @intOrderId         INT,
    @intRetailerId      INT,
    @intDealerId        INT,
    @intExecutiveId     INT,
    @intSupervisorId    INT,
    @intProductId       INT,
    @intQuantity        INT,
    @strRetailerNote    VARCHAR(500),
    @strDealerNote      VARCHAR(500),
    @strExecutiveNote   VARCHAR(500),
    @strSupervisorNote  VARCHAR(500),
    @intEnroll          INT
AS
BEGIN
    IF @type = 1 -- Read all orders with joined names
    BEGIN
        SELECT
            o.intOrderId, o.strOrderCode, o.strOrderStatus,
            o.intRetailerId,  r.strRetailerName,
            o.intDealerId,    d.strDealerName,
            o.intExecutiveId, e.strExecutiveName,
            o.intSupervisorId,s.strSupervisorName,
            o.intProductId,   p.strProductName, p.strProductCode,
            o.intQuantity, o.decTotalAmount,
            o.strRetailerNote, o.strDealerNote, o.strExecutiveNote, o.strSupervisorNote,
            o.dtRetailerOrderDate, o.dtDealerForwardDate,
            o.dtExecutivePostDate, o.dtSupervisorActionDate, o.dtCompletedDate,
            o.dtCreatedDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblRetailer  r ON r.intRetailerId  = o.intRetailerId
        INNER JOIN ABGAPIS.dbo.tblDealer    d ON d.intDealerId    = o.intDealerId
        INNER JOIN ABGAPIS.dbo.tblExecutive e ON e.intExecutiveId = o.intExecutiveId
        INNER JOIN ABGAPIS.dbo.tblSupervisor s ON s.intSupervisorId = o.intSupervisorId
        INNER JOIN ABGAPIS.dbo.tblProduct   p ON p.intProductId   = o.intProductId
        WHERE o.isActive = 1;
    END
 
    IF @type = 2 -- Read single order by ID
    BEGIN
        SELECT
            o.intOrderId, o.strOrderCode, o.strOrderStatus,
            o.intRetailerId,  r.strRetailerName,
            o.intDealerId,    d.strDealerName,
            o.intExecutiveId, e.strExecutiveName,
            o.intSupervisorId,s.strSupervisorName,
            o.intProductId,   p.strProductName, p.strProductCode,
            o.intQuantity, o.decTotalAmount,
            o.strRetailerNote, o.strDealerNote, o.strExecutiveNote, o.strSupervisorNote,
            o.dtRetailerOrderDate, o.dtDealerForwardDate,
            o.dtExecutivePostDate, o.dtSupervisorActionDate, o.dtCompletedDate,
            o.dtCreatedDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblRetailer  r ON r.intRetailerId  = o.intRetailerId
        INNER JOIN ABGAPIS.dbo.tblDealer    d ON d.intDealerId    = o.intDealerId
        INNER JOIN ABGAPIS.dbo.tblExecutive e ON e.intExecutiveId = o.intExecutiveId
        INNER JOIN ABGAPIS.dbo.tblSupervisor s ON s.intSupervisorId = o.intSupervisorId
        INNER JOIN ABGAPIS.dbo.tblProduct   p ON p.intProductId   = o.intProductId
        WHERE o.isActive = 1 AND o.intOrderId = @intOrderId;
    END
 
    IF @type = 3 -- Retailer places order
    BEGIN
        DECLARE @strOrderCode VARCHAR(50);
        SET @strOrderCode = 'ORD-' + CONVERT(VARCHAR, GETDATE(), 112) + '-' + LEFT(REPLACE(CAST(NEWID() AS VARCHAR(36)), '-', ''), 8);
 
        INSERT INTO ABGAPIS.dbo.tblOrder
            (strOrderCode, intRetailerId, intDealerId, intExecutiveId, intSupervisorId,
             intProductId, intQuantity, decTotalAmount, strOrderStatus,
             strRetailerNote, dtRetailerOrderDate, dtCreatedDate)
        SELECT
            @strOrderCode, @intRetailerId, @intDealerId, @intExecutiveId, @intSupervisorId,
            @intProductId, @intQuantity, (p.decPrice * @intQuantity), 'PENDING',
            @strRetailerNote, GETDATE(), GETDATE()
        FROM ABGAPIS.dbo.tblProduct p
        WHERE p.intProductId = @intProductId;
    END
 
    IF @type = 4 -- Dealer forwards order to Executive
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET strOrderStatus      = 'DEALER_FORWARDED',
            strDealerNote       = @strDealerNote,
            dtDealerForwardDate = GETDATE(),
            dtUpdatedDate       = GETDATE()
        WHERE intOrderId = @intOrderId AND isActive = 1;
    END
 
    IF @type = 5 -- Executive posts order to Supervisor
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET strOrderStatus      = 'EXECUTIVE_POSTED',
            strExecutiveNote    = @strExecutiveNote,
            dtExecutivePostDate = GETDATE(),
            dtUpdatedDate       = GETDATE()
        WHERE intOrderId = @intOrderId AND isActive = 1;
    END
 
    IF @type = 6 -- Supervisor approves order
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET strOrderStatus          = 'SUPERVISOR_APPROVED',
            strSupervisorNote       = @strSupervisorNote,
            dtSupervisorActionDate  = GETDATE(),
            dtUpdatedDate           = GETDATE()
        WHERE intOrderId = @intOrderId AND isActive = 1;
    END
 
    IF @type = 7 -- Supervisor rejects order
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET strOrderStatus          = 'SUPERVISOR_REJECTED',
            strSupervisorNote       = @strSupervisorNote,
            dtSupervisorActionDate  = GETDATE(),
            dtUpdatedDate           = GETDATE()
        WHERE intOrderId = @intOrderId AND isActive = 1;
    END
 
    IF @type = 8 -- Order completed (response delivered back to retailer)
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET strOrderStatus  = 'COMPLETED',
            dtCompletedDate = GETDATE(),
            dtUpdatedDate   = GETDATE()
        WHERE intOrderId = @intOrderId AND isActive = 1;
    END
 
    IF @type = 9 -- Soft delete order
    BEGIN
        UPDATE ABGAPIS.dbo.tblOrder
        SET isActive      = 0,
            dtUpdatedDate = GETDATE()
        WHERE intOrderId = @intOrderId;
    END
 
    IF @type = 10 -- Read orders by Retailer ID
    BEGIN
        SELECT o.intOrderId, o.strOrderCode, o.strOrderStatus,
               o.intProductId, p.strProductName, o.intQuantity, o.decTotalAmount,
               o.dtRetailerOrderDate, o.dtCompletedDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblProduct p ON p.intProductId = o.intProductId
        WHERE o.isActive = 1 AND o.intRetailerId = @intRetailerId;
    END
 
    IF @type = 11 -- Read orders by Dealer ID
    BEGIN
        SELECT o.intOrderId, o.strOrderCode, o.strOrderStatus,
               r.strRetailerName, o.intProductId, p.strProductName,
               o.intQuantity, o.decTotalAmount, o.dtDealerForwardDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblRetailer r ON r.intRetailerId = o.intRetailerId
        INNER JOIN ABGAPIS.dbo.tblProduct  p ON p.intProductId  = o.intProductId
        WHERE o.isActive = 1 AND o.intDealerId = @intDealerId;
    END
 
    IF @type = 12 -- Read orders by Executive ID
    BEGIN
        SELECT o.intOrderId, o.strOrderCode, o.strOrderStatus,
               d.strDealerName, o.intProductId, p.strProductName,
               o.intQuantity, o.decTotalAmount, o.dtExecutivePostDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblDealer   d ON d.intDealerId   = o.intDealerId
        INNER JOIN ABGAPIS.dbo.tblProduct  p ON p.intProductId  = o.intProductId
        WHERE o.isActive = 1 AND o.intExecutiveId = @intExecutiveId;
    END
 
    IF @type = 13 -- Read orders by Supervisor ID
    BEGIN
        SELECT o.intOrderId, o.strOrderCode, o.strOrderStatus,
               e.strExecutiveName, o.intProductId, p.strProductName,
               o.intQuantity, o.decTotalAmount, o.dtSupervisorActionDate
        FROM ABGAPIS.dbo.tblOrder o
        INNER JOIN ABGAPIS.dbo.tblExecutive e ON e.intExecutiveId = o.intExecutiveId
        INNER JOIN ABGAPIS.dbo.tblProduct   p ON p.intProductId   = o.intProductId
        WHERE o.isActive = 1 AND o.intSupervisorId = @intSupervisorId;
    END
END