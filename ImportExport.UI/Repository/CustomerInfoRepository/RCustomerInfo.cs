using ImportExport.UI.Models.CustomerInfoModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.CustomerInfoService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.CustomerInfoRepository
{
    public class RCustomerInfo : ICustomerInfo
    {
        private readonly Context _context;
        private readonly ICommon _common;
        private string _msg = "";

        public RCustomerInfo(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<CustomerBankModel> GetCustomerBankAll()
        {
            try
            {
                var data = _context.CustomerBankModel
                    .FromSqlRaw("Exec SPCUSTOMERBANKGETALL")
                    .ToList();

                return data
                    .Where(x => x.ISACTIVE == null || x.ISACTIVE == 1)
                    .OrderByDescending(x => x.ID)
                    .AsQueryable();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");

                try
                {
                    // Fallback when SP is missing/misconfigured so page can still load.
                    return _context.CustomerBankModel
                        .Where(x => x.ISACTIVE == null || x.ISACTIVE == 1)
                        .OrderByDescending(x => x.ID)
                        .ToList()
                        .AsQueryable();
                }
                catch
                {
                }
            }

            return Enumerable.Empty<CustomerBankModel>().AsQueryable();
        }

        public CustomerBankModel GetCustomerBankById(int id)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);

                return _context.CustomerBankModel
                    .FromSqlRaw("Exec SPCUSTOMERBANKGETBYID @ID", ID)
                    .AsEnumerable()
                    .FirstOrDefault(x => x.ISACTIVE == null || x.ISACTIVE == 1);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }

            return null;
        }

        public string Create(CustomerBankModel customerBank)
        {
            try
            {
                SqlParameter CUSTOMERNAME = new SqlParameter("@CUSTOMERNAME", customerBank.CUSTOMERNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKBRANCHNAME = new SqlParameter("@CUSTOMERBANKBRANCHNAME", customerBank.CUSTOMERBANKBRANCHNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKNAME = new SqlParameter("@CUSTOMERBANKNAME", customerBank.CUSTOMERBANKNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINEONE = new SqlParameter("@CUSTOMERBANKADDRESSLINEONE", customerBank.CUSTOMERBANKADDRESSLINEONE ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINETWO = new SqlParameter("@CUSTOMERBANKADDRESSLINETWO", customerBank.CUSTOMERBANKADDRESSLINETWO ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINETHREE = new SqlParameter("@CUSTOMERBANKADDRESSLINETHREE", customerBank.CUSTOMERBANKADDRESSLINETHREE ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKBINNO = new SqlParameter("@CUSTOMERBANKBINNO", customerBank.CUSTOMERBANKBINNO ?? (object)DBNull.Value);
                SqlParameter ISACTIVE = new SqlParameter("@ISACTIVE", 1);
                SqlParameter CREATEDBY = new SqlParameter("@CREATEDBY", customerBank.CREATEDBY ?? 0);
                SqlParameter MODULECODE = new SqlParameter("@MODULECODE", "CUSTOMERBANK00001");
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", "CUSTOMERBANKSAVE");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPCUSTOMERBANKSAVE @CUSTOMERNAME,@CUSTOMERBANKBRANCHNAME,@CUSTOMERBANKNAME,@CUSTOMERBANKADDRESSLINEONE,@CUSTOMERBANKADDRESSLINETWO,@CUSTOMERBANKADDRESSLINETHREE,@CUSTOMERBANKBINNO,@ISACTIVE,@CREATEDBY,@MODULECODE,@MsgStatus,@Msg output",
                    CUSTOMERNAME, CUSTOMERBANKBRANCHNAME, CUSTOMERBANKNAME, CUSTOMERBANKADDRESSLINEONE, CUSTOMERBANKADDRESSLINETWO, CUSTOMERBANKADDRESSLINETHREE, CUSTOMERBANKBINNO, ISACTIVE, CREATEDBY, MODULECODE, MsgStatus, outParam);

                _msg = outParam.Value?.ToString() ?? "Customer bank info saved successfully.";
                if (!string.IsNullOrWhiteSpace(_msg) && _msg.ToLower().Contains("error"))
                {
                    _msg = "Error: " + _msg;
                }
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
                _msg = "Error: " + ex.Message;
            }

            return _msg;
        }

        public string Update(CustomerBankModel customerBank)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", customerBank.ID);
                SqlParameter CUSTOMERNAME = new SqlParameter("@CUSTOMERNAME", customerBank.CUSTOMERNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKBRANCHNAME = new SqlParameter("@CUSTOMERBANKBRANCHNAME", customerBank.CUSTOMERBANKBRANCHNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKNAME = new SqlParameter("@CUSTOMERBANKNAME", customerBank.CUSTOMERBANKNAME ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINEONE = new SqlParameter("@CUSTOMERBANKADDRESSLINEONE", customerBank.CUSTOMERBANKADDRESSLINEONE ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINETWO = new SqlParameter("@CUSTOMERBANKADDRESSLINETWO", customerBank.CUSTOMERBANKADDRESSLINETWO ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKADDRESSLINETHREE = new SqlParameter("@CUSTOMERBANKADDRESSLINETHREE", customerBank.CUSTOMERBANKADDRESSLINETHREE ?? (object)DBNull.Value);
                SqlParameter CUSTOMERBANKBINNO = new SqlParameter("@CUSTOMERBANKBINNO", customerBank.CUSTOMERBANKBINNO ?? (object)DBNull.Value);
                SqlParameter UPDATEDBY = new SqlParameter("@UPDATEDBY", customerBank.UPDATEDBY ?? 0);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPCUSTOMERBANKUPDATE @ID,@CUSTOMERNAME,@CUSTOMERBANKBRANCHNAME,@CUSTOMERBANKNAME,@CUSTOMERBANKADDRESSLINEONE,@CUSTOMERBANKADDRESSLINETWO,@CUSTOMERBANKADDRESSLINETHREE,@CUSTOMERBANKBINNO,@UPDATEDBY,@Msg output",
                    ID, CUSTOMERNAME, CUSTOMERBANKBRANCHNAME, CUSTOMERBANKNAME, CUSTOMERBANKADDRESSLINEONE, CUSTOMERBANKADDRESSLINETWO, CUSTOMERBANKADDRESSLINETHREE, CUSTOMERBANKBINNO, UPDATEDBY, outParam);

                _msg = outParam.Value?.ToString() ?? "Customer bank info updated successfully.";
                if (!string.IsNullOrWhiteSpace(_msg) && _msg.ToLower().Contains("error"))
                {
                    _msg = "Error: " + _msg;
                }
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
                _msg = "Error: " + ex.Message;
            }

            return _msg;
        }

        public string Delete(int id, int updatedBy)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter UPDATEDBY = new SqlParameter("@UPDATEDBY", updatedBy);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPCUSTOMERBANKDELETE @ID,@UPDATEDBY,@Msg output", ID, UPDATEDBY, outParam);
                _msg = outParam.Value?.ToString() ?? "Customer bank info deleted successfully.";
                if (!string.IsNullOrWhiteSpace(_msg) && _msg.ToLower().Contains("error"))
                {
                    _msg = "Error: " + _msg;
                }
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
                _msg = "Error: " + ex.Message;
            }

            return _msg;
        }
    }
}
