CREATE TABLE [dbo].[TBLLCVSBILL] (
    [ID]           INT            IDENTITY (1, 1) NOT NULL,
    [TYPEID]       INT            NULL,
    [LCSCID]       INT            NULL,
    [BILLID]       INT            NULL,
    [CREATEDBY]    INT            NULL,
    [UPDATEDBY]    INT            NULL,
    [CREATEDDATE]  DATE           NULL,
    [UPDATEDDATE]  DATE           NULL,
    [ISACTIVE]     BIT            NULL,
    [SLNO]         NVARCHAR (500) NULL,
    [INDATE]       DATE           NULL,
    [RANDOWNUMBER] NVARCHAR (500) NULL
);

