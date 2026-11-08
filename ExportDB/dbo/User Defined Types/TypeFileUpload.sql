CREATE TYPE [dbo].[TypeFileUpload] AS TABLE (
    [PROCESSID]         INT            NULL,
    [PROCESSCODE]       VARCHAR (100)  NULL,
    [PROCESS]           VARCHAR (100)  NULL,
    [FILENAME]          NVARCHAR (MAX) NULL,
    [FILESIZE]          NVARCHAR (500) NULL,
    [FILETYPE]          NVARCHAR (500) NULL,
    [FILEURL]           NVARCHAR (MAX) NULL,
    [DOCUMENTCREATEDBY] INT            NULL);

