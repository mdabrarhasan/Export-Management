CREATE TYPE [dbo].[InsertSalesQuatationHeader] AS TABLE (
    [SQTYPEID]          INT            NULL,
    [EXPIREDATE]        VARCHAR (50)   NULL,
    [CUSTOMERID]        INT            NULL,
    [UNITID]            INT            NULL,
    [DESCRIPTIONS]      VARCHAR (1000) NULL,
    [DOCUMENTCREATEDBY] INT            NULL,
    [DOCUMENTSTATUSID]  INT            NULL,
    [TERMSCONDITION]    VARCHAR (1000) NULL);

