CREATE TABLE [dbo].[TBLSIZE] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [SIZE]        VARCHAR (MAX) NULL,
    [ISACTIVE]    BIT           NULL,
    [CREATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL,
    CONSTRAINT [PK_TBLSIZE_ID] PRIMARY KEY CLUSTERED ([ID] ASC)
);

