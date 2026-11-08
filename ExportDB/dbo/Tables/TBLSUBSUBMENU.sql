CREATE TABLE [dbo].[TBLSUBSUBMENU] (
    [ID]             INT            IDENTITY (1, 1) NOT NULL,
    [CODE]           NVARCHAR (50)  NULL,
    [NAME]           NVARCHAR (200) NULL,
    [SUBMENUID]      INT            NULL,
    [CONTROLLERNAME] NVARCHAR (200) NULL,
    [VIEWNAME]       NVARCHAR (200) NULL,
    [SEQUENCE]       INT            NULL,
    [CREATEDBY]      INT            NULL,
    [CREATEDDATE]    DATE           NULL,
    [UPDATEDBY]      INT            NULL,
    [UPDATEDDATE]    DATE           NULL,
    [ISACTIVE]       BIT            NULL
);

