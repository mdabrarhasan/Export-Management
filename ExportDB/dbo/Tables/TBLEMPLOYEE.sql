CREATE TABLE [dbo].[TBLEMPLOYEE] (
    [ID]               INT             IDENTITY (1, 1) NOT NULL,
    [CODE]             NVARCHAR (50)   NOT NULL,
    [NAME]             NVARCHAR (200)  NOT NULL,
    [PRESENTADDRESS]   NVARCHAR (1000) NOT NULL,
    [PERMANENTADDRESS] NVARCHAR (1000) NOT NULL,
    [GENDER]           NVARCHAR (50)   NOT NULL,
    [MOBILENO]         NVARCHAR (50)   NOT NULL,
    [EMAILID]          NVARCHAR (50)   NOT NULL,
    [DIVISIONID]       INT             NULL,
    [DEPARTMENTID]     INT             NULL,
    [SECTIONID]        INT             NULL,
    [UNITID]           INT             NULL,
    [ROLEID]           INT             NOT NULL,
    [USERID]           NVARCHAR (50)   NULL,
    [PASSWORD]         NVARCHAR (50)   NULL,
    [CREATEDBY]        INT             NOT NULL,
    [CREATEDDATE]      DATETIME        NOT NULL,
    [UPDATEDBY]        INT             NOT NULL,
    [UPDATEDDATE]      DATETIME        NOT NULL,
    CONSTRAINT [PK_TBLEMPLOYEE] PRIMARY KEY CLUSTERED ([ID] ASC)
);

