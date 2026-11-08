CREATE TABLE [dbo].[TBLPROFORMAINVOICELINE] (
    [ID]                      INT             IDENTITY (1, 1) NOT NULL,
    [PROFORMAINVOICEHEADERID] INT             NOT NULL,
    [BATCHID]                 NVARCHAR (50)   NOT NULL,
    [SERIALNO]                INT             NOT NULL,
    [ITEMID]                  INT             NOT NULL,
    [QUANTITY]                DECIMAL (18, 2) NOT NULL,
    [PRICE]                   DECIMAL (18, 2) NOT NULL,
    [DISCOUNTID]              INT             NULL,
    [DISCOUNT]                DECIMAL (18, 2) NULL,
    [VATID]                   INT             NULL,
    [VATAMOUNT]               DECIMAL (18, 2) NULL,
    [TOTALAMOUNT]             DECIMAL (18, 2) NOT NULL,
    [TOLERANCEID]             INT             NULL,
    [REMARKS]                 NVARCHAR (1000) NULL,
    [DESCRIPTIONS]            NVARCHAR (1000) NULL,
    [ISACTIVE]                BIT             NULL,
    CONSTRAINT [PK_TBLPROFORMAINVOICELINE] PRIMARY KEY CLUSTERED ([ID] ASC)
);

