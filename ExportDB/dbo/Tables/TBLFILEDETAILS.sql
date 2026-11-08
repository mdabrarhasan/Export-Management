CREATE TABLE [dbo].[TBLFILEDETAILS] (
    [ID]                     INT            IDENTITY (1, 1) NOT NULL,
    [CODE]                   NVARCHAR (50)  NOT NULL,
    [SUBMENUID]              INT            NULL,
    [PROCESSID]              INT            NOT NULL,
    [PROCESSCODE]            NVARCHAR (50)  NOT NULL,
    [PROCESSNAME]            NVARCHAR (200) NOT NULL,
    [PROCESSLINEID]          INT            NULL,
    [PROCESSLINECODE]        NVARCHAR (50)  NULL,
    [PICKINGPACKINGHEADERID] INT            NULL,
    [FILENAME]               NVARCHAR (MAX) NOT NULL,
    [FILESIZE]               NVARCHAR (200) NOT NULL,
    [FILETYPE]               NVARCHAR (50)  NOT NULL,
    [FILEURL]                NVARCHAR (MAX) NOT NULL,
    [ISACTIVE]               BIT            NULL,
    [DOCUMENTCREATEDDATE]    DATETIME       NOT NULL,
    [DOCUMENTCREATEDBY]      INT            NOT NULL,
    [DOCUMENTUPDATEDBY]      INT            NULL,
    [UNITID]                 INT            NULL,
    CONSTRAINT [PK_TBLFILEDETAILS] PRIMARY KEY CLUSTERED ([ID] ASC)
);

