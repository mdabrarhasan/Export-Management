CREATE TABLE [dbo].[TBLLOANTYPE] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [LOANTYPE]    VARCHAR (200) NULL,
    [DESCRIPTION] VARCHAR (500) NULL,
    [CREATEDBY]   INT           NULL,
    [UPDATEDBY]   INT           NULL,
    [CREATEDDATE] DATE          NULL,
    [UPDATEDDATE] DATE          NULL
);

