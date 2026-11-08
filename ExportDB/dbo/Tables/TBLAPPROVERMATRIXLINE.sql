CREATE TABLE [dbo].[TBLAPPROVERMATRIXLINE] (
    [ID]                     INT           IDENTITY (1, 1) NOT NULL,
    [APPROVERMATRIXHEADERID] INT           NOT NULL,
    [BATCHID]                NVARCHAR (50) NOT NULL,
    [VALUE]                  NVARCHAR (50) NULL,
    [APPROVERROLETYPE]       NVARCHAR (50) NOT NULL,
    [SEQUENCE]               INT           NOT NULL,
    [UNITID]                 INT           NULL,
    [ISACTIVE]               BIT           NOT NULL,
    CONSTRAINT [PK_TBLAPPROVERMATRIXLINE] PRIMARY KEY CLUSTERED ([ID] ASC)
);

