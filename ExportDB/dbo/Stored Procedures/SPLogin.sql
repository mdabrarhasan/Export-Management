

CREATE  PROCEDURE [dbo].[SPLogin]
	@type int, @account varchar(250), @password varchar(max), @ip varchar(75)='',
	@mac varchar(25)='', @session varchar(999)=''
As
Begin
Begin try
Begin Transaction
Declare @otp int=(select (ROUND(((9999 - 1001 -1) * (SELECT RAND()) + 1001), 0))), @count int,@unitid int
Declare @Return Table (Rowid int identity(1,1), Enroll int, Code varchar(max), Name varchar(max), Unit int, UnitName varchar(max), intDepartmentID int, 
strDepatrment varchar(max), Designation int, DesignationName varchar(max),intJobStationID int,strJobStationName varchar(max),Jobtype int, JobtypeName varchar(max),
dteAppointmentDate datetime,intPfUnitId int, Email varchar(max), Phoneno varchar(max),Supervisor varchar(max), OTP int, Message_ varchar(999))
--Set @mac='00155D8DFE2E'

if	(@type=0 and 
	())
begin  
set @type =3
end

if(@type=0) --- Check User information
Begin	
	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0)

	if(@count=0)
	Begin	
		Insert into DB_Security.dbo.tblUserSecurity(strAccountName, strPassword, ysnActive, dteExpireDate, ysnForceLogout, ysnOnline)
		Values (@account, 123, 1, Getdate(),0,0)	
	End


	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0) 

	if(@count=1)
	Begin	
		DECLARE @DBpass varchar(max)= isnull((SELECT TOP 1 CONVERT(varchar(max),DecryptByPassphrase ('ERP',strERPSecurityPassword))
		FROM DB_Security.dbo.tblUserSecurity WHERE  strAccountName = @account and ysnActive=1 and dteExpireDate>=getdate()), 'NDOTP'),
		@DBmac varchar(max)= isnull((SELECT strSecurityKey FROM DB_Security.dbo.tblUserSecurity WHERE  strAccountName = @account and ysnActive=1 
		and dteExpireDate>=getdate()), 'NDOTP')		

		if((@DBpass='NDOTP' and  @DBmac='NDOTP') or (@DBpass='NDOTP') or (@DBmac='NDOTP'))
		Begin	
			Insert into @Return (Message_, OTP, Enroll,Email,Phoneno) Select 'NDOTP',@otp, intEmployeeID,strOfficeEmail, strContactNo1 FROM erp_hr.dbo.qryEmployeeprofileall emp
			where strOfficeEmail=@account

			Declare @sms varchar(max)='You OTP is :'+ cast(@otp as varchar(5)) +'.Do not disclose this OTP to anyone.', @phn varchar(max)=	(select Phoneno from @Return where email=@account)
			insert into [DB_Security].[dbo].tblAHLPermission([EmployeeID], [PhoneNumber], [Email],[OTP],[IsActive], [ServiceName],[Password],[InsertionTime]) 
			select enroll, Phoneno,email, @otp, 0, 'ERP','ERP', Getdate() from @Return where email=@account
			insert into AFBLSMSServer.[dbo].tblAPIsms([strPhoneNo], [strMessage], [strSMS], [dteInsertDate], [intUnitID])
			Select @phn, @sms, ([AFBLSMSServer].[dbo].[funGPapi] ('', '', '', @phn, @sms)), Getdate(), 1
		End
		else if(''=@password )--)
		Begin	
			update DB_Security.dbo.tblUserSecurity set dteFailedPasswordAttemptStart=Getdate(), 
			intFailedPasswordAttemptCount =isnull(intFailedPasswordAttemptCount,0)+1 where strAccountName=@account and ysnActive=1
			Insert into @Return (Message_) Values('Your email or password is invalid.')
			
			
		End
		else if(@DBpass=@password )--and @DBmac=@mac)
		Begin	
			Insert into @Return (Enroll, Code, Name, Unit, UnitName, intDepartmentID, strDepatrment, Designation, DesignationName,
			intJobStationID,strJobStationName, Jobtype, JobtypeName,dteAppointmentDate,Email, Phoneno,intPfUnitId,Supervisor, 
			OTP, Message_)
			select emp.intEmployeeID, emp.strEmployeeCode, emp.strEmployeeName, emp.intUnitID, emp.strUnit, emp.intDepartmentID,
			emp.strDepatrment, emp.intDesignationID, emp.strDesignation, emp.intJobStationID, emp.strJobStationName, emp.intJobTypeId,
			strJobType, emp.dteAppointmentDate, emp.strOfficeEmail,	emp.strContactNo1,intPfUnitId ,sup.strEmployeeName,'', 'GO'
			FROM erp_hr.dbo.qryEmployeeprofileall emp
			inner join erp_hr.dbo.tblEmployee sup on emp.intSuperviserId=sup.intEmployeeID
			left join erp_hr.dbo.tblUnitPfConfiguration u on u.intUnitId=emp.intUnitID
			where emp.intEmployeeID=(select intUserID from erp_hr.dbo.tblUserInfo where strUserCode=@account)
	
			Update db_security.dbo.tblUserSecurity set ysnActive=1, ysnForceLogout=0, ysnOnline=1, dteLastActivity=Getdate(),
			dteLastLoginTime=Getdate(), 
			strLastLoginFrom='EXPORT',-- strLastLoginIP=@ip, strLastLoginSessionID=@session, strSecurityKey=@mac, 
			dteSecurityKeyGeneratingTime=Getdate() WHERE  strAccountName = @account and ysnActive=1

			insert into ABGAPIDB.dbo.tblLoginLog  (Email
           ,dteSecurityKeyGeneratingTime
           ,dteLastActivity
           ,ysnForceLogout
           ,ysnOnline
           ,dteLastLoginTime
           ,strLastLoginFrom
           ,intFailedPasswordAttemptCount) select
		   @account,Getdate(),Getdate(),0,1,Getdate(),'EXPORT',0

		End
	End

	else 
	Begin	
		Insert into @Return (Message_) Values ('There is more than one validate account.')
	End
