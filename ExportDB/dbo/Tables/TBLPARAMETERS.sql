CREATE TABLE [dbo].[TBLPARAMETERS] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [CODE]        NVARCHAR (10) NULL,
    [NAME]        NVARCHAR (10) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATETIME      NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATETIME      NULL
);

