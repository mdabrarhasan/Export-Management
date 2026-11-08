-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <13-11-2024>
-- Description:	<This is to update PickPacker Master>
-- =============================================

CREATE PROCEDURE spUpdatePickPackerByID
( 
 @ID int,
 @TERMSCONDITION varchar(50),
 @DESCRIPTIONS varchar(50),

   @VEHICALNO varchar(50),
   @DRIVERNAME varchar(50),
   @DRIVERPHONE varchar(50),
   @CUSTOMERDETAILS varchar(50),
   @GATENO varchar(50),
   @GATEPERSON varchar(50),

@ModuleCode	VARCHAR(100),
@UNITID		INT,
@Enroll		INT,
@DocStatus	VARCHAR(100),
@ProcessName VARCHAR(100),
@MsgStatus	VARCHAR(50),
@Notification VARCHAR(100),
@LOG VARCHAR(MAX),
@Msg VARCHAR(100) OUTPUT
)
AS
BEGIN

DECLARE @ProcessCode VARCHAR(50),@CHECK INT
DECLARE @CUSTOMERID INT
declare @PICKPACKDATE datetime

set @PICKPACKDATE =  (select PICKPACKDATE from TBLPICKINGPACKINGHEADER where ID = @ID)

	update TBLPICKINGPACKINGHEADER
	set 
	VEHICALNO = @VEHICALNO ,
	TERMSCONDITION = @TERMSCONDITION ,
	DESCRIPTIONS = @DESCRIPTIONS,
	DRIVERNAME = @DRIVERNAME , 
	DRIVERPHONE = @DRIVERPHONE ,
	CUSTOMERDETAILS = @CUSTOMERDETAILS ,
	GATENO = @GATENO  ,
	GATEPERSON = @GATEPERSON
	where ID=@ID;

	SET @LOG='UPDATE TBLPICKINGPACKINGHEADER SET PICKPACKDATE='+CAST(@PICKPACKDATE AS VARCHAR(50))+'TERMSCONDITION='+@TERMSCONDITION+'DESCRIPTIONS='+@DESCRIPTIONS+'WHERE ID='+CAST(@ID AS VARCHAR(50))
  SET @ProcessCode=@PROCESSNAME+CAST(@id AS VARCHAR(50))


  set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@MsgStatus) + ' '+@PROCESSNAME+ ' No :'+@ProcessCode
	 
END