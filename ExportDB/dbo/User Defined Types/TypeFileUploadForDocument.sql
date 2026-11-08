CREATE TYPE [dbo].[TypeFileUploadForDocument] AS TABLE (
    [ProcessLineID]     INT            NULL,
    [ProcessHeaderID]   INT            NULL,
    [PickPackID]        INT            NULL,
    [FILENAME]          NVARCHAR (MAX) NULL,
    [FILESIZE]          NVARCHAR (500) NULL,
    [FILETYPE]          NVARCHAR (500) NULL,
    [FILEURL]           NVARCHAR (MAX) NULL,
    [DOCUMENTCREATEDBY] INT            NULL);

