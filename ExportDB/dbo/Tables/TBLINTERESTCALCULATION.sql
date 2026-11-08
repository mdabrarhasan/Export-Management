CREATE TABLE [dbo].[TBLINTERESTCALCULATION] (
    [ID]             INT             IDENTITY (1, 1) NOT NULL,
    [LENDERUNITID]   INT             NULL,
    [BORROWERUNITID] INT             NULL,
    [AMOUNT]         DECIMAL (18, 2) NULL,
    [STARTDATE]      DATE            NULL,
    [ENDDATE]        DATE            NULL,
    [NOOFDAYS]       INT             NULL,
    [INTERESTRATE]   DECIMAL (18, 2) NULL,
    [INTERESTAMT]    DECIMAL (18, 2) NULL,
    [DETAILS]        VARCHAR (MAX)   NULL,
    [CREATEDBY]      INT             NULL,
    [UPDATEDBY]      INT             NULL,
    [CREATEDDATE]    DATE            NULL,
    [UPDATEDDATE]    DATE            NULL,
    [ISACTIVE]       BIT             NULL,
    [DOCSTATUSID]    INT             NULL,
    [FLAG]           INT             NULL
);

