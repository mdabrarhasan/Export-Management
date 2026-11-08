CREATE TABLE [dbo].[tblSubItemsTest] (
    [intSubItemId]     INT           IDENTITY (1, 1) NOT NULL,
    [intItemId]        INT           NOT NULL,
    [intSubItemCode]   INT           NULL,
    [intCategoryId]    INT           NULL,
    [strSubItemName]   VARCHAR (100) NULL,
    [intUnitPrice]     INT           NULL,
    [intStockQuantity] INT           NULL,
    [ynsActive]        BIT           DEFAULT ((1)) NULL,
    [intCreatedBy]     INT           NULL,
    [intUpdatedBy]     INT           NULL,
    [dteCreated]       DATETIME      DEFAULT (getdate()) NULL,
    [dteUpdated]       DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([intSubItemId] ASC),
    CONSTRAINT [FK_tblSubItemsTest_tblItemsTest] FOREIGN KEY ([intItemId]) REFERENCES [dbo].[tblItemsTest] ([intItemId])
);


GO
CREATE NONCLUSTERED INDEX [IX_tblSubItemsTest_ynsActive]
    ON [dbo].[tblSubItemsTest]([ynsActive] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_tblSubItemsTest_intItemId]
    ON [dbo].[tblSubItemsTest]([intItemId] ASC);

