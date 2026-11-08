using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.MasterTypeModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.MasterTypeService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.MasterTypeRepository
{
    public class RMasterType : IMasterType
    {
        private readonly Context _context;
        private readonly ICommon _common;
        private string _msg = "";

        public RMasterType(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<MasterTypeModelView> GetAll(string masterType)
        {
            try
            {
                SqlParameter MASTERTYPE = new SqlParameter("@MASTERTYPE", (masterType ?? "").Trim().ToUpper());

                var data = _context.MasterTypeModelView
                    .FromSqlRaw("Exec SPMASTERTYPEGETALL @MASTERTYPE", MASTERTYPE)
                    .ToList();

                return data
                    .Where(x => x.ISACTIVE != false)
                    .OrderByDescending(x => x.ID)
                    .AsQueryable();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
                return Enumerable.Empty<MasterTypeModelView>().AsQueryable();
            }
        }

        public string Save(MasterTypeModel master)
        {
            try
            {
                if (master == null || string.IsNullOrWhiteSpace(master.VALUE))
                {
                    return "Error: Value is required.";
                }

                SqlParameter ID = new SqlParameter("@ID", master.ID);
                SqlParameter MASTERTYPE = new SqlParameter("@MASTERTYPE", (master.MASTERTYPE ?? "").Trim().ToUpper());
                SqlParameter VALUE = new SqlParameter("@VALUE", master.VALUE.Trim());
                SqlParameter CREATEDBY = new SqlParameter("@CREATEDBY", master.CREATEDBY ?? 0);
                SqlParameter UPDATEDBY = new SqlParameter("@UPDATEDBY", master.UPDATEDBY ?? 0);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPMASTERTYPESAVE @ID,@MASTERTYPE,@VALUE,@CREATEDBY,@UPDATEDBY,@Msg output",
                    ID, MASTERTYPE, VALUE, CREATEDBY, UPDATEDBY, outParam);

                _msg = outParam.Value?.ToString() ?? "Master data saved successfully.";
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
                _msg = "Error: " + ex.Message;
            }

            return _msg;
        }

        public string Delete(int id, string masterType, int updatedBy)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter MASTERTYPE = new SqlParameter("@MASTERTYPE", (masterType ?? "").Trim().ToUpper());
                SqlParameter UPDATEDBY = new SqlParameter("@UPDATEDBY", updatedBy);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 200,
                    SqlDbType = SqlDbType.VarChar,
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPMASTERTYPEDELETE @ID,@MASTERTYPE,@UPDATEDBY,@Msg output", ID, MASTERTYPE, UPDATEDBY, outParam);

                _msg = outParam.Value?.ToString() ?? "Master data deleted successfully.";
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
