CREATE TABLE [dbo].[TBLPRICECONFIRMLINE] (
    [ID]                   INT             IDENTITY (1, 1) NOT NULL,
    [PRICECONFIRMHEADERID] INT             NOT NULL,
    [QUOTATIONLINEID]      INT             NULL,
    [BATCHID]              NVARCHAR (50)   NOT NULL,
    [SERIALNO]             INT             NOT NULL,
    [ITEMID]               INT             NOT NULL,
    [THIKNESS]             DECIMAL (18, 2) NULL,
    [WIDTH]                DECIMAL (18, 2) NULL,
    [LENGTH]               DECIMAL (18, 2) NULL,
    [QUANTITY]             DECIMAL (18, 2) NOT NULL,
    [PRICE]                DECIMAL (18, 2) NOT NULL,
    [OFFERPRICE]           DECIMAL (18, 2) NOT NULL,
    [CONFIRMPRICE]         DECIMAL (18, 2) NOT NULL,
    [ISACTIVE]             BIT             CONSTRAINT [DF_TBLPRICECONFIRMLINE_ISACTIVE] DEFAULT ((1)) NULL,
    CONSTRAINT [PK_TBLPRICECONFIRMLINE] PRIMARY KEY CLUSTERED ([ID] ASC)
);

