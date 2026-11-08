CREATE TABLE [dbo].[TBLBANKLOAN] (
    [ID]             INT             IDENTITY (1, 1) NOT NULL,
    [BLNO]           VARCHAR (200)   NULL,
    [LENDERBANKID]   INT             NULL,
    [BORROWERUNITID] INT             NULL,
    [LOANTYPEID]     INT             NULL,
    [LOANAMOUNT]     DECIMAL (18, 2) NULL,
    [CURRENCYID]     INT             NULL,
    [CONRATE]        DECIMAL (18, 2) NULL,
    [ISSUEDATE]      DATETIME        NULL,
    [MATURITYDATE]   DATETIME        NULL,
    [INTERESTRATE]   DECIMAL (18, 2) NULL,
    [LOANNUMBER]     VARCHAR (200)   NULL,
    [NARRATION]      VARCHAR (MAX)   NULL,
    [CREATEDBY]      INT             NULL,
    [UPDATEDBY]      INT             NULL,
    [CREATEDDATE]    DATETIME        NULL,
    [UPDATEDDATE]    DATETIME        NULL,
    [STATUSID]       INT             NULL,
    [ISACTIVE]       BIT             NULL,
    [RESCHEDULEDID]  INT             NULL
);

