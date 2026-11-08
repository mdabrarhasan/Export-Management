using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.DocumentService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.DocumentRepository
{
    public class RDocumentApproval : IDocumentApproval
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";
        public RDocumentApproval(Context context)
        {
            _context = context;
        }

        public IQueryable<DocumentLandingViewModel> GetPending(string statusid, int rootdoclistid, int enroll, int unitid)
        {
            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 1);
                SqlParameter STATUSID = new SqlParameter("@STATUSID", statusid);
                SqlParameter ROOTDOCLISTID = new SqlParameter("@ROOTDOCLISTID", rootdoclistid);
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);

                return _context.DocumentLandingViewModel.FromSqlRaw("Exec SPGETDOCLISTFORAPPROVAL @TYPE,@STATUSID,@ROOTDOCLISTID,@unitid,@Enroll", TYPE, STATUSID,ROOTDOCLISTID, UnitID,Enroll);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRE00001.ToString(), enumProcessName.PRESHIP.ToString(), unitid, enroll, "");
            }
            return null;
        }

        public IQueryable<DocumentLandingView> ViewByDetailsID(int headerid, int enroll, int unitid)
        {
            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 4);
                SqlParameter ROOTDOCLISTID = new SqlParameter("@ROOTDOCLISTID", headerid);
                SqlParameter STATUSID = new SqlParameter("@STATUSID", "");
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                return _context.DocumentLandingView.FromSqlRaw("Exec SPGETDOCLISTFORAPPROVAL @TYPE,@STATUSID,@ROOTDOCLISTID,@unitid,@Enroll", TYPE, STATUSID, ROOTDOCLISTID, UnitID, Enroll);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", 0, 0, "");
            }
            return null;
        }

        public IQueryable<DocumentLandingViewModel> ViewByMasterID(int headerid, int enroll, int unitid)
        {

            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 2);
                SqlParameter ROOTDOCLISTID = new SqlParameter("@ROOTDOCLISTID", headerid);
                SqlParameter STATUSID = new SqlParameter("@STATUSID", "");
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);

                return _context.DocumentLandingViewModel.FromSqlRaw("Exec SPGETDOCLISTFORAPPROVAL @TYPE,@STATUSID,@ROOTDOCLISTID,@unitid,@Enroll", TYPE, STATUSID, ROOTDOCLISTID, UnitID, Enroll);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", 0, 0, "");
            }
            return null;
        }


        public string Rejected(int unitid, string modeulecode, int enroll, int id, string remarks, string docstatus, string messege, string notification, string processname)
        {
            try
            {
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modeulecode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter Remarks = new SqlParameter("@Remarks", remarks == null ? "" : remarks);

                SqlParameter RejectedCode = new SqlParameter("@RejectCode", docstatus);
                SqlParameter RejectedMsg = new SqlParameter("@RejectedMsg", messege);
                SqlParameter Notification = new SqlParameter("@Notification", notification);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", processname);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPRejected @unitid,@ModuleCode,@Enroll,@ID,@Remarks,@ProcessName,@RejectCode,@RejectedMsg,@Notification, @Msg output", UnitID, ModuleCode, Enroll, ID, Remarks, RejectedCode, RejectedMsg, Notification, ProcessName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), modeulecode, processname, unitid, enroll, "");
            }
            finally { }
            return strMsg;
        }

        public string Approve(int unitid, string modeulecode, int enroll, int histryid, int id, string remarks, string status, string message, string notification, string processname)
        {
            try
            {
                SqlParameter HistryID = new SqlParameter("@HistryID", histryid);
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modeulecode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter Remarks = new SqlParameter("@Remarks", remarks == null ? "" : remarks);
                SqlParameter ApproveCode = new SqlParameter("@ApproveCode", status);
                SqlParameter ApproveMsg = new SqlParameter("@ApproveMsg", message);
                SqlParameter Notification = new SqlParameter("@Notification", notification);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", processname);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPApprove @HistryID,@unitid,@ModuleCode,@Enroll,@ID,@Remarks,@ApproveCode,@ApproveMsg,@Notification,@ProcessName,@Msg output", HistryID, UnitID, ModuleCode, Enroll, ID, Remarks, ApproveCode, ApproveMsg, Notification, ProcessName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), modeulecode, processname, unitid, enroll, "");
            }
            finally { }
            return strMsg;
        }

    }
}
