CREATE TABLE [dbo].[TBLDOCUMENTSETUPLINE] (
    [ID]                    INT            IDENTITY (1, 1) NOT NULL,
    [CODE]                  NVARCHAR (50)  NOT NULL,
    [BATCHID]               NVARCHAR (50)  NULL,
    [DOCUMENTSETUPHEADERID] INT            NOT NULL,
    [NAME]                  NVARCHAR (50)  NOT NULL,
    [TYPE]                  NVARCHAR (50)  NULL,
    [COUNTRYID]             INT            NOT NULL,
    [REGIONID]              INT            NOT NULL,
    [SEQUENCE]              INT            NULL,
    [REPORTROOTURL]         NVARCHAR (400) NULL,
    [REPORTENDURL]          NVARCHAR (400) NULL,
    [ISMANDATORY]           BIT            NULL,
    [ISLOCALDOC]            BIT            NULL,
    [ISFOREIGNDOC]          BIT            NULL,
    [DESCRIPTION]           NVARCHAR (50)  NULL,
    [ISACTIVE]              BIT            NOT NULL,
    [CREATEDBY]             INT            NOT NULL,
    [CREATEDDATE]           DATETIME       NOT NULL,
    [UPDATEDBY]             INT            NULL,
    [UPDATEDDATE]           DATETIME       NULL,
    CONSTRAINT [PK_TBLDOCUMENTSETUPLINE] PRIMARY KEY CLUSTERED ([ID] ASC) WITH (FILLFACTOR = 90)
);

