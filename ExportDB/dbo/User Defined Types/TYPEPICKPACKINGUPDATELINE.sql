CREATE TYPE [dbo].[TYPEPICKPACKINGUPDATELINE] AS TABLE (
    [ID]                 INT             NULL,
    [ITEMID]             INT             NULL,
    [QUANTITY]           DECIMAL (18, 2) NULL,
    [PACKINGREQQUANTITY] DECIMAL (18, 2) NULL,
    [GROSSMEASURE]       DECIMAL (18, 2) NULL,
    [TRUCKNO]            VARCHAR (100)   NULL,
    [CONTAINERSIZE]      INT             NULL,
    [CONTAINERNO]        VARCHAR (100)   NULL,
    [REMARKS]            VARCHAR (100)   NULL,
    [DESCRIPTION]        VARCHAR (100)   NULL);

