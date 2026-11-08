CREATE TABLE [dbo].[Products] (
    [ProductId]     INT             IDENTITY (1, 1) NOT NULL,
    [ProductName]   NVARCHAR (100)  NOT NULL,
    [Price]         DECIMAL (18, 2) NOT NULL,
    [StockQuantity] INT             NOT NULL,
    [CreatedBy]     INT             NULL,
    [UpdatedBy]     INT             NULL,
    [CreatedDate]   DATETIME        DEFAULT (getdate()) NOT NULL,
    [UpdatedDate]   DATETIME        NULL,
    [IsActive]      INT             DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([ProductId] ASC)
);

