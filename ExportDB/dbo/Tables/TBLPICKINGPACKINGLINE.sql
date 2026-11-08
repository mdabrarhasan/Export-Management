CREATE TABLE [dbo].[TBLPICKINGPACKINGLINE] (
    [ID]                     INT             IDENTITY (1, 1) NOT NULL,
    [PICKINGPACKINGHEADERID] INT             NOT NULL,
    [PISCLINEID]             INT             NULL,
    [BATCHID]                NVARCHAR (50)   NOT NULL,
    [SERIALNO]               INT             NOT NULL,
    [ITEMID]                 INT             NOT NULL,
    [QUANTITY]               DECIMAL (18, 2) NOT NULL,
    [PACKINGREQQUANTITY]     DECIMAL (18, 2) NOT NULL,
    [PICKINGPACKINGQUANTITY] DECIMAL (18, 2) NOT NULL,
    [TOLERANCEID]            INT             NULL,
    [ISACTIVE]               BIT             NULL,
    [REMARKS]                NVARCHAR (1000) NULL,
    [DESCRIPTIONS]           NVARCHAR (1000) NULL,
    [TRUCKNO]                NVARCHAR (200)  NULL,
    [COUNT]                  DECIMAL (18, 2) NULL,
    [GROSSMEASURE]           DECIMAL (18, 2) NULL,
    [CONTAINERNAME]          NVARCHAR (200)  NULL,
    [CONTAINERNO]            NVARCHAR (200)  NULL,
    [QTYCHECK]               INT             NULL,
    [CONTAINERSIZE]          INT             NULL,
    CONSTRAINT [PK_TBLTBLPICKINGPACKINGLINE] PRIMARY KEY CLUSTERED ([ID] ASC) WITH (FILLFACTOR = 90)
);

