using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.CustomerModel;
using ImportExport.UI.Models.CustomerModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.CustomerService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.CustomerRepository
{
    public class RCustomer : ICustomer
    {
        private readonly Context _context;
        private readonly ICommon _common;
        private string _msg = "";

        public RCustomer (Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<CustomerModel> GetCustomerAll()
        {
            try
            {
                var data = _context.CustomerModel
                    .FromSqlRaw("Exec SPCUSTOMERALL")
                    .ToList(); 

                return data.AsQueryable();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", 0, 0, "");
                return Enumerable.Empty<CustomerModel>().AsQueryable();
            }
        }

        public IQueryable<DropDownBind> GetCustomerDropdown(string prefix)
        {
            try
            {
                var data = _context.DropDownBind
                    .FromSqlRaw("Exec SPGETCUSTOMERDROPDOWN @Prefix={0}", prefix)
                    .ToList();

                return data.AsQueryable();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.LC00001.ToString(),
                    enumProcessName.LC.ToString(), 0, 0, "");

                try
                {
                    return _context.DropDownBind
                        .Where(x => x.Name.StartsWith(prefix))
                        .OrderBy(x => x.Name)
                        .ToList()
                        .AsQueryable();
                }
                catch
                {
                    return Enumerable.Empty<DropDownBind>().AsQueryable();
                }
            }
        }

        public string Create(CustomerModel customer)
        {
            try
            {
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", customer.CUSTOMERID ?? (object)DBNull.Value);
                SqlParameter TIN = new SqlParameter("@TIN", customer.TIN ?? (object)DBNull.Value);
                SqlParameter BIN = new SqlParameter("@BIN", customer.BIN ?? (object)DBNull.Value);
                SqlParameter IRC = new SqlParameter("@IRC", customer.IRC ?? (object)DBNull.Value);
                SqlParameter ISACTIVE = new SqlParameter("@ISACTIVE", customer.ISACTIVE);
                SqlParameter MODULECODE = new SqlParameter("@MODULECODE", "CUSTOMER00001");
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", "CUSTOMERSAVE");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPCUSTOMERSAVE @CUSTOMERID,@TIN,@BIN,@IRC,@ISACTIVE,@MODULECODE,@MsgStatus,@Msg output",
                    CUSTOMERID, TIN, BIN, IRC, ISACTIVE, MODULECODE, MsgStatus, outParam);

                _msg = outParam.Value?.ToString() ?? "Customer saved successfully.";

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

        public string Update(CustomerModel customer)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", customer.ID);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", customer.CUSTOMERID ?? (object)DBNull.Value);
                SqlParameter TIN = new SqlParameter("@TIN", (object?)customer.TIN ?? DBNull.Value);
                SqlParameter BIN = new SqlParameter("@BIN", (object?)customer.BIN ?? DBNull.Value);
                SqlParameter IRC = new SqlParameter("@IRC", (object?)customer.IRC ?? DBNull.Value);
                SqlParameter ISACTIVE = new SqlParameter("@ISACTIVE", customer.ISACTIVE);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "EXEC SPCUSTOMERUPDATE @ID, @CUSTOMERID, @TIN, @BIN, @IRC, @ISACTIVE, @Msg OUTPUT",
                    ID, CUSTOMERID, TIN, BIN, IRC, ISACTIVE, outParam
                );

                _msg = outParam.Value?.ToString() ?? "Customer updated successfully.";

                if (!string.IsNullOrWhiteSpace(_msg) && _msg.ToLower().Contains("error"))
                {
                    _msg = "Error: " + _msg;
                }
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.LC00001.ToString(),
                    enumProcessName.LC.ToString(), 0, 0, "");

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

                _context.Database.ExecuteSqlRaw(
                    "Exec SPCUSTOMERDELETE @ID,@UPDATEDBY,@Msg output",
                    ID, UPDATEDBY, outParam
                );

                _msg = outParam.Value?.ToString() ?? "Customer deleted successfully.";

                if (!string.IsNullOrWhiteSpace(_msg) && _msg.ToLower().Contains("error"))
                {
                    _msg = "Error: " + _msg;
                }
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.LC00001.ToString(),
                    enumProcessName.LC.ToString(), 0, 0, "");

                _msg = "Error: " + ex.Message;
            }

            return _msg;
        }

    }
}
