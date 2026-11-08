CREATE TABLE [dbo].[Logs] (
    [LogId]       INT            IDENTITY (1, 1) NOT NULL,
    [OrderId]     INT            NOT NULL,
    [Action]      NVARCHAR (255) NOT NULL,
    [Timestamp]   DATETIME       DEFAULT (getdate()) NOT NULL,
    [PerformedBy] NVARCHAR (100) NOT NULL,
    [CreatedBy]   INT            NULL,
    [UpdatedBy]   INT            NULL,
    [CreatedDate] DATETIME       DEFAULT (getdate()) NOT NULL,
    [UpdatedDate] DATETIME       NULL,
    [IsActive]    INT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([LogId] ASC)
);

