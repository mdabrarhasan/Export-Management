using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCBankInfoModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCBankInfoService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.LCBankInfoRepository
{
    public class RLCBankInfo : ILCBankInfo
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";

        public RLCBankInfo(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<DropDownBind> GetInvoiceByLC(int lcid)
        {
            try
            {
                SqlParameter LCID = new SqlParameter("@LCID", lcid);
                return _context.DropDownBind.FromSqlRaw(@"SELECT DISTINCT BILL.BILLID AS ID, CUSBILL.strCode AS Name
                                                         FROM ERP_DURBIN.dbo.tblCusBilling CUSBILL
                                                         INNER JOIN TBLLCVSBILL BILL ON CUSBILL.intBillID = BILL.BILLID
                                                         INNER JOIN TBLLCDETAILS LCD ON BILL.LCSCID = LCD.ID
                                                         WHERE LCD.ID = @LCID
                                                         ORDER BY CUSBILL.strCode", LCID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        }

        public List<LCBankInfoModelView> GetLCBankInfoAll()
        {
            return _context.LCBankInfoModelView
                .FromSqlRaw("Exec SPLCBANKINFOGETALL")
                .ToList();
        }


        public IQueryable<DropDownBind> GetStatus()
        {
            try
            {
                return _context.DropDownBind.FromSqlRaw(@"SELECT ID, NAME FROM TBLLCBANKINFOSTATUS WHERE ISACTIVE = 1 ORDER BY ID");
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }

            return null;
        }





        public IQueryable<DropDownBind> GetLCNO(string prefix)
        {
            try
            {
                SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix);
                return _context.DropDownBind.FromSqlRaw("Exec SPGETLCNO @PREFIX", PREFIX);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        }

        public string Save(LCBankInfoModel lcbankinfo)
        {
            string strMsg = "";

            try
            {
                var LCID = new SqlParameter("@LCID", lcbankinfo.LCID);

                var INVOICEID = new SqlParameter("@INVOICEID", lcbankinfo.INVOICEID);

                var DOCNEGOTIATEDATE = new SqlParameter("@DOCNEGOTIATEDATE",
                    (object)lcbankinfo.DOCNEGOTIATEDATE ?? DBNull.Value);

                var BENEFICIARYBANKCOST = new SqlParameter("@BENEFICIARYBANKCOST",
                    lcbankinfo.BENEFICIARYBANKCOST);

                var CROSSBANKCHARGE = new SqlParameter("@CROSSBANKCHARGE",
                    lcbankinfo.CROSSBANKCHARGE);

                var PAYMENTRECEIVEDATE = new SqlParameter("@PAYMENTRECEIVEDATE",
                    (object)lcbankinfo.PAYMENTRECEIVEDATE ?? DBNull.Value);

                var IDPBIDBCNO = new SqlParameter("@IDPBIDBCNO",
                    (object)lcbankinfo.IDPBIDBCNO ?? DBNull.Value);

                var CREATEDBY = new SqlParameter("@CREATEDBY", lcbankinfo.CREATEDBY);


                var BANKACCEPTANCE = new SqlParameter("@BANKACCEPTANCE",
                    string.IsNullOrEmpty(lcbankinfo.BANKACCEPTANCE) ? DBNull.Value : lcbankinfo.BANKACCEPTANCE);

                var EXCHANGERATE = new SqlParameter("@EXCHANGERATE",
                    lcbankinfo.EXCHANGERATE);


                var FINANCIALCOSTRATE = new SqlParameter("@FINANCIALCOSTRATE",
                    lcbankinfo.FINANCIALCOSTRATE);

                var STATUS = new SqlParameter("@STATUS",
                    string.IsNullOrEmpty(lcbankinfo.STATUS) ? DBNull.Value : lcbankinfo.STATUS);




                var msgParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    SqlDbType = System.Data.SqlDbType.VarChar,
                    Size = 100,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "EXEC dbo.SPLCBANKINFOSAVE " +
                    "@LCID, " +
                    "@INVOICEID, " +
                    "@DOCNEGOTIATEDATE, " +
                    "@BENEFICIARYBANKCOST, " +
                    "@CROSSBANKCHARGE, " +
                    "@PAYMENTRECEIVEDATE, " +
                    "@IDPBIDBCNO, " +
                    "@CREATEDBY, " +
                    "@BANKACCEPTANCE, " +
"@EXCHANGERATE, " +
"@FINANCIALCOSTRATE, " +
"@STATUS, " +
"@Msg OUTPUT",
                    LCID,
                    INVOICEID,
                    DOCNEGOTIATEDATE,
                    BENEFICIARYBANKCOST,
                    CROSSBANKCHARGE,
                    PAYMENTRECEIVEDATE,
                    IDPBIDBCNO,
                    CREATEDBY,
                    BANKACCEPTANCE,
EXCHANGERATE,
FINANCIALCOSTRATE,
STATUS,
msgParam
                );

                strMsg = msgParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                strMsg = ex.Message;
            }

            return strMsg;
        }

        public string Delete(int id)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPLCBANKINFODELETE @ID,@Msg output", ID, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return strMsg;
        }

        public string Update(LCBankInfoModel lcbankinfo)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", lcbankinfo.ID);
                SqlParameter LCID = new SqlParameter("@LCID", lcbankinfo.LCID);
                SqlParameter INVOICENO = new SqlParameter("@INVOICENO", lcbankinfo.INVOICEID);
                SqlParameter DOCNEGOTIATEDATE = new SqlParameter("@DOCNEGOTIATEDATE", lcbankinfo.DOCNEGOTIATEDATE ?? (object)DBNull.Value);

                SqlParameter BANKACCEPTANCE = new SqlParameter("@BANKACCEPTANCE", lcbankinfo.BANKACCEPTANCE ?? (object)DBNull.Value);
                SqlParameter EXCHANGERATE = new SqlParameter("@EXCHANGERATE", lcbankinfo.EXCHANGERATE );

                SqlParameter FINANCIALCOSTRATE = new SqlParameter("@FINANCIALCOSTRATE", lcbankinfo.FINANCIALCOSTRATE);
                SqlParameter STATUS = new SqlParameter("@STATUS", lcbankinfo.STATUS ?? (object)DBNull.Value);


                SqlParameter PAYMENTRECEIVEDATE = new SqlParameter("@PAYMENTRECEIVEDATE", lcbankinfo.PAYMENTRECEIVEDATE ?? (object)DBNull.Value);
                SqlParameter IDPBIDBCNO = new SqlParameter("@IDPBIDBCNO", lcbankinfo.IDPBIDBCNO ?? (object)DBNull.Value);
                SqlParameter UPDATEDBY = new SqlParameter("@UPDATEDBY", lcbankinfo.UPDATEDBY);

                SqlParameter BENEFICIARYBANKCOST = new SqlParameter("@BENEFICIARYBANKCOST", lcbankinfo.BENEFICIARYBANKCOST);
                SqlParameter CROSSBANKCHARGE = new SqlParameter("@CROSSBANKCHARGE", lcbankinfo.CROSSBANKCHARGE);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPLCBANKINFOUPDATE @ID,@LCID,@INVOICENO,@DOCNEGOTIATEDATE,@BENEFICIARYBANKCOST,@CROSSBANKCHARGE,@PAYMENTRECEIVEDATE,@IDPBIDBCNO,@UPDATEDBY,@BANKACCEPTANCE,@EXCHANGERATE,@FINANCIALCOSTRATE,@STATUS,@Msg output",
                                                                          ID, LCID, INVOICENO, DOCNEGOTIATEDATE, BENEFICIARYBANKCOST, CROSSBANKCHARGE, PAYMENTRECEIVEDATE, IDPBIDBCNO, UPDATEDBY, BANKACCEPTANCE, EXCHANGERATE, FINANCIALCOSTRATE, STATUS, outParam);

                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }

            return strMsg;
        }


        public IQueryable<DropDownBind> GetInvoiceNO(int lcid)
        {
            try
            {
                SqlParameter LCID = new SqlParameter("@PREFIX", lcid);
                return _context.DropDownBind.FromSqlRaw("Exec SPGETINVOICENO @PREFIX", LCID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<DropDownBind> LoadInvoice(int lcid)
        {
            throw new NotImplementedException();
        }

      
    }
}
