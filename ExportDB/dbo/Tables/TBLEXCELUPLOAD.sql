CREATE TABLE [dbo].[TBLEXCELUPLOAD] (
    [ID]                         INT             IDENTITY (1, 1) NOT NULL,
    [strOCFNo]                   NVARCHAR (200)  NULL,
    [strProductCode]             NVARCHAR (200)  NULL,
    [strProductName]             NVARCHAR (200)  NULL,
    [intProductID]               BIGINT          NULL,
    [decThickness]               DECIMAL (18, 2) NULL,
    [decWidth]                   DECIMAL (18, 2) NULL,
    [decLength]                  DECIMAL (18, 2) NULL,
    [strTreatmentLavel]          NVARCHAR (200)  NULL,
    [strTreatmentDirection]      NVARCHAR (200)  NULL,
    [intTreatmentDirectionID]    INT             NULL,
    [strCoreID]                  NVARCHAR (200)  NULL,
    [intCoreID]                  INT             NULL,
    [strRealOD]                  NVARCHAR (200)  NULL,
    [intOrderQty]                INT             NULL,
    [dteDesiredDateofDelivery]   NVARCHAR (200)  NULL,
    [dteTentativeDateofDelivery] NVARCHAR (200)  NULL,
    [strUOM]                     NVARCHAR (100)  NULL,
    [intUOM]                     INT             NULL,
    [strRemarks]                 NVARCHAR (200)  NULL
);

