CREATE TABLE [dbo].[ExportReport] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [Code]        VARCHAR (500) NULL,
    [CreatedBy]   VARCHAR (50)  NULL,
    [IsActive]    BIT           NULL,
    [MotherUrl]   VARCHAR (500) NULL,
    [FolderUrl]   VARCHAR (500) NULL,
    [CreatedDate] VARCHAR (500) NULL,
    [OtherUrl]    VARCHAR (500) NULL,
    CONSTRAINT [PK_ExportReport] PRIMARY KEY CLUSTERED ([ID] ASC)
);

