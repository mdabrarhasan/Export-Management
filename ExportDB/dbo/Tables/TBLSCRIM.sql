CREATE TABLE [dbo].[TBLSCRIM] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [SCRIM]       VARCHAR (MAX) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL,
    CONSTRAINT [PK_TBLSCRIM_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);

