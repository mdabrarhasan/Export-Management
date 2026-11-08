using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.SalesQuatationRepository
{
    public class RSalesQuatationApproval : ISalesQuatationApproval
    {
        private Context _context;
        string Msg = "";

        public RSalesQuatationApproval(Context context)
        {
            _context = context;
        }

        public string Approve(int unitid, string modeulecode, int enroll, int id, int histryid, string remarks)
        {
            try
            {
                SqlParameter HistryID = new SqlParameter("@HistryID", histryid);
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modeulecode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter Remarks = new SqlParameter("@Remarks", remarks==null ? "" : remarks);
                SqlParameter ApproveCode = new SqlParameter("@ApproveCode", enumDocumentStatus.APPR.ToString());
                SqlParameter ApproveMsg = new SqlParameter("@ApproveMsg", enumSQMessage.SQAPPR.ToString());
                SqlParameter Notification = new SqlParameter("@Notification", enumSQNotification.SQEAPPROVE.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.SQ.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPApprove @HistryID,@unitid,@ModuleCode,@Enroll,@ID,@Remarks,@ApproveCode,@ApproveMsg,@Notification,@ProcessName,@Msg output", HistryID, UnitID, ModuleCode, Enroll, ID, Remarks, ApproveCode, ApproveMsg,Notification, ProcessName, outParam);
                Msg=outParam.Value.ToString();
            }
            catch { 
            
            }
            finally { } 
            return Msg;
        }

        public string Rejected(int unitid, string modeulecode, int enroll, int id, string remarks)
        {
            try
            {
                SqlParameter UnitID = new SqlParameter("@unitid", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modeulecode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter Remarks = new SqlParameter("@Remarks", remarks == null ? "" : remarks);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.SQ.ToString());
                SqlParameter RejectedCode = new SqlParameter("@RejectCode", enumDocumentStatus.REJC.ToString());
                SqlParameter RejectedMsg = new SqlParameter("@RejectedMsg", enumSQMessage.SQREJ.ToString());
                SqlParameter Notification = new SqlParameter("@Notification", enumSQNotification.SQEREJECT.ToString());


                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPRejected @unitid,@ModuleCode,@Enroll,@ID,@Remarks,@ProcessName,@RejectCode,@RejectedMsg,@Notification,@Msg output", UnitID, ModuleCode, Enroll, ID, Remarks, ProcessName, RejectedCode, RejectedMsg,Notification, outParam);
                Msg=outParam.Value.ToString();
            }
            catch { 
            
            }
            finally { }
            return Msg;
        }

        public IQueryable<SalesQuatationLandingView> GetDataByStatusID()
        {
            return _context.SalesQuatationLandingView.FromSqlRaw("Exec SPGetDocumentStatus");
        }

        public IQueryable<SalesQuatationLandingView> GetSalesQuatationApproval(int unitid, string modulecode, int enroll, string id)
        {
            
            SqlParameter UnitID = new SqlParameter("@unitid", unitid);
            SqlParameter Code = new SqlParameter("@Code", modulecode);
            SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
            SqlParameter ID = new SqlParameter("@ID", id);

            return _context.SalesQuatationLandingView.FromSqlRaw("Exec SPGetSalesQuatationApprovalByID @unitid,@Code,@Enroll,@ID", UnitID, Code, Enroll,ID);
        }
    }
}
