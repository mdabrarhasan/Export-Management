CREATE TABLE [dbo].[TBLDISCOUNT] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [CODE]        NVARCHAR (50)   NULL,
    [NAME]        NVARCHAR (50)   NULL,
    [VALUE]       DECIMAL (18, 2) NULL,
    [DESCRIPTION] NVARCHAR (1000) NULL,
    [ISACTIVE]    BIT             NULL,
    [CREATEDBY]   INT             NULL,
    [CREATEDDATE] DATETIME        NULL,
    [UPDATEDBY]   INT             NULL,
    [UPDATEDDATE] DATETIME        NULL
);

