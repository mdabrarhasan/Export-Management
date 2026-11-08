CREATE TABLE [dbo].[TBLSLIT] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [SLIT]        VARCHAR (MAX) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL,
    CONSTRAINT [PK_TBLSLIT_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);

