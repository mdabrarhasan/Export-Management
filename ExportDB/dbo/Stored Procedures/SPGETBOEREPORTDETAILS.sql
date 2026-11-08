-- =============================================
-- Author:		<Fahim Hossain Rafayet>
-- Create date: <02-12-24>
-- Description:	<Sp for bill of exchange report details>
-- =============================================

-- exec SPGETBOEREPORTDETAILS 28

CREATE PROCEDURE [dbo].[SPGETBOEREPORTDETAILS]
@ID int
AS
BEGIN

 DECLARE @GrandTotal DECIMAL(18, 2);
 Declare @word varchar(500);
	SELECT @GrandTotal = (
	         select sum(line.PRICE) from ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
              inner join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prch
              on qou.ID = prch.PROFORMAINVOICEHEADERID
			  inner join ABGAPIS.dbo.TBLPRICECONFIRMLINE as line
			  on line.PRICECONFIRMHEADERID = prch.ID
			  inner join abgapis.dbo.TBLLCDETAILS as lcd
              on lcd.PROFORMAINVOICEHEADERID = qou.ID
			  where lcd.ID = @ID
	)

	select @word = dbo.MoneyToWords_EN(@GrandTotal);

select 
strAddress,
qou.QUOTATIONNUMBER as pino,
FORMAT(qou.DOCUMENTCREATEDDATE, 'dd-MMM-yy') as pidate,
CUSTOMERBANKNAME,
CUSTOMERBANKBINNO,
CUSTOMERBANKADDRESSLINEONE,
CUSTOMERBANKADDRESSLINETWO,
CUSTOMERBANKADDRESSLINETHREE,
bif.strBankName,
lcd.LCNUMBER,
bbi.strAddress as bankaddress,
FORMAT(lcd.DOCUMENTCREATEDDATE, 'dd-MMM-yy') as lcdate,
ISNULL((select strCode from ERP_DURBIN.dbo.tblCusBilling as cus inner join ABGAPIS.dbo.TBLLCDETAILS as lcm on cus.intBillID = lcm.BILLNOID and lcm.id=lcd.id),lcd.invoiceno) as INVOICENO,
FORMAT(lcd.DOCUMENTCREATEDDATE, 'dd-MMM-yy') as DOCUMENTCREATEDDATE,
(SELECT STRING_AGG(HSCODE, ', ') FROM ABGAPIS.dbo.TBLQUOTATIONHSCODE WHERE QTID = qou.ID) AS HSCODE,
(
select curr.NAME from ABGAPIS.dbo.TBLLCDETAILS as lc
left join ABGAPIS.dbo.TBLQUOTATIONHEADER as qouhead
on lc.PROFORMAINVOICEHEADERID = qouhead.ID
left join ABGAPIS.dbo.TBLCURRENCY as curr
on curr.ID = qouhead.CURRENCYID
where qouhead.id = qou.ID
) as Currency ,
UPPER(@word) as TotalAMountInWords,
@GrandTotal as Totalamount
from ABGAPIS.dbo.TBLQUOTATIONHEADER as qou
left join ABGAPIS.dbo.TBLPRICECONFIRMHEADER as prch
on qou.ID = prch.PROFORMAINVOICEHEADERID
left join ERP_Accounts.dbo.tblBankAccountList as acl
on acl.intID = qou.SELLERBANKID
left join ERP_Accounts.dbo.tblBankAccountInfo as tbai
on acl.intAccountID = tbai.intAccountID
left join ERP_Accounts.dbo.tblBankBranchInfo as bbi
on bbi.intBranchID = tbai.intBankBranchID
left join ERP_Accounts.dbo.tblBankInfo as bif
on bif.intBankID = bbi.intBankID
left join abgapis.dbo.TBLLCDETAILS as lcd
on lcd.PROFORMAINVOICEHEADERID = qou.ID
left join ABGAPIS.dbo.TBLCUSTOMERBANK as cusbank
on lcd.BUYERBANKID = cusbank.ID
where lcd.ID = @ID
;
END