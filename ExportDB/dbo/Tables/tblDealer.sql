CREATE TABLE [dbo].[tblDealer] (
    [intDealerId]    INT           IDENTITY (1, 1) NOT NULL,
    [strDealerName]  VARCHAR (100) NOT NULL,
    [strAddress]     VARCHAR (200) NOT NULL,
    [strPhone]       VARCHAR (20)  NOT NULL,
    [strEmail]       VARCHAR (100) NULL,
    [intExecutiveId] INT           NOT NULL,
    [isActive]       BIT           DEFAULT ((1)) NOT NULL,
    [dtCreatedDate]  DATETIME      DEFAULT (getdate()) NOT NULL,
    [dtUpdatedDate]  DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([intDealerId] ASC)
);

