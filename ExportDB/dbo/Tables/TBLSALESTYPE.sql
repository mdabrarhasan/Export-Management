CREATE TABLE [dbo].[TBLSALESTYPE] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [CODE]        NVARCHAR (50) NULL,
    [NAME]        NVARCHAR (50) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL
);

