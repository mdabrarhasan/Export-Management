CREATE TABLE [dbo].[TBLDOCUMENTSETUPHEADER] (
    [ID]                  INT             IDENTITY (1, 1) NOT NULL,
    [CODE]                NVARCHAR (50)   NOT NULL,
    [NAME]                NVARCHAR (50)   NOT NULL,
    [SUBMENUID]           INT             NULL,
    [ISLOCALDOCALLOWED]   BIT             NULL,
    [ISFOREIGNDOCALLOWED] BIT             NULL,
    [DESCRIPTION]         NVARCHAR (1000) NULL,
    [ISACTIVE]            BIT             NOT NULL,
    [CREATEDBY]           INT             NOT NULL,
    [CREATEDDATE]         DATETIME        NOT NULL,
    [UPDATEDBY]           INT             NULL,
    [UPDATEDDATE]         DATETIME        NULL,
    [UNITID]              INT             NULL,
    CONSTRAINT [PK_TBLDOCUMENTSETUPHEADER] PRIMARY KEY CLUSTERED ([ID] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_TBLDOCUMENTSETUPHEADER]
    ON [dbo].[TBLDOCUMENTSETUPHEADER]([CODE] ASC);

