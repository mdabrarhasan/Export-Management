CREATE TABLE [dbo].[TBLLCBANKINFO] (
    [ID]                  INT             IDENTITY (1, 1) NOT NULL,
    [LCID]                INT             NOT NULL,
    [DOCNEGOTIATEDATE]    DATE            NULL,
    [BENEFICIARYBANKCOST] DECIMAL (18, 2) NULL,
    [CROSSBANKCHARGE]     DECIMAL (18, 2) NULL,
    [PAYMENTRECEIVEDATE]  DATE            NULL,
    [IDPBIDBCNO]          NVARCHAR (100)  NULL,
    [CREATEDBY]           INT             NULL,
    [UPDATEDBY]           INT             NULL,
    [CREATEDDATE]         DATE            NULL,
    [UPDATEDDATE]         DATE            NULL,
    [ISACTIVE]            BIT             NOT NULL,
    CONSTRAINT [PK_TBLLCBANKINFO] PRIMARY KEY CLUSTERED ([ID] ASC)
);

