CREATE TABLE [dbo].[tblItemsTest] (
    [intItemId]        INT           IDENTITY (1, 1) NOT NULL,
    [intItemCode]      INT           NULL,
    [intCategoryId]    INT           NULL,
    [strItemName]      VARCHAR (100) NULL,
    [intUnitPrice]     INT           NULL,
    [intStockQuantity] INT           NULL,
    [ynsActive]        BIT           DEFAULT ((1)) NULL,
    [intCreatedBy]     INT           NULL,
    [intUpdatedBy]     INT           NULL,
    [dteCreated]       DATETIME      DEFAULT (getdate()) NULL,
    [dteUpdated]       DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([intItemId] ASC)
);

