using ExcelDataReader;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.QuotationService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Diagnostics;


namespace ImportExport.UI.Repository.QuotationRepository
{
    public class RQuotationLanding : IQuotationLanding
    {
        private Context _context;
        private ICommon _common;
        string strMsg = "";

        public RQuotationLanding(Context context, ICommon common)
        {
            _context = context;
            _common = common;
        }


        public IQueryable<DropDownBind> GetQuotationList()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETQUOTATIONLIST");
        }

        public IQueryable<PILandingView> GetProformaInvoice(int typeid, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
        //    var li = _context.PILandingView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAX @TYPEID,@ENROLL", TYPEID, ENROLL);
            return _context.PILandingView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAX @TYPEID,@ENROLL", TYPEID, ENROLL);
        }


        public IQueryable<PIReportHeader> GetHeaderPrint(int id, int typeid)
        {
           
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.PIReportHeader.FromSqlRaw("Exec SPGETPIINFOHEADER @TYPEID,@ID", TYPEID, ID);
        }

        public IQueryable<PIReportLine> GetLinePrint(int id)
        {
            int typeid = 1;
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.PIReportLine.FromSqlRaw("Exec SPGETPIINFOLINE @TYPEID,@ID", TYPEID, ID);
        }

        public IQueryable<QuotationLandingView> GetSalesQuotation(int typeid, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.QuotationLandingView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAX @TYPEID,@ENROLL", TYPEID, ENROLL);
        }

        public IQueryable<SpotOrderView> GetSpotOrder(int typeid, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.SpotOrderView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAX @TYPEID,@ENROLL", TYPEID, ENROLL);
        }

        public IQueryable<ConditionalApprovalView> GetConditionalApproval(int typeid, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.ConditionalApprovalView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAX @TYPEID,@ENROLL", TYPEID, ENROLL);
        }