End

else if(@type=1)	--- Change Password
Begin	
	Declare @Encrypt varbinary(200)= EncryptByPassPhrase('ERP', @password)  	
	update DB_Security.dbo.tblUserSecurity set strERPSecurityPassword=@Encrypt, dteLastPasswordChanged=getdate(), strSecurityKey=@mac,
	dteExpireDate=(Getdate()+180) where strAccountName=@account and strPassword='123' and ysnActive=1
	Insert into @Return (Message_) Values ('Your password has been updated successfull!')
End

else if(@type=2) --- Check User information
Begin	
	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0)

	if(@count=0)
	Begin	
		Insert into DB_Security.dbo.tblUserSecurity(strAccountName, strPassword, ysnActive, dteExpireDate, ysnForceLogout, ysnOnline)
		Values (@account, 123, 1, Getdate(),0,0)	
	End
	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0) 

	if(@count=1)
	Begin	
		set @DBpass = isnull((SELECT TOP 1 CONVERT(varchar(max),DecryptByPassphrase ('ERP',strERPSecurityPassword))
		FROM DB_Security.dbo.tblUserSecurity WHERE  strAccountName = @account and ysnActive=1 ), 'NDOTP')
		--set @DBmac = isnull((SELECT strSecurityKey FROM DB_Security.dbo.tblUserSecurity WHERE  strAccountName = @account and ysnActive=1 
		--and dteExpireDate>=getdate()), 'NDOTP')		

		--if(@DBpass='NDOTP' )
		--Begin	
		--	Insert into @Return (Message_, OTP, Enroll,Email,Phoneno) Select 'NDOTP',@otp, intEmployeeID,strOfficeEmail, strContactNo1 FROM erp_hr.dbo.qryEmployeeprofileall emp
		--	where strOfficeEmail=@account

		--	set @sms ='You OTP is :'+ cast(@otp as varchar(5)) +'.Do not disclose this OTP to anyone.'
		--	set @phn =	(select Phoneno from @Return where email=@account)
		--	insert into [DB_Security].[dbo].tblAHLPermission([EmployeeID], [PhoneNumber], [Email],[OTP],[IsActive], [ServiceName],[Password],[InsertionTime]) 
		--	select enroll, Phoneno,email, @otp, 0, 'ERP','ERP', Getdate() from @Return where email=@account
		--	insert into AFBLSMSServer.[dbo].tblAPIsms([strPhoneNo], [strMessage], [strSMS], [dteInsertDate], [intUnitID])
		--	Select @phn, @sms, ([AFBLSMSServer].[dbo].[funGPapi] ('', '', '', @phn, @sms)), Getdate(), 1
		--End
		 if(@DBpass!=@password )
		Begin	
			update DB_Security.dbo.tblUserSecurity set dteFailedPasswordAttemptStart=Getdate(), 
			intFailedPasswordAttemptCount =isnull(intFailedPasswordAttemptCount,0)+1 where strAccountName=@account and ysnActive=1
			Insert into @Return (Message_) Values('Your email or password is invalid.')
		End
		else if(@DBpass=@password )
		Begin	
		    set @unitid=(select top 1 UNITID from TBLUSERPERMISSIONLIST where ENROLL=(select intUserID from erp_hr.dbo.tblUserInfo where strUserCode=''))
			Insert into @Return (Enroll, Code, Name, Unit, UnitName, intDepartmentID, strDepatrment, Designation, DesignationName,
			intJobStationID,strJobStationName, Jobtype, JobtypeName,dteAppointmentDate,Email, Phoneno,intPfUnitId,Supervisor, OTP, Message_)
			select emp.intEmployeeID, emp.strEmployeeCode, emp.strEmployeeName, @unitid, emp.strUnit, emp.intDepartmentID,
			emp.strDepatrment, emp.intDesignationID, emp.strDesignation, emp.intJobStationID, emp.strJobStationName, emp.intJobTypeId,
			strJobType, emp.dteAppointmentDate, emp.strOfficeEmail,	emp.strContactNo1,isnull(intPfUnitId,0) as intPfUnitId ,sup.strEmployeeName,'', 'GO'
			FROM erp_hr.dbo.qryEmployeeprofileall emp
			inner join erp_hr.dbo.tblEmployee sup on emp.intSuperviserId=sup.intEmployeeID
			left join erp_hr.dbo.tblUnitPfConfiguration u on u.intUnitId=emp.intUnitID
			where emp.intEmployeeID=(select intUserID from erp_hr.dbo.tblUserInfo where strUserCode=@account)
	
			--Update db_security.dbo.tblUserSecurity set ysnActive=1, ysnForceLogout=0, ysnOnline=1, dteLastActivity=Getdate(), dteLastLoginTime=Getdate(), 
			--strLastLoginFrom='WEB', strLastLoginIP=@ip, strLastLoginSessionID=@session, strSecurityKey=@mac, 
			--dteSecurityKeyGeneratingTime=Getdate() WHERE  strAccountName = @account and ysnActive=1
		End
	End

	else 
	Begin	
		Insert into @Return (Message_) Values ('There is more than one validate account.')
	End
