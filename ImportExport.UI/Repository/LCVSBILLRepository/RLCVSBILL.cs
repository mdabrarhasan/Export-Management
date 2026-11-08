using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.LCVSBILL;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCVSBILLService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.LCVSBILLRepository
{

    public class RLCVSBILL : ILCVSBILL
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";
        public RLCVSBILL(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public string Delete(int id)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter MSGSTATUS = new SqlParameter("@MSGSTATUS", enumLCVSBILLMessage.LCVSBILLDEL);
                SqlParameter MODULECODE = new SqlParameter("@MODULECODE", enumSubMenu.LCVSBILL00001);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPLCVSBILLDELETE @ID,@MODULECODE,@MSGSTATUS,@Msg output", ID, MODULECODE, MSGSTATUS, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return strMsg;
        }

        public IQueryable<LCVSBILLView> GetLCDetails(int id)
        {
            return _context.LCVSBILLView.FromSqlRaw("Exec SPGETLCDETAILS");
        }

        public IQueryable<DropDownBind> GetShipment()
        {
            try
            {
                return _context.DropDownBind.FromSqlRaw("Exec SPGETSHIPMENT");
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.LC00001.ToString(),
                    enumProcessName.LC.ToString(), 0, 0, "");
            }
            return null;
        }
        public IQueryable<DropDownBind> GetLCNO(string prefix)
        {
            try
            {
                SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix);
                return _context.DropDownBind.FromSqlRaw("Exec SPGETLCNO  @PREFIX", PREFIX);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        }

        public string Save(LCVSBILL lcbill)
        {
            try
            {
                SqlParameter TYPEID = new SqlParameter("@TYPEID", lcbill.TYPEID);
                SqlParameter LCSCID = new SqlParameter("@LCSCID", lcbill.LCSCID);
                SqlParameter BILLID = new SqlParameter("@BILLID", lcbill.BILLID);
                SqlParameter SHIPMENTID = new SqlParameter("@SHIPMENTID", lcbill.SHIPMENTID);
                SqlParameter CREATEDBY = new SqlParameter("@CREATEDBY", lcbill.CREATEDBY);
                SqlParameter SLNO = new SqlParameter("@SLNO", lcbill.SLNO);
                SqlParameter INDATE = new SqlParameter("@INDATE", lcbill.INDATE);
                SqlParameter UNITID = new SqlParameter("@UNITID", lcbill.UNITID);
                SqlParameter MSGSTATUS = new SqlParameter("@MSGSTATUS", enumLCVSBILLMessage.LCVSBILLSAVE);
                SqlParameter MODULECODE = new SqlParameter("@MODULECODE", enumSubMenu.LCVSBILL00001);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPLCVSBILLSAVE @TYPEID,@SLNO,@INDATE,@LCSCID,@BILLID,@SHIPMENTID,@CREATEDBY,@UNITID,@MODULECODE,@MSGSTATUS, @Msg output", TYPEID, SLNO, INDATE, LCSCID, BILLID, SHIPMENTID, CREATEDBY,UNITID, MODULECODE, MSGSTATUS, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            return strMsg;
        }

        public string UpdateRM(UPDATERMBY master)
        {
            if (master == null)
                return "Invalid request";

            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@ID", master.ID),
                    new SqlParameter("@RMBY", (object)master.RMBY ?? string.Empty),
                    new SqlParameter("@RMDATE", (object)master.RMDATE ?? string.Empty)
                };

                _context.Database.ExecuteSqlRaw(
                    "EXEC UPDATELCRM @ID, @RMBY, @RMDATE",
                    parameters
                );

                return "Updated successfully";
            }
            catch (Exception ex)
            {
                // Ideally log this instead of swallowing it
                return $"Error: {ex.Message}";
            }
        }

        public string Update(LCVSBILL lcbill)
        {
            throw new NotImplementedException();
        }
    }
}
