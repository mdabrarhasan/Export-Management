CREATE TABLE [dbo].[TBLCOSTITEM] (
    [ID]         INT            IDENTITY (1, 1) NOT NULL,
    [NAME]       NVARCHAR (200) NULL,
    [COSTTYPEID] INT            NULL,
    [ISACTIVE]   BIT            NULL
);

