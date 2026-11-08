CREATE TABLE [dbo].[TBLQUOTATIONTYPE] (
    [ID]          INT             NULL,
    [CODE]        NVARCHAR (50)   NOT NULL,
    [NAME]        NVARCHAR (50)   NOT NULL,
    [DESCRIPTION] NVARCHAR (1000) NULL,
    [UNITID]      INT             NULL,
    [ISACTIVE]    BIT             NOT NULL,
    [CREATEDBY]   INT             NOT NULL,
    [CREATEDDATE] DATETIME        NOT NULL,
    [UPDATEDBY]   INT             NOT NULL,
    [UPDATEDDATE] DATETIME        NOT NULL
);

