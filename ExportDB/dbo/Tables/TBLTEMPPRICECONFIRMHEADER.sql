CREATE TABLE [dbo].[TBLTEMPPRICECONFIRMHEADER] (
    [ID]                      INT            IDENTITY (1, 1) NOT NULL,
    [GLOBALID]                NVARCHAR (50)  NULL,
    [QUOTATIONTYPEID]         INT            NULL,
    [SALESQUOTATIONHEADERID]  INT            NULL,
    [PROFORMAINVOICEHEADERID] INT            NULL,
    [PCNUMBER]                NVARCHAR (50)  NULL,
    [SELLERID]                INT            NULL,
    [CUSTOMERID]              INT            NULL,
    [TERMSCONDITION]          NVARCHAR (MAX) NULL,
    [DESCRIPTIONS]            NVARCHAR (MAX) NULL,
    [DOCUMENTCREATEDDATE]     DATETIME       NOT NULL,
    [DOCUMENTCREATEDBY]       INT            NOT NULL,
    [DOCUMENTSTATUSID]        INT            NOT NULL,
    [UNITID]                  INT            NOT NULL,
    [ISACTIVE]                BIT            NOT NULL,
    [FLAG]                    INT            NULL,
    [PRICEEXDATE]             NVARCHAR (50)  NULL,
    [OCFITEMID]               INT            NULL,
    CONSTRAINT [PK_TBLTEMPPRICECONFIRMHEADER] PRIMARY KEY CLUSTERED ([ID] ASC)
);

