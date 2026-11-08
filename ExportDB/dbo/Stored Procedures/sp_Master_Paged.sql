
CREATE PROCEDURE [dbo].[sp_Master_Paged]
(
    @Type       VARCHAR(50),
    @Search     VARCHAR(100),
    @Page       INT,
    @Size       INT,
    @TotalCount INT OUTPUT       -- ← added OUTPUT parameter
)
AS
BEGIN
    DECLARE @SQL      NVARCHAR(MAX);
    DECLARE @CountSQL NVARCHAR(MAX);
    DECLARE @Offset   INT;
    DECLARE @ColName  NVARCHAR(50);
    DECLARE @TblName  NVARCHAR(50);

    -- ── 1. Resolve column & table name ──────────────────────────────────────
    IF      @Type = 'SIZE'         BEGIN SET @ColName = 'SIZE';         SET @TblName = 'TBLSIZE';         END
    ELSE IF @Type = 'WEIGHT'       BEGIN SET @ColName = 'WEIGHT';       SET @TblName = 'TBLWEIGHT';       END
    ELSE IF @Type = 'CONSTRUCTION' BEGIN SET @ColName = 'CONSTRUCTION'; SET @TblName = 'TBLCONSTRUCTION'; END
    ELSE IF @Type = 'SLIT'         BEGIN SET @ColName = 'SLIT';         SET @TblName = 'TBLSLIT';         END
    ELSE IF @Type = 'SCRIM'        BEGIN SET @ColName = 'SCRIM';        SET @TblName = 'TBLSCRIM';        END
    ELSE IF @Type = 'QUALITY'      BEGIN SET @ColName = 'QUALITY';      SET @TblName = 'TBLQUALITY';      END
    ELSE
        RAISERROR('Invalid @Type value provided.', 16, 1);

    -- ── 2. Pre-calculate OFFSET ──────────────────────────────────────────────
    SET @Offset = (@Page - 1) * @Size;

    -- ── 3. Build base query ──────────────────────────────────────────────────
    SET @SQL =
        N'SELECT ID, ' + QUOTENAME(@ColName) + N' AS Value, ISACTIVE, CREATEDDATE
          FROM  ' + QUOTENAME(@TblName) +
        N' WHERE (@Search IS NULL OR @Search = '''' OR '
                + QUOTENAME(@ColName) + N' LIKE ''%'' + @Search + ''%'')';

    -- ── 4. Count query — via OUTPUT param ────────────────────────────────────
    SET @CountSQL = N'SELECT @TotalCount = COUNT(*) FROM (' + @SQL + N') AS T';

    EXEC sp_executesql
        @CountSQL,
        N'@Search VARCHAR(100), @TotalCount INT OUTPUT',
        @Search     = @Search,
        @TotalCount = @TotalCount OUTPUT;

    -- ── 5. Paginated data query ──────────────────────────────────────────────
    SET @SQL = @SQL +
        N' ORDER BY ID DESC
           OFFSET @Offset ROWS FETCH NEXT @Size ROWS ONLY';

    EXEC sp_executesql
        @SQL,
        N'@Search VARCHAR(100), @Offset INT, @Size INT',
        @Search = @Search,
        @Offset = @Offset,
        @Size   = @Size;

    -- ── No second result set anymore — TotalCount returned via OUTPUT ────────
END