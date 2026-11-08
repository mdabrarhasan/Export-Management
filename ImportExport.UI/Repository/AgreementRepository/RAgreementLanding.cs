using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;



namespace ImportExport.UI.Repository.AgreementRepository
{
    public class RAgreementLanding : IAgreementLanding
    {
        string strMsg = "";
        string strModuleCode = "";
        string strProcessName = "";
        string strMessage = "";
        string strNotification = "";
        int UnitID = 0;
        int Enroll = 0;


        private Context _context;
        private ICommon _common;
        public RAgreementLanding(Context context,ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<AgreementType> GetAgreementType()
        {
            return _context.AgreementType.FromSqlRaw("Exec GetAgreementtype");
        }

        public IQueryable<DropDownBind> GetSalesQuotation(int type, int enroll)
        {
            SqlParameter typeid = new SqlParameter("@type", type);
            SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETSALESQUOTATION @type,@Enroll", typeid, Enroll);
        }

        public IQueryable<AgreementLandingView> GetAgreementLandingAll(int enroll,string code,int unitid)
        {
            try
            {
                if (code == "PI" || code == "SC") {
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter Code = new SqlParameter("@Code", code);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    return _context.AgreementLandingView.FromSqlRaw("Exec GetAgreementInfo @Enroll,@Code,@UnitID", Enroll, Code, UnitID);
                }
                else
                {
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter Code = new SqlParameter("@Code", code);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    return _context.AgreementLandingView.FromSqlRaw("Exec GetAgreementInfoPITOSC @Enroll,@Code,@UnitID", Enroll, Code, UnitID);
                }
               
            }
            catch (Exception ex) {
                _common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        public string EditDetailsAdd(AgreementLandingDetails sqd, string agreementtypeid, int enroll,int unitid)
        {
            if (agreementtypeid == "PI")
            {
                strModuleCode = enumSubMenu.PI00001.ToString();
                strProcessName = enumProcessName.PI.ToString();
                strMessage = enumPIMessage.PISAVE.ToString();
                strNotification = enumPINotification.PISUBMIT.ToString();
            }
            else if (agreementtypeid == "SC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCSAVE.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }
            else if (agreementtypeid == "PITOSC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCSAVE.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }
            string PROCESSID = sqd.ID.ToString();

            try
            {
                SqlParameter ID = new SqlParameter("@ID", sqd.ID);
                SqlParameter ITEMTYPEID = new SqlParameter("@ITEMTYPEID", sqd.ITEMTYPEID);
                SqlParameter itemid = new SqlParameter("@itemid", sqd.ITEMID);
                SqlParameter QUALITY = new SqlParameter("@QUALITY", sqd.QUALITY == null ? "" : sqd.QUALITY);
                SqlParameter quantity = new SqlParameter("@quantity", sqd.QUANTITY);
                SqlParameter price = new SqlParameter("@price", sqd.PRICE);
                SqlParameter SIZE = new SqlParameter("@SIZE", sqd.SIZE ?? (object)DBNull.Value);
                SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", sqd.CONSTRUCTION ?? (object)DBNull.Value);
                SqlParameter WEIGHT = new SqlParameter("@WEIGHT", sqd.WEIGHT ?? (object)DBNull.Value);
                SqlParameter SLIT = new SqlParameter("@SLIT", sqd.SLIT ?? (object)DBNull.Value);
                SqlParameter SCRIM = new SqlParameter("@SCRIM", sqd.SCRIM ?? (object)DBNull.Value);
                SqlParameter ITEMTITLE = new SqlParameter("@ITEMTITLE", sqd.ITEMTITLE ?? (object)DBNull.Value);
                SqlParameter PACKINGDETAILS = new SqlParameter("@PACKINGDETAILS", sqd.PACKINGDETAILS ?? (object)DBNull.Value);

                SqlParameter discountid = new SqlParameter("@discountid", sqd.DISCOUNTID);
                SqlParameter discountamt = new SqlParameter("@discountamt", sqd.DISCOUNT);
                SqlParameter UOMID = new SqlParameter("@UOMID", sqd.UOMID);
                SqlParameter totalamt = new SqlParameter("@totalamt", sqd.TOTALAMOUNT);
                SqlParameter descriptions = new SqlParameter("@descriptions", sqd.DESCRIPTIONS == null ? "" : sqd.DESCRIPTIONS);
                SqlParameter remarks = new SqlParameter("@remarks", sqd.REMARKS == null ? "" : sqd.REMARKS);
               
                
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", strModuleCode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", strProcessName);
                SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPINSERTPISCLINE @id,@ITEMTYPEID,@itemid,@QUALITY,@quantity,@price,@SIZE,@CONSTRUCTION,@WEIGHT,@SLIT,@SCRIM,@ITEMTITLE,@PACKINGDETAILS, @discountid,@discountamt,@uomid,@totalamt,@descriptions,@remarks,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName, @Msg output", ID, ITEMTYPEID, itemid, QUALITY, quantity, price, SIZE, CONSTRUCTION, WEIGHT, SLIT, SCRIM, ITEMTITLE, PACKINGDETAILS, discountid, discountamt, UOMID, totalamt, descriptions, remarks, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(PROCESSID, ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
            }

            return strMsg;
        }


        public string Save(AgreementLanding al, AgreementLandingDetails[] sqd)
        {
            try
            {
                if (al.AGREEMENTTYPEID == "PI")
                {
                    strModuleCode = enumSubMenu.PI00001.ToString();
                    strProcessName = enumProcessName.PI.ToString();
                    strMessage = enumPIMessage.PISAVE.ToString();
                    strNotification = enumPINotification.PISUBMIT.ToString();
                }
                else if (al.AGREEMENTTYPEID == "SC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCSAVE.ToString();
                    strNotification = enumSCNotification.SCSUBMIT.ToString();
                }
                else if (al.AGREEMENTTYPEID == "PITOSC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCSAVE.ToString();
                    strNotification = enumSCNotification.SCSUBMIT.ToString();
                }


                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMTYPEID", typeof(int));
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("SIZE", typeof(string));
                details.Columns.Add("CONSTRUCTION", typeof(string));
                details.Columns.Add("WEIGHT", typeof(string));
                details.Columns.Add("SLIT", typeof(string));
                details.Columns.Add("SCRIM", typeof(string));

                details.Columns.Add("QUALITY", typeof(string));
                details.Columns.Add("ITEMTITLE", typeof(string));
                details.Columns.Add("PACKINGDETAILS", typeof(string));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(int));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("REMARKS", typeof(string));


                for (int i = 0; i < sqd.Length; i++)
                {
                    details.Rows.Add(sqd[i].ITEMTYPEID, sqd[i].ITEMID, sqd[i].UOMID, sqd[i].SIZE, sqd[i].CONSTRUCTION, sqd[i].WEIGHT, sqd[i].SLIT, sqd[i].SCRIM, sqd[i].QUALITY, sqd[i].ITEMTITLE, sqd[i].PACKINGDETAILS, sqd[i].QUANTITY, sqd[i].PRICE, sqd[i].DISCOUNTID, sqd[i].DISCOUNT, sqd[i].TOTALAMOUNT, sqd[i].DESCRIPTIONS, sqd[i].REMARKS);
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPISCINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPISCINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter SALESQUOTATIONHEADERID = new SqlParameter("@SALESQUOTATIONHEADERID", al.SALESQUOTATIONHEADERID);
                SqlParameter AGREEMENTTYPEID = new SqlParameter("@AGREEMENTTYPEID", al.AGREEMENTTYPEID);
                SqlParameter DATE = new SqlParameter("@DATE", al.DATE == null ? "" : al.DATE);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE==null ? "":  al.EXPIREDATE);
                SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE == null ? "" : al.SHIPMENTDATE);
                SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", al.SHIPMENTMODEID);
                SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID == 0 ? 1 : al.PAYMENTTERMID);
                SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", al.DELIVERYTERMID);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter LOADINGPLACE = new SqlParameter("@LOADINGPLACE", al.LOADINGPLACE == null ? "" : al.LOADINGPLACE);
                SqlParameter DELIVERYBY = new SqlParameter("@DELIVERYBY", al.DELIVERYBY);
                SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID == 0 ? 1 : al.TOSHIPMENTCOUNTRYID);

                SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID",al.FROMSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", al.FROMSHIPMENTPORTID);
                SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", al.FROMSHIPMENTPORTID); 
               

                SqlParameter TEXTDESTINATIONPORT = new SqlParameter("@TEXTDESTINATIONPORT", al.TEXTDESTINATIONPORT==null ? "": al.TEXTDESTINATIONPORT);

                SqlParameter TARRIFCODE = new SqlParameter("@TARRIFCODE", al.TARRIFCODE==null ? "" : al.TARRIFCODE);
                SqlParameter HSCODE = new SqlParameter("@HSCODE", al.HSCODE==null ? "": al.HSCODE);
                SqlParameter BUYERREGNO = new SqlParameter("@BUYERREGNO", al.BUYERREGNO==null ? "": al.BUYERREGNO);
                SqlParameter INCOTERM = new SqlParameter("@INCOTERM",al.INTOTERM);
                SqlParameter CURRENCYID = new SqlParameter("@CURRENCYID", al.CURRENCYID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS==null ? "" : al.DESCRIPTIONS);

                SqlParameter BUYERBANKDETAILS = new SqlParameter("@BUYERBANKDETAILS", al.BUYERBANKDETAILS == null ? "" : al.BUYERBANKDETAILS);
                SqlParameter SELLERBANKID = new SqlParameter("@SELLERBANKID",al.SELLERBANKID);
                SqlParameter BUYERCOUNTRYHSCODE = new SqlParameter("@BUYERCOUNTRYHSCODE", al.BUYERCOUNTRYHSCODE == null ? "" : al.BUYERCOUNTRYHSCODE);
                SqlParameter TRANSHIPMENT = new SqlParameter("@TRANSHIPMENT", al.TRANSHIPMENT);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter ORIGINOFCOUNTRY = new SqlParameter("@ORIGINOFCOUNTRY", al.ORIGINOFCOUNTRY == null ? "" : al.ORIGINOFCOUNTRY);
                SqlParameter BUYERORDERCONFIRMDATE = new SqlParameter("@BUYERORDERCONFIRMDATE", al.BUYERORDERCONFIRMDATE == null ? "" : al.BUYERORDERCONFIRMDATE);
                SqlParameter NOTIFYPARTY = new SqlParameter("@NOTIFYPARTY", al.NOTIFYPARTY == null ? "" : al.NOTIFYPARTY);
                SqlParameter OTHERSPAYTERM = new SqlParameter("@OTHERSPAYTERM", al.OTHERSPAYTERM == null ? "" : al.OTHERSPAYTERM);


                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", strModuleCode);
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", strProcessName);
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", strMessage);
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", strNotification);
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.VarChar,
                    Direction = System.Data.ParameterDirection.Output
                };

