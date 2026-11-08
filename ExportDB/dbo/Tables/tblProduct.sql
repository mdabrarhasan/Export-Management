CREATE TABLE [dbo].[tblProduct] (
    [intProductId]   INT             IDENTITY (1, 1) NOT NULL,
    [strProductName] VARCHAR (150)   NOT NULL,
    [strProductCode] VARCHAR (50)    NOT NULL,
    [decPrice]       DECIMAL (18, 2) DEFAULT ((0)) NOT NULL,
    [intStockQty]    INT             DEFAULT ((0)) NOT NULL,
    [strDescription] VARCHAR (500)   NULL,
    [isActive]       BIT             DEFAULT ((1)) NOT NULL,
    [dtCreatedDate]  DATETIME        DEFAULT (getdate()) NOT NULL,
    [dtUpdatedDate]  DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([intProductId] ASC)
);

