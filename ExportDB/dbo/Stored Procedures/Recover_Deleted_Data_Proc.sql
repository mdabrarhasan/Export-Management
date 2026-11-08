
Create PROCEDURE Recover_Deleted_Data_Proc
@Database_Name NVARCHAR(MAX),
@SchemaName_n_TableName NVARCHAR(Max),
@Date_From DATETIME='1900/01/01',
@Date_To DATETIME ='9999/12/31'
AS
 
DECLARE @RowLogContents VARBINARY(8000)
DECLARE @TransactionID NVARCHAR(Max)
DECLARE @AllocUnitID BIGINT
DECLARE @AllocUnitName NVARCHAR(Max)
DECLARE @SQL NVARCHAR(Max)
DECLARE @Compatibility_Level INT
 
 
SELECT @Compatibility_Level=dtb.compatibility_level
FROM
master.sys.databases AS dtb WHERE dtb.name=@Database_Name
 
IF ISNULL(@Compatibility_Level,0)<=80
BEGIN
    RAISERROR('The compatibility level should be equal to or greater SQL SERVER 2005 (90)',16,1)
    RETURN
END
 
IF (SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE [TABLE_SCHEMA]+'.'+[TABLE_NAME]=@SchemaName_n_TableName)=0
BEGIN
    RAISERROR('Could not found the table in the defined database',16,1)
    RETURN
END