                StringWriter sw;
                using (sw = new StringWriter())
                {
                    //master.WriteXml(sw);
                    details.WriteXml(sw);
                }

                _context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @TYPEPISCINSERTLINE,@SALESQUOTATIONHEADERID,@AGREEMENTTYPEID,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output,@TEXTDESTINATIONPORT",
                detailsparam, SALESQUOTATIONHEADERID, AGREEMENTTYPEID, DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONS, BUYERBANKDETAILS, SELLERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam, TEXTDESTINATIONPORT);

                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @TYPEPISCINSERTLINE,@SALESQUOTATIONHEADERID,@AGREEMENTTYPEID,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output,@TEXTDESTINATIONPORT",
                //  detailsparam, SALESQUOTATIONHEADERID, AGREEMENTTYPEID,DATE,EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID,DELIVERYTERMID,TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE,BUYERREGNO, INCOTERM,CURRENCYID,DESCRIPTIONS,BUYERBANKDETAILS, SELLERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY,OTHERSPAYTERM,MODULECODE, UNITID, ENROLL, DOCSTATUS,ProcessName,MsgStatus,NOTIFICATION, LOG,  outParam, TEXTDESTINATIONPORT);
                ////_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }


        //public IQueryable<AgreementLandingView> EditByMasterID(int headerid, int unitid, int enroll)
        public IQueryable<AgreementMasterEditView> EditByMasterID(int headerid, int unitid, int enroll)
        {
            try
            {
                int id = 6;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //return _context.AgreementLandingView.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                return _context.AgreementMasterEditView.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
            }
            catch(Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.PI00001.ToString(), enumProcessName.PI.ToString(), unitid, enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<AgreementLandingDetails> EditByDetailsID(int headerid)
        {
            try
            {
                //int id = 1;
                int id = 1;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID
                return _context.AgreementLandingDetails.FromSqlRaw("Exec SPMERGEVIEWPISC @id,@headerid", ID, HeaderID);
            }
            catch (Exception) { }
            finally { }
            return null;
        }

        public IQueryable<AgreementLandingDetails> EditByDetailsPI(int headerid)
        {
            try
            {
                //int id = 1;
                int id = 3;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID
                return _context.AgreementLandingDetails.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
            }
            catch (Exception) { }
            finally { }
            return null;
        }

        public IQueryable<AgreementLandingDetails> GetSalesQuotationLine(int headerid, string alpha)
        {
            try
            {
                if(alpha=="SQ")
                {
                    int id = 5;
                    SqlParameter ID = new SqlParameter("@id", id);
                    SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                    //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                    return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                }
                //else if(alpha=="PI")
                //{
                //    int id = 3;
                //    SqlParameter ID = new SqlParameter("@id", id);
                //    SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //    return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                //}
            }
            catch( Exception) { }
            finally
            { }
            return null;
        }

        public IQueryable<SalesQuotationHeaderAggrigation> GetSalesQuotationHeader(int headerid, string alpha)
        {
            try
            {
                if (alpha == "SQ")
                {
                    int id = 4;
                    SqlParameter ID = new SqlParameter("@id", id);
                    SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                    //return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                    return _context.SalesQuotationHeaderAggrigation.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                }
                //else if(alpha=="PI")
                //{
                //    int id = 3;
                //    SqlParameter ID = new SqlParameter("@id", id);
                //    SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

                //    return _context.AgreementLandingDetails.FromSqlRaw("Exec GETAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
                //}
            }
            catch (Exception) { }
            finally
            { }
            return null;
        }

        public string Update(AgreementLanding al)
        {
            try
            {
                if (al.AGREEMENTTYPEID == "PI")
                {
                    strModuleCode = enumSubMenu.PI00001.ToString();
                    strProcessName = enumProcessName.PI.ToString();
                    strMessage = enumPIMessage.PIEDIT.ToString();
                    strNotification = enumPINotification.PISUBMIT.ToString();
                }
                else if (al.AGREEMENTTYPEID == "SC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCEDIT.ToString();
                    strNotification = enumSCNotification.SCSUBMIT.ToString();
                }
                else if (al.AGREEMENTTYPEID == "PITOSC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCSAVE.ToString();
                    strNotification = enumSCNotification.SCSUBMIT.ToString();
                }

                SqlParameter ID = new SqlParameter("@ID", al.ID);
                SqlParameter SALESQUOTATIONHEADERID = new SqlParameter("@SALESQUOTATIONHEADERID", al.SALESQUOTATIONHEADERID);
                SqlParameter AGREEMENTTYPEID = new SqlParameter("@AGREEMENTTYPEID", al.AGREEMENTTYPEID);
                SqlParameter DATE = new SqlParameter("@DATE", al.DATE == null ? "" : al.DATE);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
                SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE == null ? "" : al.SHIPMENTDATE);
                SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", al.SHIPMENTMODEID);
                SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID);
                SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", al.DELIVERYTERMID);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID", al.FROMSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", al.FROMSHIPMENTPORTID);
                SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", al.TODISCHARGEPORT);
                SqlParameter TARRIFCODE = new SqlParameter("@TARRIFCODE", al.TARRIFCODE == null ? "" : al.TARRIFCODE);
                SqlParameter HSCODE = new SqlParameter("@HSCODE", al.HSCODE == null ? "" : al.HSCODE);
                SqlParameter BUYERREGNO = new SqlParameter("@BUYERREGNO", al.BUYERREGNO == null ? "" : al.BUYERREGNO);
                SqlParameter INCOTERM = new SqlParameter("@INCOTERM", al.INTOTERM);
                SqlParameter CURRENCYID = new SqlParameter("@CURRENCYID", al.CURRENCYID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);

                SqlParameter BUYERBANKDETAILS = new SqlParameter("@BUYERBANKDETAILS", al.BUYERBANKDETAILS == null ? "" : al.BUYERBANKDETAILS);
                SqlParameter SELLERBANKID = new SqlParameter("@SELLERBANKID", al.SELLERBANKID);
                SqlParameter BUYERCOUNTRYHSCODE = new SqlParameter("@BUYERCOUNTRYHSCODE", al.BUYERCOUNTRYHSCODE == null ? "" : al.BUYERCOUNTRYHSCODE);
                SqlParameter TRANSHIPMENT = new SqlParameter("@TRANSHIPMENT", al.TRANSHIPMENT);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter ORIGINOFCOUNTRY = new SqlParameter("@ORIGINOFCOUNTRY", al.ORIGINOFCOUNTRY == null ? "" : al.ORIGINOFCOUNTRY);
                SqlParameter BUYERORDERCONFIRMDATE = new SqlParameter("@BUYERORDERCONFIRMDATE", al.BUYERORDERCONFIRMDATE == null ? "" : al.BUYERORDERCONFIRMDATE);
                SqlParameter NOTIFYPARTY = new SqlParameter("@NOTIFYPARTY", al.NOTIFYPARTY == null ? "" : al.NOTIFYPARTY);
                SqlParameter OTHERSPAYTERM = new SqlParameter("@OTHERSPAYTERM", al.OTHERSPAYTERM == null ? "" : al.OTHERSPAYTERM);


                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", strModuleCode);
                SqlParameter Enroll = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ProcessCode = new SqlParameter("@PROCESSNAME", strProcessName);
                SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);
                SqlParameter Notification = new SqlParameter("@Notification", strNotification);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEPISC @ID,@SALESQUOTATIONHEADERID,@AGREEMENTTYPEID,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM, @MODULECODE,@ENROLL,@UNITID,@PROCESSNAME,@MessageName,@Notification,@Msg output",
                           ID, SALESQUOTATIONHEADERID, AGREEMENTTYPEID, DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONS,BUYERBANKDETAILS, SELLERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, ModuleCode, Enroll, UNITID, ProcessCode, MessageName,Notification,outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch(Exception ex) {
                _common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, al.UNITID, al.DOCUMENTCREATEDBY, "");
            }    
            finally { }

            return null;
        }

        public string UpdatePIDetailsByID(AgreementLandingDetails sqd,string agreementtypeid,int unitid,int enroll)
        {
            try
            {
                if (agreementtypeid == "PI")
                {
                    strModuleCode = enumSubMenu.PI00001.ToString();
                    strProcessName = enumProcessName.PI.ToString();
                    strMessage = enumPIMessage.PIEDIT.ToString();
                    strNotification = enumPINotification.PIESUBMIT.ToString();
                }
                else if (agreementtypeid == "SC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCEDIT.ToString();
                    strNotification = enumSCNotification.SCESSUBMIT.ToString();
                }
                else if (agreementtypeid == "PITOSC")
                {
                    strModuleCode = enumSubMenu.SC00001.ToString();
                    strProcessName = enumProcessName.SC.ToString();
                    strMessage = enumSCMessage.SCSAVE.ToString();
                    strNotification = enumSCNotification.SCSUBMIT.ToString();
                }
                string PROCESSID = sqd.ID.ToString();
                try
                {
                    SqlParameter id = new SqlParameter("@id", sqd.ID);
                    SqlParameter ITEMTYPEID = new SqlParameter("@ITEMTYPEID", sqd.ITEMTYPEID);
                    SqlParameter itemid = new SqlParameter("@itemid", sqd.ITEMID);
                    SqlParameter QUALITY = new SqlParameter("@QUALITY", sqd.QUALITY == null ? "" : sqd.QUALITY);
                    SqlParameter quantity = new SqlParameter("@quantity", sqd.QUANTITY);
                    SqlParameter price = new SqlParameter("@price", sqd.PRICE);
                    SqlParameter SIZE = new SqlParameter("@SIZE", sqd.SIZE ?? (object)DBNull.Value);
                    SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", sqd.CONSTRUCTION ?? (object)DBNull.Value);
                    SqlParameter WEIGHT = new SqlParameter("@WEIGHT", sqd.WEIGHT ?? (object)DBNull.Value);
                    SqlParameter SLIT = new SqlParameter("@SLIT", sqd.SLIT ?? (object)DBNull.Value);
                    SqlParameter SCRIM = new SqlParameter("@SCRIM", sqd.SCRIM ?? (object)DBNull.Value);
                    SqlParameter ITEMTITLE = new SqlParameter("@ITEMTITLE", sqd.ITEMTITLE ?? (object)DBNull.Value);
                    SqlParameter PACKINGDETAILS = new SqlParameter("@PACKINGDETAILS", sqd.PACKINGDETAILS ?? (object)DBNull.Value);

                    SqlParameter discountid = new SqlParameter("@discountid", sqd.DISCOUNTID);
                    SqlParameter discountamt = new SqlParameter("@discountamt", sqd.DISCOUNT);
                    SqlParameter UOMID = new SqlParameter("@UOMID", sqd.UOMID);
                    SqlParameter totalamt = new SqlParameter("@totalamt", sqd.TOTALAMOUNT);
                    SqlParameter descriptions = new SqlParameter("@descriptions", sqd.DESCRIPTIONS == null ? "" : sqd.DESCRIPTIONS);
                    SqlParameter remarks = new SqlParameter("@remarks", sqd.REMARKS == null ? "" : sqd.REMARKS);
                    //SqlParameter FROMSHIPMENTSCHEDULEDATE = new SqlParameter("@FROMSHIPMENTSCHEDULEDATE", sqd.FROMSHIPMENTSCHEDULEDATE == null ? "" : sqd.FROMSHIPMENTSCHEDULEDATE);
                    //SqlParameter TOSHIPMENTSCHEDULEDATE = new SqlParameter("@TOSHIPMENTSCHEDULEDATE", sqd.TOSHIPMENTSCHEDULEDATE == null ? "" : sqd.TOSHIPMENTSCHEDULEDATE);

                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    SqlParameter ModuleCode = new SqlParameter("@ModuleCode", strModuleCode);
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter ProcessCode = new SqlParameter("@ProcessCode", strProcessName);
                    SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);

                    var outParam = new SqlParameter
                    {
                        ParameterName = "@Msg",
                        Size = 100,
                        SqlDbType = System.Data.SqlDbType.Char,
                        Direction = System.Data.ParameterDirection.Output
                    };

                    _context.Database.ExecuteSqlRaw("Exec SPUpdatePIDetailsByID @id,@ITEMTYPEID,@itemid,@QUALITY,@quantity,@price,@SIZE,@CONSTRUCTION,@WEIGHT,@SLIT,@SCRIM,@ITEMTITLE,@PACKINGDETAILS, @discountid,@discountamt,@uomid,@totalamt,@descriptions,@remarks,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName, @Msg output", id, ITEMTYPEID, itemid,QUALITY, quantity, price,SIZE,CONSTRUCTION,WEIGHT,SLIT,SCRIM,ITEMTITLE,PACKINGDETAILS, discountid, discountamt,UOMID, totalamt, descriptions, remarks, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                    strMsg = outParam.Value.ToString();
                }
                catch (Exception ex)
                {
                    _common.ErrorLog(PROCESSID, ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
                }

                return strMsg;
            }
            catch(Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, UnitID, Enroll, "");
            }
            finally { }
            return null;
        }
        public string DeletePIMasterByID(int id,int enroll,int unitid, string aggtypeid)
        {
            if (aggtypeid == "PI")
            {
                strModuleCode = enumSubMenu.PI00001.ToString();
                strProcessName = enumProcessName.PI.ToString();
                strMessage = enumPIMessage.PIDEL.ToString();
                strNotification = enumPINotification.PISUBMIT.ToString();
            }
            else if (aggtypeid == "SC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCDEL.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }
            else if (aggtypeid == "PITOSC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCSAVE.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", strModuleCode);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", strProcessName);
                SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDeletePIMasterByID @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), unitid, enroll, "");
            }
            finally { }

            return strMsg;
        }
        public string DeletePIDetailsByID(int id, string aggtypeid, int enroll, int unitid)
        {
            if (aggtypeid == "PI")
            {
                strModuleCode = enumSubMenu.PI00001.ToString();
                strProcessName = enumProcessName.PI.ToString();
                strMessage = enumPIMessage.PIDEL.ToString();
                strNotification = enumPINotification.PISUBMIT.ToString();
            }
            else if (aggtypeid == "SC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCDEL.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }
            else if (aggtypeid == "SC")
            {
                strModuleCode = enumSubMenu.SC00001.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessage = enumSCMessage.SCDEL.ToString();
                strNotification = enumSCNotification.SCSUBMIT.ToString();
            }

            strMsg = id.ToString();
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", strModuleCode);
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", strProcessName);
                SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDeleteAggrementDetailsByID @id,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName,@Msg output", ID, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
            }

            return strMsg;

  
        }

     
    }
}

