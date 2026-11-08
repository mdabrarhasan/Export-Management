using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestConfirmService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.PackingrequestConfirmRepository
{
    public class RPickingPackingRequestConfirmApproval : IIPickingPackingRequestConfrimApproval
    {

        private Context _context;
        private ICommon _common;
        string strMsg = "";
        public RPickingPackingRequestConfirmApproval(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }



        public IQueryable<PickingPackingRequestLandingView> GetPending(int enroll, int unitid, string statusid)
        {
            try
            {
                int type = 7;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", statusid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestLandingView.FromSqlRaw("Exec SPGETPICKINGPACKINGFORAPPROVAL @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PickingPackingRequestDelSummary> ViewByDetailsID(int headerid, int unitid, int enroll)
        {
            try
            {
                int type = 4;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestDelSummary.FromSqlRaw("Exec SPGETPICKINGPACKING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<GetPickPackMaster>GetMasterIDinPro(int id)
        {
            SqlParameter ID = new SqlParameter("@ID", id);
            return  _context.GetPickPackMaster.FromSqlRaw("EXEC SpGetPickPackerIdbyMaster @ID ",ID);
        }

        public IQueryable<PickingPackingRequestLandingView> ViewByMasterID(int headerid, int unitid, int enroll)
        {
            try
            {
                int type = 1;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PickingPackingRequestLandingView.FromSqlRaw("Exec SPGETPICKINGPACKINGFORAPPROVAL @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRC00001.ToString(), enumProcessName.PRC.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }
    }
}