        public string SavePI(PILanding al, PILandingDetails[] ald, Hscodes[] HS)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" }; 
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
             
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));

                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;



                DataTable hsdetails = new DataTable { TableName = "hsDetails" };
                hsdetails.Columns.Add("HSCODE", typeof(string));

                for (int i = 0; i < HS.Length; i++)
                {
                    hsdetails.Rows.Add(HS[i].HSCODE);
                }

                SqlParameter hsdetailsparam = new SqlParameter();
                hsdetailsparam.ParameterName = "@TYPEHSQUOTATIONINSERTLINE";
                hsdetailsparam.SqlDbType = SqlDbType.Structured;
                hsdetailsparam.TypeName = "TYPEHSQUOTATIONINSERTLINE";
                hsdetailsparam.SqlValue = hsdetails;


                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter OCFID = new SqlParameter("@OCFID", al.OCFID);
                SqlParameter PITYPEID = new SqlParameter("@PITYPEID", al.PITYPEID);
                SqlParameter OCFNO = new SqlParameter("@OCFNO", al.OCFNO == null ? "" : al.OCFNO);
                SqlParameter ORDERREFNO = new SqlParameter("@ORDERREFNO", al.ORDERREFNO == null ? "" : al.ORDERREFNO);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", al.CUSTOMERID);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);
                
                SqlParameter DATE = new SqlParameter("@DATE", al.DATE == null ? "" : al.DATE);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
                SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE == null ? "" : al.SHIPMENTDATE);
                SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", al.SHIPMENTMODEID);
                SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID);
                SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", al.DELIVERYTERMID);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter LOADINGPLACE = new SqlParameter("@LOADINGPLACE", al.LOADINGPLACE == null ? "" : al.LOADINGPLACE);
                SqlParameter DELIVERYBY = new SqlParameter("@DELIVERYBY", al.DELIVERYBY);
                SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID", al.FROMSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", al.FROMSHIPMENTPORTID);
                SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", al.TODISCHARGEPORT == null ? "" : al.TODISCHARGEPORT);
                SqlParameter TARRIFCODE = new SqlParameter("@TARRIFCODE", al.TARRIFCODE == null ? "" : al.TARRIFCODE);
                SqlParameter HSCODE = new SqlParameter("@HSCODE", al.HSCODE == null ? "" : al.HSCODE);
                SqlParameter BUYERREGNO = new SqlParameter("@BUYERREGNO", al.BUYERREGNO == null ? "" : al.BUYERREGNO);
                SqlParameter INCOTERM = new SqlParameter("@INCOTERM", al.INTOTERM==null ? "" : al.INTOTERM);
                SqlParameter CURRENCYID = new SqlParameter("@CURRENCYID", al.CURRENCYID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);

                SqlParameter BUYERBANKDETAILS = new SqlParameter("@BUYERBANKDETAILS", al.BUYERBANKDETAILS == null ? "" : al.BUYERBANKDETAILS);
                SqlParameter SELLERBANKID = new SqlParameter("@SELLERBANKID", al.SELLERBANKID == null ? "" : al.SELLERBANKID);
                SqlParameter BUYERBANKID = new SqlParameter("@BUYERBANKID", al.BUYERBANKID == null ? "" : al.BUYERBANKID);
                SqlParameter BUYERCOUNTRYHSCODE = new SqlParameter("@BUYERCOUNTRYHSCODE", al.BUYERCOUNTRYHSCODE == null ? "" : al.BUYERCOUNTRYHSCODE);
                SqlParameter TRANSHIPMENT = new SqlParameter("@TRANSHIPMENT", al.TRANSHIPMENT);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter ORIGINOFCOUNTRY = new SqlParameter("@ORIGINOFCOUNTRY", al.ORIGINOFCOUNTRY == null ? "" : al.ORIGINOFCOUNTRY);
                SqlParameter BUYERORDERCONFIRMDATE = new SqlParameter("@BUYERORDERCONFIRMDATE", al.BUYERORDERCONFIRMDATE == null ? "" : al.BUYERORDERCONFIRMDATE);
                SqlParameter NOTIFYPARTY = new SqlParameter("@NOTIFYPARTY", al.NOTIFYPARTY == null ? "" : al.NOTIFYPARTY);
                SqlParameter OTHERSPAYTERM = new SqlParameter("@OTHERSPAYTERM", al.OTHERSPAYTERM == null ? "" : al.OTHERSPAYTERM);

                SqlParameter FREEINCOTERM = new SqlParameter("@FREEINCOTERM", al.FREEINCOTERM == null ? "" : al.FREEINCOTERM);
                SqlParameter FREEPAYMENTTERM = new SqlParameter("@FREEPAYMENTTERM", al.FREEPAYMENTTERM == null ? "" : al.FREEPAYMENTTERM);
                SqlParameter TOLARENCEID = new SqlParameter("@TOLARENCEID", al.TOLARENCEID == null ? 0 : al.TOLARENCEID);
                SqlParameter DELPOINTID = new SqlParameter("@DELPOINTID", al.DELPOINTID == null ? 0 : al.DELPOINTID);
                SqlParameter DISCHARGEPLACE = new SqlParameter("@DISCHARGEPLACE", al.DISCHARGEPLACE == null ? 0 : al.DISCHARGEPLACE);
                

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONSAVEPI @TYPEQUOTATIONINSERTLINE,@DISCHARGEPLACE,@ORDERREFNO,@TYPEHSQUOTATIONINSERTLINE,@PITYPEID,@QUOTATIONTYPEID,@OCFID,@OCFNO,@CUSTOMERID,@ISEXCEL,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@FREEINCOTERM,@FREEPAYMENTTERM,@TOLARENCEID,@DELPOINTID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, DISCHARGEPLACE, ORDERREFNO, hsdetailsparam, PITYPEID, QUOTATIONTYPEID, OCFID, OCFNO,CUSTOMERID, ISEXCEL,  DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONS, BUYERBANKDETAILS, SELLERBANKID,BUYERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, SALESTYPEID, CREDITTYPEID, CREDITDAYS, FREEINCOTERM, FREEPAYMENTTERM, TOLARENCEID, DELPOINTID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                  strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string SaveSQ(SQuatationLanding al, PILandingDetails[] ald)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;

                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter OCFID = new SqlParameter("@OCFID", al.OCFID);
                SqlParameter OCFNO = new SqlParameter("@OCFNO", al.OCFNO == null ? "" : al.OCFNO);
                SqlParameter SQTYPEID = new SqlParameter("@SQTYPEID", al.SQTYPEID);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", al.CUSTOMERID);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONSAVESQ @TYPEQUOTATIONINSERTLINE,@QUOTATIONTYPEID,@OCFID,@OCFNO, @SQTYPEID,@CUSTOMERID,@ISEXCEL,@EXPIREDATE,@DESCRIPTIONS,@TERMSCONDITION,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, QUOTATIONTYPEID, OCFID,OCFNO, SQTYPEID, CUSTOMERID, ISEXCEL, EXPIREDATE,DESCRIPTIONS,TERMSCONDITION, SALESTYPEID, CREDITTYPEID, CREDITDAYS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }
        public string SaveConApp(ConditionalApproval al, PILandingDetails[] ald)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;

                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter OCFID = new SqlParameter("@OCFID", al.OCFID);
                SqlParameter OCFNO = new SqlParameter("@OCFNO", al.OCFNO == null ? "" : al.OCFNO);

                SqlParameter WHID = new SqlParameter("@WHID", al.WHID);
                SqlParameter CONAPPSTATRDATE = new SqlParameter("@CONAPPSTATRDATE", al.CONAPPSTATRDATE == null ? "" : al.CONAPPSTATRDATE);
                SqlParameter CONAPPENDDATE = new SqlParameter("@CONAPPENDDATE", al.CONAPPENDDATE == null ? "" : al.CONAPPENDDATE);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", al.CUSTOMERID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPSAVECONDITIONALAPPROVAL @TYPEQUOTATIONINSERTLINE,@QUOTATIONTYPEID,@CUSTOMERID,@OCFID,@OCFNO,@WHID,@CONAPPSTATRDATE,@CONAPPENDDATE,@ISEXCEL,@DESCRIPTIONS,@TERMSCONDITION,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, QUOTATIONTYPEID, CUSTOMERID, OCFID, OCFNO, WHID, CONAPPSTATRDATE,CONAPPENDDATE, ISEXCEL, DESCRIPTIONS, TERMSCONDITION, SALESTYPEID, CREDITTYPEID, CREDITDAYS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }
        public string SaveSpot(SpotOrder al, PILandingDetails[] ald)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;

                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter OCFID = new SqlParameter("@OCFID", al.OCFID);
                SqlParameter OCFNO = new SqlParameter("@OCFNO", al.OCFNO == null ? "" : al.OCFNO);

                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", al.CUSTOMERID);
                SqlParameter SPOTDATE = new SqlParameter("@SPOTDATE", al.SPOTDATE);
                SqlParameter LASTDATEOFDO = new SqlParameter("@LASTDATEOFDO", al.LASTDATEOFDO);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONSAVESPOT @TYPEQUOTATIONINSERTLINE,@QUOTATIONTYPEID,@OCFID,@OCFNO,@CUSTOMERID,@SPOTDATE,@LASTDATEOFDO,@ISEXCEL,@DESCRIPTIONS,@TERMSCONDITION,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, QUOTATIONTYPEID, OCFID, OCFNO, CUSTOMERID, SPOTDATE, LASTDATEOFDO, ISEXCEL, DESCRIPTIONS, TERMSCONDITION,SALESTYPEID,CREDITTYPEID,CREDITDAYS,MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }
        public IQueryable<CustomerInfo> GetCustomerInfo(string prefix, int unitid)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            SqlParameter Unitid = new SqlParameter("@Unitid", unitid);
            return _context.CustomerInfo.FromSqlRaw("Exec GetQTCustomerInfo @Prefix,@Unitid", Prefix, Unitid);
        }

        public IQueryable<PILandingView> GetProformaInvoiceView(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.PILandingView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAXVIEW @TYPEID,@ID,@ENROLL", TYPEID,ID,ENROLL);
        }

        public IQueryable<QuotationLandingView> GetSalesQuotationView(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.QuotationLandingView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAXVIEW @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<SpotOrderView> GetSpotOrderView(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.SpotOrderView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAXVIEW @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<ConditionalApprovalView> GetConditionalApprovalView(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.ConditionalApprovalView.FromSqlRaw("Exec SPGETQUOTATIONDATABIAXVIEW @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<OCFListView> GetOCFList(int type)
        {
            SqlParameter TYPE = new SqlParameter("@type", type);

            return _context.OCFListView.FromSqlRaw("Exec SPGETOCFPILIST @TYPE", TYPE);
        }

        public IQueryable<OCFListView> GetOCFItems(int id)
        {
            int type = 1;
            SqlParameter TYPE = new SqlParameter("@TYPE", type);
            SqlParameter ID = new SqlParameter("@ID", id);

            return _context.OCFListView.FromSqlRaw("Exec SPGETOCFITEMS @TYPE,@ID", TYPE, ID);
        }

        public string DeletePIMasterByID(int id, int enroll, int unitid, string aggtypeid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.QUO.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumQuotationMessage.QUODEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONDELETEBYMASTERID @ID,@DOCUMENTCREATEDBY,@UNITID,@MODULECODE,@PROCESSCODE,@MESSAGENAME,@MSG output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex) { }
            finally { 
            
            }
            
            return strMsg;
        }

        public string ESaveLine(PILandingDetails[] ald,int ID, int unitid, int enroll)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter QUOTATIONID = new SqlParameter("@QUOTATIONID", ID);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOSAVE.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPINSERTQUOTATIONLINE @TYPEQUOTATIONINSERTLINE,@QUOTATIONID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, QUOTATIONID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string UpdatePI(PILanding al)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", al.ID);
                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter CUSTOMERID = new SqlParameter("@CUSTOMERID", al.CUSTOMERID);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);
                SqlParameter PITYPEID = new SqlParameter("@PITYPEID", al.PITYPEID);

                SqlParameter DATE = new SqlParameter("@DATE", al.DATE == null ? "" : al.DATE);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
                SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE == null ? "" : al.SHIPMENTDATE);
                SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", al.SHIPMENTMODEID);
                SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID);
                SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", al.DELIVERYTERMID);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter LOADINGPLACE = new SqlParameter("@LOADINGPLACE", al.LOADINGPLACE == null ? "" : al.LOADINGPLACE);
                SqlParameter DELIVERYBY = new SqlParameter("@DELIVERYBY", al.DELIVERYBY);
                SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID", al.FROMSHIPMENTCOUNTRYID);
                SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", al.FROMSHIPMENTPORTID);
                SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", al.TODISCHARGEPORT==null ? "" : al.TODISCHARGEPORT);
                SqlParameter TARRIFCODE = new SqlParameter("@TARRIFCODE", al.TARRIFCODE == null ? "" : al.TARRIFCODE);
                SqlParameter HSCODE = new SqlParameter("@HSCODE", al.HSCODE == null ? "" : al.HSCODE);
                SqlParameter BUYERREGNO = new SqlParameter("@BUYERREGNO", al.BUYERREGNO == null ? "" : al.BUYERREGNO);
                SqlParameter INCOTERM = new SqlParameter("@INCOTERM", al.INTOTERM == null ? "" : al.INTOTERM);
                SqlParameter CURRENCYID = new SqlParameter("@CURRENCYID", al.CURRENCYID);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);

                SqlParameter BUYERBANKDETAILS = new SqlParameter("@BUYERBANKDETAILS", al.BUYERBANKDETAILS == null ? "" : al.BUYERBANKDETAILS);
                SqlParameter SELLERBANKID = new SqlParameter("@SELLERBANKID", al.SELLERBANKID);

                SqlParameter BUYERBANKID = new SqlParameter("@BUYERBANKID", al.BUYERBANKID);

                SqlParameter BUYERCOUNTRYHSCODE = new SqlParameter("@BUYERCOUNTRYHSCODE", al.BUYERCOUNTRYHSCODE == null ? "" : al.BUYERCOUNTRYHSCODE);
                SqlParameter TRANSHIPMENT = new SqlParameter("@TRANSHIPMENT", al.TRANSHIPMENT);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", al.PARTIALSHIPMENT);
                SqlParameter ORIGINOFCOUNTRY = new SqlParameter("@ORIGINOFCOUNTRY", al.ORIGINOFCOUNTRY == null ? "" : al.ORIGINOFCOUNTRY);
                SqlParameter BUYERORDERCONFIRMDATE = new SqlParameter("@BUYERORDERCONFIRMDATE", al.BUYERORDERCONFIRMDATE == null ? "" : al.BUYERORDERCONFIRMDATE);
                SqlParameter NOTIFYPARTY = new SqlParameter("@NOTIFYPARTY", al.NOTIFYPARTY == null ? "" : al.NOTIFYPARTY);
                SqlParameter OTHERSPAYTERM = new SqlParameter("@OTHERSPAYTERM", al.OTHERSPAYTERM == null ? "" : al.OTHERSPAYTERM);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);


                SqlParameter FREEINCOTERM = new SqlParameter("@FREEINCOTERM", al.FREEINCOTERM == null ? "" : al.FREEINCOTERM);
                SqlParameter FREEPAYMENTTERM = new SqlParameter("@FREEPAYMENTTERM", al.FREEPAYMENTTERM == null ? "" : al.FREEPAYMENTTERM);
                SqlParameter TOLARENCEID = new SqlParameter("@TOLARENCEID", al.TOLARENCEID == null ? "" : al.TOLARENCEID);
                SqlParameter DELPOINTID = new SqlParameter("@DELPOINTID", al.DELPOINTID == null ? "" : al.DELPOINTID);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };
                

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONUPDATEPI @ID,@PITYPEID,@QUOTATIONTYPEID,@CUSTOMERID,@ISEXCEL,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@FREEINCOTERM,@FREEPAYMENTTERM,@TOLARENCEID,@DELPOINTID, @MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  QUOTATIONTYPEID, PITYPEID, ID, CUSTOMERID, ISEXCEL, DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONS, BUYERBANKDETAILS, SELLERBANKID,BUYERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, SALESTYPEID, CREDITTYPEID, CREDITDAYS, FREEINCOTERM, FREEPAYMENTTERM, TOLARENCEID, DELPOINTID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string UpdateSQ(SQuatationLanding al)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", al.ID);
                SqlParameter SQTYPEID = new SqlParameter("@SQTYPEID", al.SQTYPEID);
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONUPDATESQ @ID,@SQTYPEID,@EXPIREDATE,@DESCRIPTIONS,@TERMSCONDITION,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS, @MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  ID, SQTYPEID,EXPIREDATE, DESCRIPTIONS, TERMSCONDITION, SALESTYPEID, CREDITTYPEID, CREDITDAYS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string UpdateConApp(ConditionalApproval al)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", al.ID);
                SqlParameter QUOTATIONTYPEID = new SqlParameter("@QUOTATIONTYPEID", al.QUOTATIONTYPEID);
                SqlParameter WHID = new SqlParameter("@WHID", al.WHID);
                SqlParameter CONAPPSTATRDATE = new SqlParameter("@CONAPPSTATRDATE", al.CONAPPSTATRDATE == null ? "" : al.CONAPPSTATRDATE);
                SqlParameter CONAPPENDDATE = new SqlParameter("@CONAPPENDDATE", al.CONAPPENDDATE == null ? "" : al.CONAPPENDDATE);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);

                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONUPDATECONAPP @ID,@QUOTATIONTYPEID,@WHID,@CONAPPSTATRDATE,@CONAPPENDDATE,@DESCRIPTIONS,@TERMSCONDITION,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  ID, QUOTATIONTYPEID, WHID, CONAPPSTATRDATE, CONAPPENDDATE, DESCRIPTIONS, TERMSCONDITION, SALESTYPEID, CREDITTYPEID, CREDITDAYS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string UpdateSpot(SpotOrder al)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", al.ID);
                SqlParameter SPOTDATE = new SqlParameter("@SPOTDATE", al.SPOTDATE == null ? "" : al.SPOTDATE);
                SqlParameter LASTDATEOFDO = new SqlParameter("@LASTDATEOFDO", al.LASTDATEOFDO == null ? "" : al.LASTDATEOFDO);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", al.DESCRIPTIONS == null ? "" : al.DESCRIPTIONS);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
                SqlParameter ISEXCEL = new SqlParameter("@ISEXCEL", al.ISEXCEL);


                SqlParameter SALESTYPEID = new SqlParameter("@SALESTYPEID", al.SALESTYPEID);
                SqlParameter CREDITTYPEID = new SqlParameter("@CREDITTYPEID", al.CREDITTYPEID);
                SqlParameter CREDITDAYS = new SqlParameter("@CREDITDAYS", al.CREDITDAYS == null ? "" : al.CREDITDAYS);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
                SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOSUBMIT.ToString());
                SqlParameter LOG = new SqlParameter("@Log", "");

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };


                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONUPDATESPOT @ID,@SPOTDATE,@LASTDATEOFDO,@DESCRIPTIONS,@TERMSCONDITION,@ISEXCEL,@SALESTYPEID,@CREDITTYPEID,@CREDITDAYS,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  ID, SPOTDATE, LASTDATEOFDO, DESCRIPTIONS, TERMSCONDITION, ISEXCEL, SALESTYPEID, CREDITTYPEID, CREDITDAYS, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }


        public string UpdateLine(PILandingDetails[] ald,int ID, int unitid, int enroll)
        {
            try
            {
                DataTable details = new DataTable { TableName = "Details" };
                details.Columns.Add("ITEMID", typeof(int));
                details.Columns.Add("QUANTITY", typeof(decimal));
                details.Columns.Add("PRICE", typeof(decimal));
                details.Columns.Add("DISCOUNTID", typeof(decimal));
                details.Columns.Add("DISCOUNT", typeof(decimal));
                details.Columns.Add("VATID", typeof(int));
                details.Columns.Add("VATAMOUNT", typeof(decimal));
                details.Columns.Add("TOTALAMOUNT", typeof(decimal));
                details.Columns.Add("TOLERANCEID", typeof(int));
                details.Columns.Add("REMARKS", typeof(string));
                details.Columns.Add("DESCRIPTIONS", typeof(string));
                details.Columns.Add("FROMSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("TOSHIPMENTSCHEDULEDATE", typeof(string));
                details.Columns.Add("SHIPMENTMARK", typeof(string));
                details.Columns.Add("HSCODE", typeof(string));


                details.Columns.Add("UOMID", typeof(int));
                details.Columns.Add("THIKNESS", typeof(decimal));
                details.Columns.Add("WIDTH", typeof(decimal));
                details.Columns.Add("LENGTH", typeof(decimal));
                details.Columns.Add("TREATMENTLEVEL", typeof(string));
                details.Columns.Add("TREATMENTDIRECTIONID", typeof(int));
                details.Columns.Add("COREID", typeof(int));
                details.Columns.Add("REALOD", typeof(string));
                details.Columns.Add("DISEREDDATEOFDELIVERY", typeof(string));
                details.Columns.Add("TENTATIVEDATEOFDELIVERY", typeof(string));

                details.Columns.Add("TOTALWT", typeof(decimal));
                details.Columns.Add("ROLLLENGTH", typeof(decimal));
                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(ald[i].ITEMID, ald[i].QUANTITY, ald[i].PRICE, ald[i].DISCOUNTID, ald[i].DISCOUNT, ald[i].VATID, ald[i].VATAMOUNT, ald[i].TOTALAMOUNT, ald[i].TOLERANCEID, ald[i].REMARKS, ald[i].DESCRIPTIONS, ald[i].FROMSHIPMENTSCHEDULEDATE, ald[i].TOSHIPMENTSCHEDULEDATE, ald[i].SHIPMENTMARK, ald[i].HSCODE,
                                     ald[i].UOMID, ald[i].THIKNESS, ald[i].WIDTH, ald[i].LENGTH, ald[i].TREATMENTLEVEL, ald[i].TREATMENTDIRECTIONID, ald[i].COREID, ald[i].REALOD, ald[i].DISEREDDATEOFDELIVERY, ald[i].TENTATIVEDATEOFDELIVERY,
                                     ald[i].TOTALWT, ald[i].ROLLLENGTH
                        );
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEQUOTATIONINSERTLINE";
                detailsparam.SqlValue = details;


                SqlParameter QUOTATIONLINEID = new SqlParameter("@QUOTATIONLINEID", ID);

                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ENROLL = new SqlParameter("@Enroll", enroll);
                SqlParameter DOCSTATUS = new SqlParameter("@DocStatus", enumDocumentStatus.PEND.ToString());
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.QUO.ToString());
                SqlParameter MsgStatus = new SqlParameter("@MsgStatus", enumQuotationMessage.QUOEDIT.ToString());
                SqlParameter NOTIFICATION = new SqlParameter("@Notification", enumQuoNotification.QUOESSUBMIT.ToString());
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

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEQUOTATIONLINE @TYPEQUOTATIONINSERTLINE,@QUOTATIONLINEID,@MODULECODE,@UNITID,@ENROLL,@DOCSTATUS,@PROCESSNAME,@MsgStatus,@NOTIFICATION,@LOG,@Msg output",
                  detailsparam, QUOTATIONLINEID, MODULECODE, UNITID, ENROLL, DOCSTATUS, ProcessName, MsgStatus, NOTIFICATION, LOG, outParam);
                //_context.Database.ExecuteSqlRaw("Exec SPSAVEPISC @typeInsertSalesQuatationHeader,@typeInsertSalesQuatationLine,@UnitID,@ModuleCode,@Enroll,@DocStatus,@ProcessName,@MsgStatus,@Notification,@Log,@Msg output", masterparam, detailsparam, UnitID, ModuleCode, Enroll, DocStatus, ProcessName, MsgStatus, Notification, LOG, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.QUO00001.ToString(), enumProcessName.QUO.ToString(), 0, 0, "");
            }
            finally
            {

            }
            return strMsg;
        }

        public string DeleteDetailsByID(int id, int enroll, int unitid)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.QUO00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.QUO.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumQuotationMessage.QUODEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPQUOTATIONDELETEBYDETAILS @ID,@DOCUMENTCREATEDBY,@UNITID,@MODULECODE,@PROCESSCODE,@MESSAGENAME,@MSG output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex) { }
            finally
            {

            }

            return strMsg;
        }




        public IQueryable<PILandingView> GetProformaInvoiceViewOCF(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.PILandingView.FromSqlRaw("Exec SPGETQUOTATIONDATAOCF @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<QuotationLandingView> GetSalesQuotationViewOCF(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.QuotationLandingView.FromSqlRaw("Exec SPGETQUOTATIONDATAOCF @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<SpotOrderView> GetSpotOrderViewOCF(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.SpotOrderView.FromSqlRaw("Exec SPGETQUOTATIONDATAOCF @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<ConditionalApprovalView> GetConditionalApprovalViewOCF(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.ConditionalApprovalView.FromSqlRaw("Exec SPGETQUOTATIONDATAOCF @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<SpotOrderView> GetCommonOCF(int typeid, int id, int enroll)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.SpotOrderView.FromSqlRaw("Exec SPGETQUOTATIONDATAOCF @TYPEID,@ID,@ENROLL", TYPEID, ID, ENROLL);
        }

        public IQueryable<OCFListView> GetExcelData()
        {
            return _context.OCFListView.FromSqlRaw("Exec SPGETEXCELDATA");
        }

        public string UploadExcel(DataTable dt)
        {
            try
            {
                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEEXCELUPLOAD";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEEXCELUPLOAD";
                detailsparam.SqlValue = dt;


                _context.Database.ExecuteSqlRaw("Exec SPEXCELUPLOAD @TYPEEXCELUPLOAD,@Msg output", detailsparam, outParam);

                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
               
               
            }
            finally { }
            return null;
        }

    }
}
