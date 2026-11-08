CREATE TABLE [dbo].[tblLog] (
    [intLogId]        INT           IDENTITY (1, 1) NOT NULL,
    [intOrderId]      INT           NULL,
    [strLogType]      VARCHAR (10)  NOT NULL,
    [strActionBy]     VARCHAR (50)  NOT NULL,
    [intActionUserId] INT           NOT NULL,
    [strProcessName]  VARCHAR (200) NULL,
    [strActivityLog]  VARCHAR (MAX) NULL,
    [strErrorLog]     VARCHAR (MAX) NULL,
    [strChannel]      VARCHAR (100) NULL,
    [strDeviceInfo]   VARCHAR (200) NULL,
    [dtCreatedDate]   DATETIME      DEFAULT (getdate()) NOT NULL,
    PRIMARY KEY CLUSTERED ([intLogId] ASC)
);