End


else if(@type=3) --- Check User information for it 
Begin	
	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0)

	if(@count=0)
	Begin	
		Insert into DB_Security.dbo.tblUserSecurity(strAccountName, strPassword, ysnActive, dteExpireDate, ysnForceLogout, ysnOnline)
		Values (@account, 123, 1, Getdate(),0,0)	
	End
	Set @count=isnull((select count(strAccountName) from DB_Security.dbo.tblUserSecurity where strAccountName=@account),0) 

	if(@count=1)
	Begin	
		set @DBpass = isnull((SELECT TOP 1 CONVERT(varchar(max),DecryptByPassphrase ('ERP',strERPSecurityPassword))
		FROM DB_Security.dbo.tblUserSecurity WHERE  strAccountName = @account and ysnActive=1 ), 'NDOTP')
		
		 if(@DBpass!=@password )
		Begin	
			update DB_Security.dbo.tblUserSecurity set dteFailedPasswordAttemptStart=Getdate(), 
			intFailedPasswordAttemptCount =isnull(intFailedPasswordAttemptCount,0)+1 where strAccountName=@account and ysnActive=1
			Insert into @Return (Message_) Values('Your email or password is invalid.')
		End
		else if(@DBpass=@password )
		Begin	
			Insert into @Return (Enroll, Code, Name, Unit, UnitName, intDepartmentID, strDepatrment, Designation, DesignationName,intJobStationID,strJobStationName, Jobtype, JobtypeName,dteAppointmentDate,Email, Phoneno,intPfUnitId,Supervisor, OTP, Message_)
			select emp.intEmployeeID, emp.strEmployeeCode, emp.strEmployeeName, emp.intUnitID, emp.strUnit, emp.intDepartmentID,
			emp.strDepatrment, emp.intDesignationID, emp.strDesignation, emp.intJobStationID, emp.strJobStationName, emp.intJobTypeId,
			strJobType, emp.dteAppointmentDate, emp.strOfficeEmail,	emp.strContactNo1,intPfUnitId ,sup.strEmployeeName,'', 'GO'
			FROM erp_hr.dbo.qryEmployeeprofileall emp
			inner join erp_hr.dbo.tblEmployee sup on emp.intSuperviserId=sup.intEmployeeID
			left join erp_hr.dbo.tblUnitPfConfiguration u on u.intUnitId=emp.intUnitID
			where emp.intEmployeeID=(select intUserID from erp_hr.dbo.tblUserInfo where strUserCode=@account)
	        
				insert into ABGAPIDB.dbo.tblLoginLog  (Email
           ,dteSecurityKeyGeneratingTime
           ,dteLastActivity
           ,ysnForceLogout
           ,ysnOnline
           ,dteLastLoginTime
           ,strLastLoginFrom
           ,intFailedPasswordAttemptCount) select
		   @account,Getdate(),Getdate(),0,1,Getdate(),'EXPORT',0
			
		End
	End

	else 
	Begin	
		Insert into @Return (Message_) Values ('There is more than one validate account.')
	End
End


Commit
End try
Begin Catch
	Rollback
	Insert into @Return (Message_) Values ('DB_Error:'+ ERROR_MESSAGE())
End Catch

Select * from @Return
End