CREATE TABLE [dbo].[TBLWEIGHT] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [WEIGHT]      VARCHAR (MAX) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL,
    CONSTRAINT [PK_TBLWEIGHT_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);

