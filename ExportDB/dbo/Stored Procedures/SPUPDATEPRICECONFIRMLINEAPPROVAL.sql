CREATE procedure [dbo].[SPUPDATEPRICECONFIRMLINEAPPROVAL]
(
@ID						int,
@ITEMID					int,
@QUANTITY				decimal(18,2),
@PRICE					decimal(18,2),
@OFFERPRICE				decimal(18,2),
@CONFIRMPRICE			decimal(18,2),
@UnitID					int,
@ModuleCode				varchar(50),
@Enroll					int,
@ProcessCode			varchar(50),
@MessageName			varchar(50),
@Msg					varchar(100)    out
)
as
DECLARE @LOG VARCHAR(500)
begin try
/*UPDATE TBLPRICECONFIRMLINE
SET OFFERPRICE=@OFFERPRICE,CONFIRMPRICE=@CONFIRMPRICE WHERE ID=@ID*/

UPDATE TBLPRICECONFIRMLINE
SET CONFIRMPRICE=@CONFIRMPRICE,OFFERPRICE=@OFFERPRICE WHERE ID=@ID

set @Msg=(select NAME from TBLMESSAGE where SUBMENUID=(select ID from TBLSUBMENU where CODE=@ModuleCode) and CODE=@MessageName)
	set @Log='UPDATE TBLPRICECONFIRMLINE SET OFFERPRICE='+cast(@OFFERPRICE as varchar(50))+' CONFIRMPRICE='+cast(@CONFIRMPRICE as varchar(50))
	exec SPActivityLog @Log,'',@ProcessCode,@ModuleCode,@ProcessCode,@UNITID,@Enroll
end try
begin catch
set @Msg=ERROR_MESSAGE()
end catch