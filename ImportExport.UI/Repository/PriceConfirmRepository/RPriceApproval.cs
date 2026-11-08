using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PriceConfirmService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.PriceConfirmRepository
{
    public class RPriceApproval : IPriceConfirmApproval
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";
        int PROCESSID = 0;
        public RPriceApproval(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<PriceConfirmView> GetPCPending(int enroll, int unitid, string statusid)
        {
            if(unitid==91)
            {
                try
                {
                    int type = 0;
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                    SqlParameter ID = new SqlParameter("@ID", statusid);
                    SqlParameter TYPE = new SqlParameter("@TYPE", type);

                    return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVALBIAX @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
                }
                catch (Exception ex)
                {
                    _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
                }
                finally
                {

                }
            }
            else
            {
                try
                {
                    int type = 0;
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                    SqlParameter ID = new SqlParameter("@ID", statusid);
                    SqlParameter TYPE = new SqlParameter("@TYPE", type);

                    return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
                }
                catch (Exception ex)
                {
                    _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
                }
                finally
                {

                }
            }
            
            return null;
        }

        public string UpdateDetailsByID(PriceConfirmDetails sqd, int unitid, int enroll)
        {
            PROCESSID = sqd.ID;
            try
            {
                SqlParameter ID = new SqlParameter("@ID", sqd.ID);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", sqd.ITEMID);
                SqlParameter QUANTITY = new SqlParameter("@QUANTITY", sqd.QUANTITY);
                SqlParameter PRICE = new SqlParameter("@PRICE", sqd.PRICE);
                SqlParameter OFFERPRICE = new SqlParameter("@OFFERPRICE", sqd.OFFERPRICE);
                SqlParameter CONFIRMPRICE = new SqlParameter("@CONFIRMPRICE", sqd.CONFIRMPRICE);


                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.PC.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumPCMessage.PCEDIT.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPRICECONFIRMLINEAPPROVAL @ID,@ITEMID,@QUANTITY,@PRICE,@OFFERPRICE,@CONFIRMPRICE,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName, @Msg output", ID, ITEMID, QUANTITY, PRICE, OFFERPRICE, CONFIRMPRICE, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }

            // Find this block and replace the ExecuteSqlRaw line + add logging

            catch (Exception ex)
            {
                _common.ErrorLog(PROCESSID.ToString(), ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }

            return strMsg;
        }

        public IQueryable<PriceConfirmView> ViewByMasterID(int headerid, int unitid, int enroll)
        {
            
            try
            {
                int type = 1;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmView.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch (Exception ex) {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally { } 
            return null;    
        }

        public IQueryable<PriceConfirmDetails> ViewByDetailsID(int headerid, int unitid, int enroll)
        {
            try
            {
                int type = 2;
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter Code = new SqlParameter("@Code", enumSubMenu.PC00001.ToString());
                SqlParameter ID = new SqlParameter("@ID", headerid);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.PriceConfirmDetails.FromSqlRaw("Exec GETPRICECONFIRMFORAPPROVAL @Enroll,@UnitID,@Code,@ID,@TYPE", UnitID, Code, Enroll, ID, TYPE);
            }
            catch(Exception ex) {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid, enroll, "");
            }
            finally
            {

            }
            return null;
        }

        public string UpdatePrice(int id, PriceConfirmDetails[] pcd, int unitid, int enroll)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ID", typeof(int));
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("OFFERPRICE", typeof(decimal));
                details.Columns.Add("CONFIRMPRICE", typeof(decimal));

                for (int i = 0; i < pcd.Length; i++)
                {
                    details.Rows.Add(pcd[i].ID,pcd[i].ITEMID, pcd[i].QUANTITY, pcd[i].PRICE, pcd[i].OFFERPRICE, pcd[i].CONFIRMPRICE);
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPCINSERTLINEAPPROVE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPCINSERTLINEAPPROVE";
                detailsparam.SqlValue = details;


                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.PC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.PC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumPCMessage.PCSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumPCNotification.PCSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    details.WriteXml(sw);
                }

                _context.Database.ExecuteSqlRaw("Exec SPSAVEPRICECONFIRMUPDATE @TYPEPCINSERTLINEAPPROVE,@ID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, ID,MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.PC00001.ToString(), enumProcessName.PC.ToString(), unitid,enroll, "");
            }
            finally
            { }
            return null;
        }
    }
}
