CREATE TABLE [dbo].[Dealers] (
    [DealerId]    INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (100) NOT NULL,
    [ContactInfo] NVARCHAR (255) NULL,
    [CreatedBy]   INT            NULL,
    [UpdatedBy]   INT            NULL,
    [CreatedDate] DATETIME       DEFAULT (getdate()) NOT NULL,
    [UpdatedDate] DATETIME       NULL,
    [IsActive]    INT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([DealerId] ASC)
);

