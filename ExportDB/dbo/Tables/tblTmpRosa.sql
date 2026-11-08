CREATE TABLE [dbo].[tblTmpRosa] (
    [intId]       INT           IDENTITY (1, 1) NOT NULL,
    [strName]     VARCHAR (255) NOT NULL,
    [strAddress]  VARCHAR (255) NOT NULL,
    [intEnroll]   INT           NOT NULL,
    [CreatedBy]   INT           NULL,
    [UpdatedBy]   INT           NULL,
    [CreatedDate] DATETIME      DEFAULT (getdate()) NOT NULL,
    [UpdatedDate] DATETIME      NULL,
    [IsActive]    BIT           DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([intId] ASC)
);

