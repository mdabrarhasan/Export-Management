CREATE TABLE [dbo].[Books] (
    [Id]       INT             IDENTITY (1, 1) NOT NULL,
    [Title]    NVARCHAR (100)  NULL,
    [Author]   NVARCHAR (100)  NULL,
    [Price]    DECIMAL (10, 2) NULL,
    [Category] NVARCHAR (100)  NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

