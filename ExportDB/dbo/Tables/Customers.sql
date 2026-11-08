CREATE TABLE [dbo].[Customers] (
    [Id]    INT            IDENTITY (1, 1) NOT NULL,
    [Name]  NVARCHAR (100) NULL,
    [Email] NVARCHAR (100) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

