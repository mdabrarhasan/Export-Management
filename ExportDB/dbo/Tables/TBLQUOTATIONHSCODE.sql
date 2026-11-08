CREATE TABLE [dbo].[TBLQUOTATIONHSCODE] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [QTID]        INT           NULL,
    [HSCODE]      NVARCHAR (50) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL
);

