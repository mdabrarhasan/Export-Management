using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.DocumentService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.DocumentRepository
{
    public class RDocumentLanding : IDocumentLanding
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";

        public RDocumentLanding(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<DocumentListLoadView> GetDocListAll(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 1);
                SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                return _context.DocumentListLoadView.FromSqlRaw("Exec SPGETDOCLIST @TYPE,@DOCSETUPHEADER", TYPE, DOCSETUPHEADER);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", unitid, enroll, "");
            }
            return null;
        }

        public IQueryable<DocumentLandingViewModel> EditByMasterID(int headerid)
        {

            SqlParameter TYPE = new SqlParameter("@TYPE", 2);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.DocumentLandingViewModel.FromSqlRaw("Exec SPGETDOCHEADER @TYPE,@headerid", TYPE, HeaderID);
        }


        public IQueryable<DocumentLandingView> GetDocListFromHeader(int id,int pickpackid, int enroll, int unitid)
        {
            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 2);
                SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                SqlParameter PICKPACKID = new SqlParameter("@PICKPACKID", pickpackid);
                return _context.DocumentLandingView.FromSqlRaw("Exec SPGETDOCLIST @TYPE,@DOCSETUPHEADER,@PICKPACKID", TYPE, DOCSETUPHEADER, PICKPACKID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", unitid, enroll, "");
            }
            return null;
        }


        public IQueryable<DocumentLandingView> GetDetailsByID(int id,int pickpackid, string status)
        {
            if (status=="L")
            {
                try
                {
                    SqlParameter TYPE = new SqlParameter("@TYPE", 4);
                    SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                    SqlParameter PICKPACKID = new SqlParameter("@PICKPACKID", pickpackid);
                    return _context.DocumentLandingView.FromSqlRaw("Exec SPGETDOCLIST @TYPE,@DOCSETUPHEADER,@PICKPACKID", TYPE, DOCSETUPHEADER, PICKPACKID);
                }
                catch (Exception ex)
                {
                    _common.ErrorLog("", ex.ToString(), "", "", 0, 0, "");
                }
            }
            else
            {
                try
                {
                    SqlParameter TYPE = new SqlParameter("@TYPE", 4);
                    SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                    SqlParameter PICKPACKID = new SqlParameter("@PICKPACKID", pickpackid);
                    return _context.DocumentLandingView.FromSqlRaw("Exec SPGETDOCLIST @TYPE,@DOCSETUPHEADER,@PICKPACKID", TYPE, DOCSETUPHEADER, PICKPACKID);
                }
                catch (Exception ex)
                {
                    _common.ErrorLog("", ex.ToString(), "", "", 0, 0, "");
                }
            }
            
            return null;
        }

        public IQueryable<DocumentLandingViewModel> GetLandingAll(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter TYPE = new SqlParameter("@TYPE", 1);
                SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                return _context.DocumentLandingViewModel.FromSqlRaw("Exec SPGETDOCHEADER @TYPE,@DOCSETUPHEADER", TYPE, DOCSETUPHEADER);
            }
            catch (Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PRE00001.ToString(), enumProcessName.PRESHIP.ToString(), unitid, enroll, "");
            }
            return null;
        }

        public string DeleteMasterByID(int id,int pickpack,int rootdoclistid, int enroll, int unitid)
        {
            try
            {
                SqlParameter DOCSETUPHEADER = new SqlParameter("@DOCSETUPHEADER", id);
                SqlParameter PICKPACKID = new SqlParameter("@PICKPACKID", pickpack);
                SqlParameter ROOTDOCLISTID = new SqlParameter("@ROOTDOCLISTID", rootdoclistid);

                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", "");
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", "");
                SqlParameter MessageName = new SqlParameter("@MessageName", "");
                SqlParameter Notification = new SqlParameter("@Notification", "");
                SqlParameter Log = new SqlParameter("@Log","");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDELETEDOCUMENT @DOCSETUPHEADER,@PICKPACKID,@ROOTDOCLISTID,@ModuleCode,@UnitID,@Enroll,@ProcessName,@MessageName,@Notification,@Log,@Msg output", DOCSETUPHEADER, PICKPACKID, ROOTDOCLISTID, ModuleCode, UNITID, ENROLL, ProcessName, MessageName, Notification, Log, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", unitid, enroll, "");
            }
            return strMsg;
        }

        public string Save(DocumentLandingModel master, int unitid, int enroll)
        {
            try
            {
                SqlParameter DOCUMENTSETUPHEADERID = new SqlParameter("@DOCUMENTSETUPHEADERID", master.DOCUMENTSETUPHEADERID);
                SqlParameter PICKINGPACKINGHEADERID = new SqlParameter("@PICKINGPACKINGHEADERID", master.PICKINGPACKINGHEADERID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", master.DESCRIPTIONS==null ? "" : master.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", master.TERMSCONDITION == null ? "" : master.TERMSCONDITION);

                SqlParameter UnitID = new SqlParameter("@UnitID", master.UNITID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", "");
                SqlParameter Enroll = new SqlParameter("@Enroll", master.DOCUMENTCREATEDBY);
                SqlParameter DocStatus = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", "");
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", "");
                SqlParameter Notification = new SqlParameter("@Notification", "");
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPINSERTDOCUMENT @DOCUMENTSETUPHEADERID,@PICKINGPACKINGHEADERID,@DESCRIPTIONS,@TERMSCONDITION,@ModuleCode,@UnitID,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", DOCUMENTSETUPHEADERID, PICKINGPACKINGHEADERID, DESCRIPTIONS, TERMSCONDITION, ModuleCode, UnitID, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", master.UNITID, master.DOCUMENTCREATEDBY, "");
            }
            finally
            {

            }

            return strMsg;
        }

        public string Update(DocumentLandingModel master)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", master.ID);
                SqlParameter DOCUMENTSETUPHEADERID = new SqlParameter("@DOCUMENTSETUPHEADERID", master.DOCUMENTSETUPHEADERID);
                SqlParameter PICKINGPACKINGHEADERID = new SqlParameter("@PICKINGPACKINGHEADERID", master.PICKINGPACKINGHEADERID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", master.DESCRIPTIONS == null ? "" : master.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", master.TERMSCONDITION == null ? "" : master.TERMSCONDITION);

                SqlParameter UnitID = new SqlParameter("@UnitID", master.UNITID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", "");
                SqlParameter Enroll = new SqlParameter("@Enroll", master.DOCUMENTCREATEDBY);
                SqlParameter DocStatus = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", "");
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", "");
                SqlParameter Notification = new SqlParameter("@Notification", "");
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPUPDATEDOCUMENT @ID,@DOCUMENTSETUPHEADERID,@PICKINGPACKINGHEADERID,@DESCRIPTIONS,@TERMSCONDITION,@ModuleCode,@UnitID,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", ID,DOCUMENTSETUPHEADERID, PICKINGPACKINGHEADERID, DESCRIPTIONS, TERMSCONDITION, ModuleCode, UnitID, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), "", "", master.UNITID, master.DOCUMENTCREATEDBY, "");
            }
            finally
            {

            }

            return strMsg;
        }

    }
}
