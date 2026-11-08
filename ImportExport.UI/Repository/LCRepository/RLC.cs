using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.LCRepository
{
    public class RLC : ILC
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";


        public RLC(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }






        public IQueryable<DropDownBind> GetLCProcessCode(int id)  //get lcNo for id for file view
        {
            return _context.DropDownBind.FromSqlRaw(@"
        SELECT
            ID,
            CAST(LCNUMBER AS VARCHAR(100)) AS Name
        FROM TBLLCDETAILS
        WHERE ID = {0}
          AND ISACTIVE = 1", id);
        }




        public IQueryable<LCView> GetLCDetails(int enroll)
        {
            int type = 0;
            SqlParameter TYPE = new SqlParameter("@type", type);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATA @TYPE,@ENROLL", TYPE, ENROLL);
        }

        public IQueryable<LCView> GetLCDetailsBiax(int id,int enroll)
        {
            int typeid = 1;
            SqlParameter TYPE = new SqlParameter("@type", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATABIAX @TYPE,@ID,@ENROLL", TYPE,ID,ENROLL);
        }

        public IQueryable<LCView> ViewLCData(int id)
        {
            int typeid = 2;
            SqlParameter TYPE = new SqlParameter("@type", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", id);

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATABIAX @TYPE,@ID,@ENROLL", TYPE,ID,ENROLL);
        }

        public IQueryable<OCFListView> GetOCFList(int type)
        {
            SqlParameter TYPE = new SqlParameter("@type", type);

            return _context.OCFListView.FromSqlRaw("Exec SPGETOCFPILIST @TYPE", TYPE);
        }

        public IQueryable<OCFListView> GetOCFListView(int id)
        {
            int typeid = 1; 
            SqlParameter TYPE = new SqlParameter("@type", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.OCFListView.FromSqlRaw("Exec SPGETOCFPILISTVIEW @TYPE,@ID", TYPE,ID);
        }

        public IQueryable<AgreementLandingDetails> GetPIDetailsByIDEdit(int headerid)
        {
            int id = 0;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.AgreementLandingDetails.FromSqlRaw("Exec SPLCEDITDETAILSBYID @id,@headerid", ID, HeaderID);
        }

        public IQueryable<LCView> GetLCDetailsByID(int id, int unitid, int enroll)
        {
            int type = 1;
            SqlParameter TYPE = new SqlParameter("@type", type);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", id);    //enroll as id

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATA @TYPE,@ENROLL", TYPE, ENROLL);
        }

        public IQueryable<LCView> GetLCDetailsByIDBiax(int id, int unitid, int enroll)
        {
            int type = 3;
            SqlParameter TYPE = new SqlParameter("@type", type);
            SqlParameter ID = new SqlParameter("@ID", id);    //enroll as id
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.LCView.FromSqlRaw("Exec SPGETLCDATABIAX @TYPE,@ID,@ENROLL", TYPE,ID, ENROLL);
        }

        public string Save(LC al)
        {
            try
            {
                SqlParameter BUSINESSUNIT = new SqlParameter("@BUSINESSUNIT", al.BUSINESSUNIT);
                SqlParameter LCNUMBER = new SqlParameter("@LCNUMBER", al.LCNUMBER == null ? "" : al.LCNUMBER);
                SqlParameter LCISSUEDATE = new SqlParameter("@LCISSUEDATE", al.LCISSUEDATE == null ? "" : al.LCISSUEDATE);
                SqlParameter LCEXPIREDATE = new SqlParameter("@LCEXPIREDATE", al.LCEXPIREDATE == null ? "" : al.LCEXPIREDATE);
                SqlParameter LCCREATEDPLACE = new SqlParameter("@LCCREATEDPLACE", al.LCCREATEDPLACE == null ? "" : al.LCCREATEDPLACE);

                SqlParameter TOELRANCECRAMTPERCENTAGE = new SqlParameter("@TOELRANCECRAMTPERCENTAGE", al.TOELRANCECRAMTPERCENTAGE );
                SqlParameter PRESENTATIONINDATE = new SqlParameter("@PRESENTATIONINDATE", al.PRESENTATIONINDATE == null ? "" : al.PRESENTATIONINDATE);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter BUYERDOCUMENTREQUIRED = new SqlParameter("@BUYERDOCUMENTREQUIRED", al.BUYERDOCUMENTREQUIRED == null ? "" : al.BUYERDOCUMENTREQUIRED);
                SqlParameter BUYERADDITIONALCONDITION = new SqlParameter("@BUYERADDITIONALCONDITION", al.BUYERADDITIONALCONDITION == null ? "" : al.BUYERADDITIONALCONDITION);
                SqlParameter TRANSSHIPMENT = new SqlParameter("@TRANSSHIPMENT", al.TRANSSHIPMENT);
                SqlParameter NOTIFIEDPARTYDETAILS = new SqlParameter("@NOTIFIEDPARTYDETAILS", al.NOTIFIEDPARTYDETAILS == null ? "" : al.NOTIFIEDPARTYDETAILS);
                SqlParameter PISCHEADERID = new SqlParameter("@PISCHEADERID", al.PISCHEADERID);
                SqlParameter BUYERBANK = new SqlParameter("@BUYERBANK", al.BUYERBANK==null ? "" : al.BUYERBANK);

                SqlParameter SHIPMENTLATESTDATE = new SqlParameter("@SHIPMENTLATESTDATE", al.SHIPMENTLATESTDATE==null ? "" : al.SHIPMENTLATESTDATE);
                SqlParameter LCTENORPERIOD = new SqlParameter("@LCTENORPERIOD", al.LCTENORPERIOD == null ? "" : al.LCTENORPERIOD);
                SqlParameter LCEXPIREDPLACE = new SqlParameter("@LCEXPIREDPLACE", al.LCEXPIREDPLACE == null ? "" : al.LCEXPIREDPLACE);
                SqlParameter INVOICENO = new SqlParameter("@INVOICENO", al.INVOICENO == null ? "" : al.INVOICENO);
                SqlParameter DOCUMENTREQUIRE = new SqlParameter("@DOCUMENTREQUIRE", al.DOCUMENTREQUIRE == null ? "" : al.DOCUMENTREQUIRE);
                SqlParameter TYPE = new SqlParameter("@TYPE", al.TYPE);
                SqlParameter BILLNOID = new SqlParameter("@BILLNOID", al.BILLNOID);
                SqlParameter BUYERBANKID = new SqlParameter("@BUYERBANKID", al.BUYERBANKID);
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.LC00001.ToString());
                
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.LC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumLCMessage.LCSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumLCNotification.LCSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");


                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };





                //StringWriter sw;
                //using (sw = new StringWriter())
                //{
                //    //master.WriteXml(sw);
                //    //details.WriteXml(sw);
                //}



                _context.Database.ExecuteSqlRaw("Exec SPLCSAVE @BUSINESSUNIT, @DOCUMENTREQUIRE,@BUYERBANKID,@BILLNOID,@INVOICENO,@TYPE,@LCNUMBER,@LCISSUEDATE,@LCEXPIREDATE," +
                    "@LCCREATEDPLACE,@TOELRANCECRAMTPERCENTAGE,@PRESENTATIONINDATE,@PARTIALSHIPMENT,@BUYERDOCUMENTREQUIRED," +
                    "@BUYERADDITIONALCONDITION,@TRANSSHIPMENT,@NOTIFIEDPARTYDETAILS,@PISCHEADERID,@BUYERBANK,@SHIPMENTLATESTDATE,@LCTENORPERIOD,@LCEXPIREDPLACE,@MODULECODE,@UNITID,@ENROLL," +
                    "@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  BUSINESSUNIT, DOCUMENTREQUIRE, BUYERBANKID, BILLNOID, INVOICENO, TYPE, LCNUMBER, LCISSUEDATE, LCEXPIREDATE, LCCREATEDPLACE, TOELRANCECRAMTPERCENTAGE, PRESENTATIONINDATE, PARTIALSHIPMENT,
                  BUYERDOCUMENTREQUIRED, BUYERADDITIONALCONDITION, TRANSSHIPMENT, NOTIFIEDPARTYDETAILS, PISCHEADERID, BUYERBANK, SHIPMENTLATESTDATE, LCTENORPERIOD, LCEXPIREDPLACE, MODULECODE,
                  UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();




                //_context.Database.ExecuteSqlRaw("Exec SPLCSAVE @BUSINESSUNIT, @DOCUMENTREQUIRE,@BUYERBANKID,@BILLNOID,@INVOICENO,@TYPE,@LCNUMBER,@LCISSUEDATE,@LCEXPIREDATE," +
                //                                "@LCCREATEDPLACE,@TOELRANCECRAMTPERCENTAGE,@PRESENTATIONINDATE,@PARTIALSHIPMENT,@BUYERDOCUMENTREQUIRED," +
                //                                "@BUYERADDITIONALCONDITION,@TRANSSHIPMENT,@NOTIFIEDPARTYDETAILS,@PISCHEADERID,@BUYERBANK,@SHIPMENTLATESTDATE,@LCTENORPERIOD,@LCEXPIREDPLACE,@MODULECODE,@UNITID,@ENROLL," +
                //                                "@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output,@PROCESSCODEOUT output",
                //                              BUSINESSUNIT, DOCUMENTREQUIRE, BUYERBANKID, BILLNOID, INVOICENO, TYPE, LCNUMBER, LCISSUEDATE, LCEXPIREDATE, LCCREATEDPLACE, TOELRANCECRAMTPERCENTAGE, PRESENTATIONINDATE, PARTIALSHIPMENT,
                //                              BUYERDOCUMENTREQUIRED, BUYERADDITIONALCONDITION, TRANSSHIPMENT, NOTIFIEDPARTYDETAILS, PISCHEADERID, BUYERBANK, SHIPMENTLATESTDATE, LCTENORPERIOD, LCEXPIREDPLACE, MODULECODE,
                //                              UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam, outProcessCode);

                //strMsg = outParam.Value.ToString() + ":" + outProcessCode.Value.ToString();








            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            {

            }

            return strMsg;
        }

        public string Update(LC al)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", al.ID);
                
                SqlParameter LCNUMBER = new SqlParameter("@LCNUMBER", al.LCNUMBER ?? "");
                SqlParameter LCISSUEDATE = new SqlParameter("@LCISSUEDATE", al.LCISSUEDATE == null ? "" : al.LCISSUEDATE);
                SqlParameter LCEXPIREDATE = new SqlParameter("@LCEXPIREDATE", al.LCEXPIREDATE == null ? "" : al.LCEXPIREDATE);
                SqlParameter LCCREATEDPLACE = new SqlParameter("@LCCREATEDPLACE", al.LCCREATEDPLACE == null ? "" : al.LCCREATEDPLACE);
                SqlParameter TOELRANCECRAMTPERCENTAGE = new SqlParameter("@TOELRANCECRAMTPERCENTAGE", al.TOELRANCECRAMTPERCENTAGE);
                
                SqlParameter PRESENTATIONINDATE = new SqlParameter("@PRESENTATIONINDATE", al.PRESENTATIONINDATE ?? "");
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter BUYERDOCUMENTREQUIRED = new SqlParameter("@BUYERDOCUMENTREQUIRED", al.BUYERDOCUMENTREQUIRED == null ? "" : al.BUYERDOCUMENTREQUIRED);
                SqlParameter BUYERADDITIONALCONDITION = new SqlParameter("@BUYERADDITIONALCONDITION", al.BUYERADDITIONALCONDITION == null ? "" : al.BUYERADDITIONALCONDITION);
                SqlParameter TRANSSHIPMENT = new SqlParameter("@TRANSSHIPMENT", al.TRANSSHIPMENT);
                
                SqlParameter NOTIFIEDPARTYDETAILS = new SqlParameter("@NOTIFIEDPARTYDETAILS", al.NOTIFIEDPARTYDETAILS ?? "");
                SqlParameter PISCHEADERID = new SqlParameter("@PISCHEADERID", al.PISCHEADERID);
                SqlParameter BUYERBANK = new SqlParameter("@BUYERBANK", al.BUYERBANK==null ? "" : al.BUYERBANK);

                SqlParameter SHIPMENTLATESTDATE = new SqlParameter("@SHIPMENTLATESTDATE", al.SHIPMENTLATESTDATE == null ? "" : al.SHIPMENTLATESTDATE);
                SqlParameter LCTENORPERIOD = new SqlParameter("@LCTENORPERIOD", al.LCTENORPERIOD == null ? "" : al.LCTENORPERIOD);
                SqlParameter LCEXPIREDPLACE = new SqlParameter("@LCEXPIREDPLACE", al.LCEXPIREDPLACE == null ? "" : al.LCEXPIREDPLACE);

                SqlParameter INVOICENO = new SqlParameter("@INVOICENO", al.INVOICENO == null ? "" : al.INVOICENO);
                SqlParameter DOCUMENTREQUIRE = new SqlParameter("@DOCUMENTREQUIRE", al.DOCUMENTREQUIRE == null ? "" : al.DOCUMENTREQUIRE);
                SqlParameter TYPE = new SqlParameter("@TYPE", al.TYPE);
                SqlParameter BILLNOID = new SqlParameter("@BILLNOID", al.BILLNOID);
                SqlParameter BUYERBANKID = new SqlParameter("@BUYERBANKID", al.BUYERBANKID);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.LC00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.LC.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumLCMessage.LCEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumLCNotification.LCESSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                //StringWriter sw;
                //using (sw = new StringWriter())
                //{
                //    //master.WriteXml(sw);
                //    //details.WriteXml(sw);
                //}

                _context.Database.ExecuteSqlRaw("Exec SPLCUPDATE @ID,@DOCUMENTREQUIRE,@BUYERBANKID,@BILLNOID,@INVOICENO,@TYPE,@LCNUMBER,@LCISSUEDATE,@LCEXPIREDATE," +
                    "@LCCREATEDPLACE,@TOELRANCECRAMTPERCENTAGE,@PRESENTATIONINDATE,@PARTIALSHIPMENT,@BUYERDOCUMENTREQUIRED," +
                    "@BUYERADDITIONALCONDITION,@TRANSSHIPMENT,@NOTIFIEDPARTYDETAILS,@PISCHEADERID,@BUYERBANK,@SHIPMENTLATESTDATE,@LCTENORPERIOD,@LCEXPIREDPLACE,@MODULECODE,@UNITID,@ENROLL," +
                    "@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  ID, DOCUMENTREQUIRE, BUYERBANKID, BILLNOID, INVOICENO, TYPE,LCNUMBER, LCISSUEDATE, LCEXPIREDATE, LCCREATEDPLACE, TOELRANCECRAMTPERCENTAGE, PRESENTATIONINDATE, PARTIALSHIPMENT,
                  BUYERDOCUMENTREQUIRED, BUYERADDITIONALCONDITION, TRANSSHIPMENT, NOTIFIEDPARTYDETAILS, PISCHEADERID,BUYERBANK, SHIPMENTLATESTDATE, LCTENORPERIOD, LCEXPIREDPLACE,MODULECODE,
                  UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), al.UNITID, al.DOCUMENTCREATEDBY, "");
            }
            finally
            {

            }

            return strMsg;
        }

        public IQueryable<DropDownBind> GetSalesQuotation()
        {
            throw new NotImplementedException();
        }

        public string DeletePIMasterByID(int id,int unitid,int enroll)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.LC00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.LC.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumLCMessage.LCDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPLCDELETEBYMASTERBYID @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.SQ.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }


        public IQueryable<SellerInfo> GetSellerInfoShortPISCEdit(int id)
        {
            SqlParameter sellerid = new SqlParameter("@id", id);
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfoShortPISCEdit @id", sellerid);
        }

        public IQueryable<CustomerInfo> GetCustomerInfoShortPISCEdit(int id)
        {
            try
            {
                SqlParameter cusid = new SqlParameter("@id", id);
                return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfoShortPISCEDIT @id", cusid);
            }
            catch(Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(),0, 0, "");
            }
            finally
            { }
            return null;    
        }

        public IQueryable<DropDownBind> GetUnit()
        {
            try
            {
                return _context.DropDownBind.FromSqlRaw("Exec SPGETUNIT");
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        } 
        public IQueryable<DropDownBind> GetDocument()
        {
            try
            {
                return _context.DropDownBind.FromSqlRaw("Exec SPDOCUMENTGET");
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        } 
        public IQueryable<DropDownBind> CheckLocal(int id)
        {
            try
            {

                SqlParameter ID = new SqlParameter("@ID", id); 
                return _context.DropDownBind.FromSqlRaw("Exec SPCHECKLOCAL  @ID",ID);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        } 
        public IQueryable<DropDownBind> Billno(string prefix)
        {
            try
            {

                SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix); 
                return _context.DropDownBind.FromSqlRaw("Exec SPGETBILLNO  @PREFIX", PREFIX);
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.LC00001.ToString(), enumProcessName.LC.ToString(), 0, 0, "");
            }
            finally
            { }
            return null;
        }
    }
}
