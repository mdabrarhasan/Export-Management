
/* 2) SAVE (INSERT/UPDATE) */
CREATE   PROCEDURE [dbo].[SPMASTERTYPESAVE]
(
    @ID INT,
    @MASTERTYPE VARCHAR(50),
    @VALUE VARCHAR(MAX),
    @CREATEDBY INT,
    @UPDATEDBY INT,
    @Msg VARCHAR(200) OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @NEWID INT;
    SET @MASTERTYPE = UPPER(ISNULL(LTRIM(RTRIM(@MASTERTYPE)), ''));

    BEGIN TRY
        IF @MASTERTYPE = 'SIZE'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLSIZE'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLSIZE] ([SIZE], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLSIZE];
                    INSERT INTO [dbo].[TBLSIZE] ([ID], [SIZE], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLSIZE]
                SET [SIZE] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Size saved successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'WEIGHT'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLWEIGHT'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLWEIGHT] ([WEIGHT], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLWEIGHT];
                    INSERT INTO [dbo].[TBLWEIGHT] ([ID], [WEIGHT], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLWEIGHT]
                SET [WEIGHT] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Weight saved successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'CONSTRUCTION'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLCONSTRUCTION'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLCONSTRUCTION] ([CONSTRUCTION], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLCONSTRUCTION];
                    INSERT INTO [dbo].[TBLCONSTRUCTION] ([ID], [CONSTRUCTION], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLCONSTRUCTION]
                SET [CONSTRUCTION] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Construction saved successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'SLIT'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLSLIT'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLSLIT] ([SLIT], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLSLIT];
                    INSERT INTO [dbo].[TBLSLIT] ([ID], [SLIT], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLSLIT]
                SET [SLIT] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Slit saved successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'SCRIM'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLSCRIM'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLSCRIM] ([SCRIM], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLSCRIM];
                    INSERT INTO [dbo].[TBLSCRIM] ([ID], [SCRIM], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLSCRIM]
                SET [SCRIM] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Scrim saved successfully.';
            RETURN;
        END

        IF @MASTERTYPE = 'QUALITY'
        BEGIN
            IF ISNULL(@ID, 0) = 0
            BEGIN
                IF COLUMNPROPERTY(OBJECT_ID('dbo.TBLQUALITY'), 'ID', 'IsIdentity') = 1
                BEGIN
                    INSERT INTO [dbo].[TBLQUALITY] ([QUALITY], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
                ELSE
                BEGIN
                    SELECT @NEWID = ISNULL(MAX([ID]), 0) + 1 FROM [dbo].[TBLQUALITY];
                    INSERT INTO [dbo].[TBLQUALITY] ([ID], [QUALITY], [ISACTIVE], [CREATEDBY], [CREATEDDATE], [UPDATEDBY], [UPDATEDDATE])
                    VALUES (@NEWID, @VALUE, 1, @CREATEDBY, CAST(GETDATE() AS DATE), @CREATEDBY, CAST(GETDATE() AS DATE));
                END
            END
            ELSE
            BEGIN
                UPDATE [dbo].[TBLQUALITY]
                SET [QUALITY] = @VALUE, [UPDATEDBY] = @UPDATEDBY, [UPDATEDDATE] = CAST(GETDATE() AS DATE)
                WHERE [ID] = @ID;
            END

            SET @Msg = 'Quality saved successfully.';
            RETURN;
        END

        SET @Msg = 'Error: Invalid master type.';
    END TRY
    BEGIN CATCH
        SET @Msg = 'Error: ' + ERROR_MESSAGE();
    END CATCH
END