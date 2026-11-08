-- =============================================
-- Author: <Israil Hosen>
-- Create date: <06-April-2026>
-- Description: <Description,,>
-- =============================================

-- exec sprTmpRosaCrud 1,1,'','',569266
-- exec sprTmpRosaCrud 2,1,'','',569266
-- exec sprTmpRosaCrud 3,1,'Washim','Gulsahn',569266
-- exec sprTmpRosaCrud 4,1,'Fahim','Gulsahn',569266
-- exec sprTmpRosaCrud 5,1,'Fahim','Gulsahn',569266

CREATE PROCEDURE [dbo].[sprTmpRosaCrud]
@type int,
@intId int,
@strName varchar(100),
@strAddress varchar(100),
@intEnroll int
AS
BEGIN
if @type = 1 -- read all data
	begin
	select intId,strName,strAddress, intEnroll from ABGAPIS.dbo.tblTmpRosa where isActive = 1;
	end
if @type = 2 -- read data using ID
	begin
	select intId,strName,strAddress, intEnroll from ABGAPIS.dbo.tblTmpRosa where  isActive = 1 and intId = @intId;
	end
if @type = 3 -- insert data
	begin

	insert into ABGAPIS.dbo.tblTmpRosa(strName,strAddress, intEnroll)
	values(@strName,@strAddress,@intEnroll)

	end

if @type = 4 -- update data
	begin
		update ABGAPIS.dbo.tblTmpRosa
		set strName = @strName,
		strAddress = @strAddress ,
		intEnroll = @intEnroll
		where intId = @intId;
	end

if @type = 5 -- delete(soft delete) data
	begin
	update ABGAPIS.dbo.tblTmpRosa
	set IsActive = 0
	where intId = @intId;
	end

END

-- select * from ABGAPIS.dbo.tblTmpRosa

-- exec sprTmpRosaCrud 1, 1, '','',586938
-- exec sprTmpRosaCrud 2, 1, '', '', 586938
-- exec sprTmpRosaCrud 3, 1, 'Israil', 'Nikunja', 586938
-- exec sprTmpRosaCrud 4, 3, 'Bob', 'Khilkhet', 569266
-- exec sprTmpRosaCrud 5, 3, '','', 569266