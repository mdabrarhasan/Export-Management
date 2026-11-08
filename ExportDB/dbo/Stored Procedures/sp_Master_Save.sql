
CREATE PROCEDURE sp_Master_Save
(
    @Type VARCHAR(50),
    @ID INT,
    @Value VARCHAR(MAX),
    @IsActive BIT,
    @UserId INT
)
AS
BEGIN

    IF(@Type = 'SIZE')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLSIZE (SIZE, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLSIZE SET SIZE=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END

    ELSE IF(@Type = 'WEIGHT')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLWEIGHT (WEIGHT, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLWEIGHT SET WEIGHT=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END

    ELSE IF(@Type = 'CONSTRUCTION')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLCONSTRUCTION (CONSTRUCTION, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLCONSTRUCTION SET CONSTRUCTION=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END

    ELSE IF(@Type = 'SLIT')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLSLIT (SLIT, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLSLIT SET SLIT=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END

    ELSE IF(@Type = 'SCRIM')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLSCRIM (SCRIM, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLSCRIM SET SCRIM=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END

    ELSE IF(@Type = 'QUALITY')
    BEGIN
        IF(@ID = 0)
            INSERT INTO TBLQUALITY (QUALITY, ISACTIVE, CREATEDBY, CREATEDDATE)
            VALUES (@Value, 1, @UserId, GETDATE())
        ELSE
            UPDATE TBLQUALITY SET QUALITY=@Value, ISACTIVE=@IsActive, UPDATEDBY=@UserId, UPDATEDDATE=GETDATE()
            WHERE ID=@ID
    END
END