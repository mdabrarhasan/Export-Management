using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.PackingRequestRepository
{
    public class RPackingRequestApproval : IPackingRequestApproval
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";
        public RPackingRequestApproval(Context context)
        {
            _context = context;
        }

        public IQueryable<PackingRequestLandingView> GetPending(int enroll, int unitid, string statusid)
        {
            try
            {
                int type = 1;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", statusid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingView.FromSqlRaw("Exec SPGETPACKINGREQFORAPPROVAL @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PackingRequestDelSummary> ViewByDetailsID(int headerid, int unitid, int enroll)
        {
            try
            {
                int type = 8;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestDelSummary.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public IQueryable<PackingRequestLandingView> ViewByMasterID(int headerid, int unitid, int enroll)
        {
            try
            {
                int type = 7;
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                return _context.PackingRequestLandingView.FromSqlRaw("Exec SPGETPACKINGREQLANDING @Type,@Enroll,@ID,@UnitID", Type, Enroll, ID, UnitID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PR00001.ToString(), enumProcessName.PR.ToString(), unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

       
    }
}
