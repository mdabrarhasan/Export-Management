using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.Combine;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Repository.CommonRepository;
using ImportExport.UI.Service.CombineSQServise;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.RCombineSQ
{
    public class RCombineSQ: ICombineSQ
    {
        private Context context;
        string strMsg = "";
        string strModuleCode = "";
        string strProcessName = "";
        string strMessage = "";
        string strNotification = "";
        int UnitID = 0;
        int Enroll = 0;

        public RCombineSQ(Context context)
        {
            this.context = context;
        }

        public IQueryable<DropDownBind> GetSQ(string prefix)
        {
            SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix);

            return context.DropDownBind.FromSqlRaw("EXEC SPSQGET @PREFIX",PREFIX);
        }

        public IQueryable<DropDownBind> GetSC(string prefix, string sqIds)
        {
            SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix ?? "");
            SqlParameter SQIDS = new SqlParameter("@SQIDS", sqIds ?? "");

            return context.DropDownBind.FromSqlRaw("EXEC SPSCGET @PREFIX, @SQIDS", PREFIX, SQIDS);
        }

        public IQueryable<DropDownBind> GetSCList(string prefix)
        {
            SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix ?? "");

            return context.DropDownBind.FromSqlRaw("EXEC SPSCLISTGET @PREFIX", PREFIX);
        }

        public IQueryable<DropDownBind> GetSCExisting(string prefix, string excludeIds)
        {
            SqlParameter PREFIX = new SqlParameter("@PREFIX", prefix ?? "");
            SqlParameter EXCLUDEIDS = new SqlParameter("@EXCLUDEIDS", excludeIds ?? "");

            return context.DropDownBind.FromSqlRaw("EXEC SPSCEXISTINGGET @PREFIX, @EXCLUDEIDS", PREFIX, EXCLUDEIDS);
        }

        public SCHeaderDto GetSCHeader(int scId)
        {
            SCHeaderDto result = null;

            var conn = context.Database.GetDbConnection();
            bool opened = false;
            try
            {
                if (conn.State != System.Data.ConnectionState.Open)
                {
                    conn.Open();
                    opened = true;
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SPSCHEADERGET";

                    var pScId = cmd.CreateParameter();
                    pScId.ParameterName = "@SCID";
                    pScId.Value = scId;
                    cmd.Parameters.Add(pScId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            result = new SCHeaderDto
                            {
                                ID = Convert.ToInt32(reader["ID"]),
                                UNITID = Convert.ToInt32(reader["UNITID"]),
                                SHIPMENTMODE = Convert.ToInt32(reader["SHIPMENTMODE"]),
                                FROMSHIPMENT = Convert.ToInt32(reader["FROMSHIPMENT"]),
                                TOSHIPMENT = Convert.ToInt32(reader["TOSHIPMENT"]),
                                CURRENCY = Convert.ToInt32(reader["CURRENCY"]),
                                LOADINGPORT = Convert.ToInt32(reader["LOADINGPORT"]),
                                LOADINGPLACE = reader["LOADINGPLACE"].ToString(),
                                INCOTERM = reader["INCOTERM"].ToString(),
                                PAYMENTTERMS = Convert.ToInt32(reader["PAYMENTTERMS"]),
                                DESTINATIONPORT = reader["DESTINATIONPORT"].ToString(),
                                EXPIREDATE = reader["EXPIREDATE"]?.ToString() ?? "",
                                TRANSPORTATIONMODE = Convert.ToInt32(reader["TRANSPORTATIONMODE"]),
                                TEXTPAYMENT = reader["TEXTPAYMENT"].ToString(),

                                // NEW
                                DATE = reader["DATE"]?.ToString() ?? "",
                                SHIPMENTDATE = reader["SHIPMENTDATE"]?.ToString() ?? "",
                                BUYERORDERCONFIRMDATE = reader["BUYERORDERCONFIRMDATE"]?.ToString() ?? "",
                                BUYERREGNO = reader["BUYERREGNO"].ToString(),
                                NOTIFYPARTY = reader["NOTIFYPARTY"].ToString(),
                                BUYERBANKDETAILS = reader["BUYERBANKDETAILS"].ToString(),
                                SELLERBANKID = Convert.ToInt32(reader["SELLERBANKID"]),
                                PARTIALSHIPMENT = Convert.ToInt32(reader["PARTIALSHIPMENT"]),
                                TRANSHIPMENT = Convert.ToInt32(reader["TRANSHIPMENT"]),
                                DELIVERYBY = Convert.ToInt32(reader["DELIVERYBY"]),
                                TERMSCONDITION = reader["TERMSCONDITION"].ToString(),
                                DESCRIPTIONS = reader["DESCRIPTIONS"].ToString(),
                                AGREEMENTTYPEID = Convert.ToInt32(reader["AGREEMENTTYPEID"])
                            };
                        }
                    }
                }
            }
            finally
            {
                if (opened && conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }

            return result;
        }

        public SCMatchResult ValidateSCMatch(int baselineId, int candidateId)
        {
            var result = new SCMatchResult { matches = true };

            var conn = context.Database.GetDbConnection();
            bool opened = false;
            try
            {
                if (conn.State != System.Data.ConnectionState.Open)
                {
                    conn.Open();
                    opened = true;
                }

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.CommandText = "SPSCMATCHCHECK";

                    var pBaseline = cmd.CreateParameter();
                    pBaseline.ParameterName = "@BASELINEID";
                    pBaseline.Value = baselineId;
                    cmd.Parameters.Add(pBaseline);

                    var pCandidate = cmd.CreateParameter();
                    pCandidate.ParameterName = "@CANDIDATEID";
                    pCandidate.Value = candidateId;
                    cmd.Parameters.Add(pCandidate);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            result.mismatchedFields.Add(reader.GetString(0));
                        }
                    }
                }
            }
            finally
            {
                if (opened && conn.State == System.Data.ConnectionState.Open)
                    conn.Close();
            }

            result.matches = result.mismatchedFields.Count == 0;
            return result;
        }

        public IQueryable<CombineHeader> GetCombineSQitem(Hscodes[] HS)
        {
            try
            {
                DataTable hsdetails = new DataTable { TableName = "hsDetails" };
                hsdetails.Columns.Add("ID", typeof(int));

                for (int i = 0; i < HS.Length; i++)
                {
                    hsdetails.Rows.Add(HS[i].ID);
                }

                SqlParameter hsdetailsparam = new SqlParameter();
                hsdetailsparam.ParameterName = "@TYPESQIDLINE";
                hsdetailsparam.SqlDbType = SqlDbType.Structured;
                hsdetailsparam.TypeName = "TYPESQIDLINE";
                hsdetailsparam.SqlValue = hsdetails;
                return context.CombineHeader.FromSqlRaw("Exec SPGetCombineSCitem @TYPESQIDLINE", hsdetailsparam);
            }
            catch (Exception) { }
            finally
            { }
            return null;
        }

        public  string GetSQItem(AgreementLanding al,Hscodes[] HS)
        {
            DataTable hsdetails = new DataTable { TableName = "hsDetails" };
            hsdetails.Columns.Add("ID", typeof(int));

            for (int i = 0; i < HS.Length; i++)
            {
                hsdetails.Rows.Add(HS[i].ID);
            }

            SqlParameter hsdetailsparam = new SqlParameter();
            hsdetailsparam.ParameterName = "@TYPESQIDLINE";
            hsdetailsparam.SqlDbType = SqlDbType.Structured;
            hsdetailsparam.TypeName = "TYPESQIDLINE";
            hsdetailsparam.SqlValue = hsdetails;

            SqlParameter SALESQUOTATIONHEADERID = new SqlParameter("@SALESQUOTATIONHEADERID", al.SALESQUOTATIONHEADERID);
            SqlParameter AGREEMENTTYPEID = new SqlParameter("@AGREEMENTTYPEID", al.AGREEMENTTYPEID);
            SqlParameter DATE = new SqlParameter("@DATE", al.DATE == null ? "" : al.DATE);
            SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE == null ? "" : al.EXPIREDATE);
            SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE == null ? "" : al.SHIPMENTDATE);
            SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", al.SHIPMENTMODEID);
            SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID == 0 ? 1 : al.PAYMENTTERMID);
            SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", al.DELIVERYTERMID);
            SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION == null ? "" : al.TERMSCONDITION);
            SqlParameter LOADINGPLACE = new SqlParameter("@LOADINGPLACE", al.LOADINGPLACE == null ? "" : al.LOADINGPLACE);
            SqlParameter DELIVERYBY = new SqlParameter("@DELIVERYBY", al.DELIVERYBY);
            SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID == 0 ? 1 : al.TOSHIPMENTCOUNTRYID);

            SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID", al.FROMSHIPMENTCOUNTRYID);
            SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", al.FROMSHIPMENTPORTID);
            SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", al.FROMSHIPMENTPORTID);


            SqlParameter TEXTDESTINATIONPORT = new SqlParameter("@TEXTDESTINATIONPORT", al.TEXTDESTINATIONPORT);

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
            SqlParameter UNITID = new SqlParameter("@UNITID", al.UNITID);
            SqlParameter ENROLL = new SqlParameter("@Enroll", al.DOCUMENTCREATEDBY);




            var outParam = new SqlParameter
            {
                ParameterName = "@Msg",
                Size = 100,
                SqlDbType = System.Data.SqlDbType.Char,
                Direction = System.Data.ParameterDirection.Output
            };

            context.Database.ExecuteSqlRaw("EXEC SPSQGETITEM @TYPESQIDLINE,@SALESQUOTATIONHEADERID,@AGREEMENTTYPEID,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@UNITID,@ENROLL,@TEXTDESTINATIONPORT,@Msg output",
            hsdetailsparam, SALESQUOTATIONHEADERID, AGREEMENTTYPEID, DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONS, BUYERBANKDETAILS, SELLERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, UNITID, ENROLL, TEXTDESTINATIONPORT, outParam);
            strMsg = outParam.Value.ToString();
            return strMsg;

        }

        public string Save(int id, int scid, int sctypeid, string sourceScIds, MergeSourceLine[] mergeSourceLines, AgreementLanding al, AgreementLandingDetails[] ald)
        {
            strMsg = "";
            try
            {
                
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

                

                for (int i = 0; i < ald.Length; i++)
                {
                    details.Rows.Add(
                        ald[i].ITEMTYPEID,
                        ald[i].ITEMID,
                        ald[i].UOMID,
                        (object)ald[i].SIZE ?? DBNull.Value,
                        (object)ald[i].CONSTRUCTION ?? DBNull.Value,
                        (object)ald[i].WEIGHT ?? DBNull.Value,
                        (object)ald[i].SLIT ?? DBNull.Value,
                        (object)ald[i].SCRIM ?? DBNull.Value,
                        (object)ald[i].QUALITY ?? DBNull.Value,
                        (object)ald[i].ITEMTITLE ?? DBNull.Value,
                        (object)ald[i].PACKINGDETAILS ?? DBNull.Value,
                        ald[i].QUANTITY,
                        ald[i].PRICE,
                        ald[i].DISCOUNTID,
                        ald[i].DISCOUNT,
                        ald[i].TOTALAMOUNT,
                        ald[i].DESCRIPTIONS ?? "",
                        ald[i].REMARKS ?? ""
                    );
                }


                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@TYPEPISCINSERTLINE";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TYPEPISCINSERTLINE";
                detailsparam.SqlValue = details;

                DataTable mergeLines = new DataTable { TableName = "MergeLines" };
                mergeLines.Columns.Add("SOURCELINEID", typeof(int));
                mergeLines.Columns.Add("MERGEDQTY", typeof(decimal));
                if (mergeSourceLines != null)
                {
                    for (int i = 0; i < mergeSourceLines.Length; i++)
                    {
                        mergeLines.Rows.Add(mergeSourceLines[i].sourceLineId, mergeSourceLines[i].mergedQty);
                    }
                }
                SqlParameter mergeLinesParam = new SqlParameter();
                mergeLinesParam.ParameterName = "@MERGESOURCELINE";
                mergeLinesParam.SqlDbType = SqlDbType.Structured;
                mergeLinesParam.TypeName = "TYPEMERGESOURCELINE";
                mergeLinesParam.SqlValue = mergeLines;



                SqlParameter SALESQUOTATIONHEADERID = new SqlParameter("@SALESQUOTATIONHEADERID", id);
                SqlParameter SCID = new SqlParameter("@SCID", scid);
                SqlParameter SCTYPEID = new SqlParameter("@SCTYPEID", sctypeid);
                SqlParameter SOURCESCIDS = new SqlParameter("@SOURCESCIDS", sourceScIds ?? "");
                //SqlParameter SOURCELINEIDS = new SqlParameter("@SOURCELINEIDS", sourceLineIds ?? "");
                
                SqlParameter AGREEMENTTYPEID = new SqlParameter("@AGREEMENTTYPEID", (object)al.AGREEMENTTYPEID ?? DBNull.Value);
                SqlParameter DATE = new SqlParameter("@DATE", al.DATE ?? "");
                SqlParameter EXPIREDATE = new SqlParameter("@EXPIREDATE", al.EXPIREDATE ?? "");
                SqlParameter SHIPMENTDATE = new SqlParameter("@SHIPMENTDATE", al.SHIPMENTDATE ?? "");
                SqlParameter SHIPMENTMODEID = new SqlParameter("@SHIPMENTMODEID", (object)al.SHIPMENTMODEID ?? DBNull.Value);
                SqlParameter PAYMENTTERMID = new SqlParameter("@PAYMENTTERMID", al.PAYMENTTERMID == 0 ? 1 : al.PAYMENTTERMID);
                SqlParameter DELIVERYTERMID = new SqlParameter("@DELIVERYTERMID", (object)al.DELIVERYTERMID ?? DBNull.Value);
                SqlParameter TERMSCONDITION = new SqlParameter("@TERMSCONDITION", al.TERMSCONDITION ?? "");
                SqlParameter LOADINGPLACE = new SqlParameter("@LOADINGPLACE", al.LOADINGPLACE ?? "");
                SqlParameter DELIVERYBY = new SqlParameter("@DELIVERYBY", (object)al.DELIVERYBY ?? DBNull.Value);
                SqlParameter TOSHIPMENTCOUNTRYID = new SqlParameter("@TOSHIPMENTCOUNTRYID", al.TOSHIPMENTCOUNTRYID == 0 ? 1 : al.TOSHIPMENTCOUNTRYID);

                SqlParameter FROMSHIPMENTCOUNTRYID = new SqlParameter("@FROMSHIPMENTCOUNTRYID", (object)al.FROMSHIPMENTCOUNTRYID ?? DBNull.Value);
                SqlParameter FROMSHIPMENTPORTID = new SqlParameter("@FROMSHIPMENTPORTID", (object)al.FROMSHIPMENTPORTID ?? DBNull.Value);
                SqlParameter TODISCHARGEPORT = new SqlParameter("@TODISCHARGEPORT", (object)al.FROMSHIPMENTPORTID ?? DBNull.Value);


                SqlParameter TEXTDESTINATIONPORT = new SqlParameter("@TEXTDESTINATIONPORT", al.TEXTDESTINATIONPORT ?? "");

                SqlParameter TARRIFCODE = new SqlParameter("@TARRIFCODE", al.TARRIFCODE ?? "");
                SqlParameter HSSCODE = new SqlParameter("@HSSCODE", al.HSCODE ?? "");
                SqlParameter BUYERREGNO = new SqlParameter("@BUYERREGNO", al.BUYERREGNO ?? "");
                SqlParameter INCOTERM = new SqlParameter("@INCOTERM", (object)al.INTOTERM ?? DBNull.Value);
                SqlParameter CURRENCYID = new SqlParameter("@CURRENCYID", (object)al.CURRENCYID ?? DBNull.Value);
                SqlParameter DESCRIPTIONSS = new SqlParameter("@DESCRIPTIONSS", al.DESCRIPTIONS ?? "");

                SqlParameter BUYERBANKDETAILS = new SqlParameter("@BUYERBANKDETAILS", al.BUYERBANKDETAILS ?? "");
                SqlParameter SELLERBANKID = new SqlParameter("@SELLERBANKID", (object)al.SELLERBANKID ?? DBNull.Value);
                SqlParameter BUYERCOUNTRYHSCODE = new SqlParameter("@BUYERCOUNTRYHSCODE", al.BUYERCOUNTRYHSCODE ?? "");
                SqlParameter TRANSHIPMENT = new SqlParameter("@TRANSHIPMENT", (object)al.TRANSHIPMENT ?? DBNull.Value);
                SqlParameter PARTIALSHIPMENT = new SqlParameter("@PARTIALSHIPMENT", (object)al.PARTIALSHIPMENT ?? DBNull.Value);
                SqlParameter ORIGINOFCOUNTRY = new SqlParameter("@ORIGINOFCOUNTRY", al.ORIGINOFCOUNTRY ?? "");
                SqlParameter BUYERORDERCONFIRMDATE = new SqlParameter("@BUYERORDERCONFIRMDATE", al.BUYERORDERCONFIRMDATE ?? "");
                SqlParameter NOTIFYPARTY = new SqlParameter("@NOTIFYPARTY", al.NOTIFYPARTY ?? "");
                SqlParameter OTHERSPAYTERM = new SqlParameter("@OTHERSPAYTERM", al.OTHERSPAYTERM ?? "");
                SqlParameter UNITID = new SqlParameter("@UNITID", (object)al.UNITID ?? DBNull.Value);
                SqlParameter ENROLL = new SqlParameter("@Enroll", (object)al.DOCUMENTCREATEDBY ?? DBNull.Value);


                SqlParameter MODULECODE = new SqlParameter("@ModuleCode", enumSubMenu.CS00002.ToString());
                
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.CQ.ToString());
                
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
                    
                    details.WriteXml(sw);
                }

                context.Database.ExecuteSqlRaw("Exec SPSAVECOMBINESQITEM @TYPEPISCINSERTLINE,@SCID,@SCTYPEID,@SOURCESCIDS,@MERGESOURCELINE,@SALESQUOTATIONHEADERID,@AGREEMENTTYPEID,@DATE,@EXPIREDATE,@SHIPMENTDATE,@SHIPMENTMODEID,@PAYMENTTERMID,@DELIVERYTERMID,@TERMSCONDITION,@LOADINGPLACE,@DELIVERYBY,@TOSHIPMENTCOUNTRYID,@FROMSHIPMENTCOUNTRYID,@FROMSHIPMENTPORTID,@TODISCHARGEPORT,@TARRIFCODE,@HSSCODE,@BUYERREGNO,@INCOTERM,@CURRENCYID,@DESCRIPTIONSS,@BUYERBANKDETAILS,@SELLERBANKID,@BUYERCOUNTRYHSCODE,@TRANSHIPMENT,@PARTIALSHIPMENT,@ORIGINOFCOUNTRY,@BUYERORDERCONFIRMDATE,@NOTIFYPARTY,@OTHERSPAYTERM,@TEXTDESTINATIONPORT,@UNITID,@ENROLL,@ModuleCode,@ProcessName,@Msg output",
                detailsparam, SCID, SCTYPEID, SOURCESCIDS, mergeLinesParam, SALESQUOTATIONHEADERID, AGREEMENTTYPEID, DATE, EXPIREDATE, SHIPMENTDATE, SHIPMENTMODEID, PAYMENTTERMID, DELIVERYTERMID, TERMSCONDITION, LOADINGPLACE, DELIVERYBY, TOSHIPMENTCOUNTRYID, FROMSHIPMENTCOUNTRYID, FROMSHIPMENTPORTID, TODISCHARGEPORT, TARRIFCODE, HSSCODE, BUYERREGNO, INCOTERM, CURRENCYID, DESCRIPTIONSS, BUYERBANKDETAILS, SELLERBANKID, BUYERCOUNTRYHSCODE, TRANSHIPMENT, PARTIALSHIPMENT, ORIGINOFCOUNTRY, BUYERORDERCONFIRMDATE, NOTIFYPARTY, OTHERSPAYTERM, TEXTDESTINATIONPORT, UNITID, ENROLL, MODULECODE, ProcessName, outParam);

                
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                strMsg = "Exception: " + ex.Message + " | Inner: " + (ex.InnerException?.Message ?? "none") + " | Stack: " + ex.StackTrace;
            }
            finally
            {

            }
            return strMsg;
        }

        public IQueryable<AgreementLandingView> GetAgreementLandingAll(int enroll, string code, int unitid)
        {
            try
            {
                if (code == "PI" || code == "SC")
                {
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter Code = new SqlParameter("@Code", code);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    return context.AgreementLandingView.FromSqlRaw("Exec GetAgreementMergeInfo @Enroll,@Code,@UnitID", Enroll, Code, UnitID);
                }
                else
                {
                    SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                    SqlParameter Code = new SqlParameter("@Code", code);
                    SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
                    return context.AgreementLandingView.FromSqlRaw("Exec GetAgreementInfoPITOSC @Enroll,@Code,@UnitID", Enroll, Code, UnitID);
                }

            }
            catch (Exception ex)
            {
                //_common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
            }
            finally
            { }
            return null;
        }

        

        public IQueryable<CombineEditView> ViewByMasterID(int headerid)
        {
            int id = 0;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);
            return context.CombineEditView.FromSqlRaw("Exec SPMERGEVIEWPISC @id,@headerid", ID, HeaderID);
        }

        

        public IQueryable<CombineEditView> EditByMasterID(int headerid, int unitid, int enroll)
        {
            try
            {
                int id = 6;
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter HeaderID = new SqlParameter("@headerid", headerid);
                return context.CombineEditView.FromSqlRaw(
                    "Exec GETMERGEAGREEMENTINFOMASTERDETAILSBYID @id,@headerid", ID, HeaderID);
            }
            catch (Exception ex) { }
            finally { }
            return null;
        }

        public string UpdatePIDetailsByID(AgreementLandingDetails sqd, string agreementtypeid, int unitid, int enroll)
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

                    context.Database.ExecuteSqlRaw("Exec SPUpdatePIDetailsByID @id,@ITEMTYPEID,@itemid,@QUALITY,@quantity,@price,@SIZE,@CONSTRUCTION,@WEIGHT,@SLIT,@SCRIM,@ITEMTITLE,@PACKINGDETAILS, @discountid,@discountamt,@uomid,@totalamt,@descriptions,@remarks,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName, @Msg output", id, ITEMTYPEID, itemid, QUALITY, quantity, price, SIZE, CONSTRUCTION, WEIGHT, SLIT, SCRIM, ITEMTITLE, PACKINGDETAILS, discountid, discountamt, UOMID, totalamt, descriptions, remarks, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                    strMsg = outParam.Value.ToString();
                }
                catch (Exception ex)
                {
                    //common.ErrorLog(PROCESSID, ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
                }

                return strMsg;
            }
            catch (Exception ex)
            {
               // _common.ErrorLog("", ex.ToString(), strModuleCode, strProcessName, UnitID, Enroll, "");
            }
            finally { }
            return null;
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

                context.Database.ExecuteSqlRaw("Exec SPDeleteAggrementDetailsByID @id,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName,@Msg output", ID, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                //_common.ErrorLog(strMsg, ex.ToString(), strModuleCode, strProcessName, unitid, enroll, "");
            }

            return strMsg;


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
                return context.AgreementLandingDetails.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
            }
            catch (Exception) { }
            finally { }
            return null;
        }
    }
}
