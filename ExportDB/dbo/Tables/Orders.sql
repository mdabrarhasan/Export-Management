CREATE TABLE [dbo].[Orders] (
    [OrderId]      INT             IDENTITY (1, 1) NOT NULL,
    [RetailerId]   INT             NOT NULL,
    [DealerId]     INT             NOT NULL,
    [ExecutiveId]  INT             NOT NULL,
    [SupervisorId] INT             NOT NULL,
    [OrderDate]    DATETIME        DEFAULT (getdate()) NOT NULL,
    [Status]       NVARCHAR (50)   NOT NULL,
    [TotalAmount]  DECIMAL (18, 2) NOT NULL,
    [CreatedBy]    INT             NULL,
    [UpdatedBy]    INT             NULL,
    [CreatedDate]  DATETIME        DEFAULT (getdate()) NOT NULL,
    [UpdatedDate]  DATETIME        NULL,
    [IsActive]     INT             DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([OrderId] ASC)
);

