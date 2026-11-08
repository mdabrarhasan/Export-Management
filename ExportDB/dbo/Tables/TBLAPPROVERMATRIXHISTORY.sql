CREATE TABLE [dbo].[TBLAPPROVERMATRIXHISTORY] (
    [ID]                     INT             IDENTITY (1, 1) NOT NULL,
    [APPROVERMATRIXHEADERID] INT             NOT NULL,
    [APPROVERMATRIXLINEID]   INT             NOT NULL,
    [BATCHID]                NVARCHAR (50)   NOT NULL,
    [SUBMENUID]              INT             NOT NULL,
    [PROCESSID]              INT             NULL,
    [PROCESSCODE]            NVARCHAR (50)   NULL,
    [PROCESSNAME]            NVARCHAR (50)   NOT NULL,
    [PROCESSLINEID]          INT             NULL,
    [PROCESSLINECODE]        NVARCHAR (50)   NULL,
    [INITIATORID]            INT             NOT NULL,
    [ACTIONTAKERID]          INT             NOT NULL,
    [DOCUMENTSTATUSID]       INT             NOT NULL,
    [UNITID]                 INT             NULL,
    [DESCRIPTIONS]           NVARCHAR (2000) NULL,
    [DOCUMENTCREATEDDATE]    DATETIME        NOT NULL,
    [DOCUMENTCREATEDBY]      INT             NOT NULL,
    CONSTRAINT [PK_TBLAPPROVERMATRIXHISTORY] PRIMARY KEY CLUSTERED ([ID] ASC)
);

