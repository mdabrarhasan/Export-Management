CREATE TABLE [dbo].[Retailers] (
    [RetailerId]    INT            IDENTITY (1, 1) NOT NULL,
    [Name]          NVARCHAR (100) NOT NULL,
    [Address]       NVARCHAR (255) NULL,
    [ContactNumber] NVARCHAR (20)  NULL,
    [CreatedBy]     INT            NULL,
    [UpdatedBy]     INT            NULL,
    [CreatedDate]   DATETIME       DEFAULT (getdate()) NOT NULL,
    [UpdatedDate]   DATETIME       NULL,
    [IsActive]      INT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([RetailerId] ASC)
);

