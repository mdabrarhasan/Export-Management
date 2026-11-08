CREATE TABLE [dbo].[TBLPAYMENTRESCHEDULE] (
    [ID]                     INT             IDENTITY (1, 1) NOT NULL,
    [PRNO]                   VARCHAR (200)   NULL,
    [BORROWERUNITID]         INT             NULL,
    [BANKID]                 INT             NULL,
    [CURRENCYID]             INT             NULL,
    [CRATE]                  DECIMAL (18, 2) NULL,
    [AMOUNT]                 DECIMAL (18, 2) NULL,
    [PAYMENT]                DECIMAL (18, 2) NULL,
    [PAYMENTDATE]            DATE            NULL,
    [RESCHEDULEDPAYMENTDATE] DATE            NULL,
    [TYPEID]                 INT             NULL,
    [REFID]                  INT             NULL,
    [REFLOANNUMBER]          NVARCHAR (500)  NULL,
    [NARRATION]              NVARCHAR (MAX)  NULL,
    [DOCSTATUSID]            INT             NULL,
    [ISACTIVE]               BIT             NULL,
    [CREATEDBY]              INT             NULL,
    [CREATEDDATE]            DATE            NULL,
    [UPDATEDBY]              INT             NULL,
    [UPDATEDDATE]            DATE            NULL
);

