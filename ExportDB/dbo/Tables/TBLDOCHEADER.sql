CREATE TABLE [dbo].[TBLDOCHEADER] (
    [ID]                     INT            IDENTITY (1, 1) NOT NULL,
    [GLOBALID]               NVARCHAR (50)  NULL,
    [PICKINGPACKINGHEADERID] INT            NOT NULL,
    [DOCUMENTSETUPHEADERID]  INT            NULL,
    [DOCNUMBER]              NVARCHAR (50)  NULL,
    [DOCDATE]                DATETIME       NOT NULL,
    [CUSTOMERID]             INT            NOT NULL,
    [TERMSCONDITION]         NVARCHAR (MAX) NOT NULL,
    [DESCRIPTIONS]           NVARCHAR (MAX) NOT NULL,
    [DOCUMENTCREATEDDATE]    DATETIME       NOT NULL,
    [DOCUMENTCREATEDBY]      INT            NOT NULL,
    [DOCUMENTSTATUSID]       INT            NOT NULL,
    [ISACTIVE]               BIT            NULL,
    [UNITID]                 INT            NULL,
    [FLAG]                   INT            NULL,
    CONSTRAINT [PK_TBLPRESHIPDOCHEADER] PRIMARY KEY CLUSTERED ([ID] ASC)
);

