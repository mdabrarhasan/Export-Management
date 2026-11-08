CREATE TABLE [dbo].[TBLPAYMENTRESCHEDULETYPE] (
    [ID]          INT           IDENTITY (1, 1) NOT NULL,
    [CODE]        VARCHAR (100) NULL,
    [NAME]        VARCHAR (100) NULL,
    [CREATEDDATE] DATE          NULL,
    [CREATEDBY]   INT           NULL,
    [UPDATEDDATE] DATE          NULL,
    [UPDATEDBY]   INT           NULL
);

