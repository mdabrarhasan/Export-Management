using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.File;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using ImportExport.UI.Repository.CommonRepository;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Web.Mvc;


namespace ImportExport.UI.Repository.SalesQuatationRepository
{

    public class RSalesQuatationLanding : ISalesQuatationLanding, IFileUpload
    {
        private Context _context;
        private ICommon _common;
        UserInfo info = new UserInfo();
        

        string strMsg = "";
        public RSalesQuatationLanding(Context context,ICommon common)
        {
            _context = context;
            _common = common;
        }

        public IQueryable<SalesQuatationLandingView> GetAllSalesQuatationLanding(int enroll)
        {
            try
            {
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                return _context.SalesQuatationLandingView.FromSqlRaw("Exec GetSalesQuatation @Enroll", Enroll);
            }
            catch (Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<VatModel> GetVatData()
        {
            try
            {
                SqlParameter Type = new SqlParameter("@Type", 1);
                SqlParameter VatID = new SqlParameter("@VatID", 1);
                return _context.VatModel.FromSqlRaw("Exec spGetVatDetails @Type,@VatID", Type, VatID);
            }
            catch(Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<DiscountModel> GetDiscountData()
        {
            try
            {
                SqlParameter Type = new SqlParameter("@Type", 1);
                SqlParameter DisID = new SqlParameter("@DisID", 1);
                return _context.DiscountModel.FromSqlRaw("Exec spGetDiscountDetails @Type,@DisID", Type, DisID);
            }
            catch(Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<FGModel> GetFGlist(int UnitID,string Prefix, int ItemTypeID)
        {
            try
            {
                SqlParameter PUnitID = new SqlParameter("@UnitID", UnitID);
                SqlParameter PPrefix = new SqlParameter("@Prefix", Prefix);
                SqlParameter PItemTypeID = new SqlParameter("@ItemTypeID", ItemTypeID);
                return _context.FGModel.FromSqlRaw("Exec SPGetFGNameWithoutProductCode @UnitID,@Prefix,@ItemTypeID", PUnitID, PPrefix, PItemTypeID);
            }
            catch(Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            return null;
        }


        public IQueryable<DELPOINTMODEL> GetDelPointist(int intUnitId, int intType, int customerId, string strprefix)
        {
                SqlParameter pintUnitId = new SqlParameter("@intUnitId", intUnitId);
                SqlParameter pintType = new SqlParameter("@intType", intType);
                SqlParameter pcustomerId = new SqlParameter("@customerId", customerId);
                SqlParameter pstrprefix = new SqlParameter("@strprefix", strprefix);
            return _context.DELPOINTMODEL.FromSqlRaw("Exec SPGETDELPOINTBYUNITANDTYPE @intUnitId,@intType,@customerId,@strprefix", pintUnitId, pintType, pcustomerId, pstrprefix);
        }

        public IQueryable<VatModel> GetVatCal(int id)
        {
            try
            {
                SqlParameter Type = new SqlParameter("@Type", 2);
                SqlParameter VatID = new SqlParameter("@VatID", id);
                return _context.VatModel.FromSqlRaw("Exec spGetVatDetails @Type,@VatID", Type, VatID);
            }
            catch(Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            return null;
        }

        public IQueryable<DiscountModel> GetDisCal(int id)
        {
            SqlParameter Type = new SqlParameter("@Type", 2);
            SqlParameter DisID = new SqlParameter("@DisID", id);
            return _context.DiscountModel.FromSqlRaw("Exec spGetDiscountDetails @Type,@DisID", Type, DisID);
        }

        public string Save(SalesQuatationLanding sq, SalesQuatationLandingDetails[] sqd)
        {
            try
            {
                // ================= MASTER TABLE ======================
                DataTable master = new DataTable();
                master.Columns.Add("SQTYPEID", typeof(int));
                master.Columns.Add("EXPIREDATE", typeof(string));
                master.Columns.Add("CUSTOMERID", typeof(int));
                master.Columns.Add("UNITID", typeof(int));
                master.Columns.Add("DESCRIPTIONS", typeof(string));
                master.Columns.Add("DOCUMENTCREATEDBY", typeof(int));
                master.Columns.Add("DOCUMENTSTATUSID", typeof(int));
                master.Columns.Add("TERMSCONDITION", typeof(string));

                master.Rows.Add(
                    sq.SQTYPEID,
                    sq.EXPIREDATE,
                    sq.CUSTOMERID,
                    sq.UnitID,
                    sq.DESCRIPTIONS,
                    sq.DOCUMENTCREATEDBY,
                    1,
                    sq.TERMSCONDITION
                );

                // ================= DETAILS TABLE =================
                DataTable details = new DataTable();

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

                foreach (var item in sqd)
                {
                    details.Rows.Add(
                        item.ITEMTYPEID,
                        item.ITEMID,
                        item.UOMID,
                        item.SIZE,
                        item.CONSTRUCTION,
                        item.WEIGHT,
                        item.SLIT,
                        item.SCRIM,
                        item.QUALITY,
                        item.ITEMTITLE,
                        item.PACKINGDETAILS,
                        item.QUANTITY,
                        item.PRICE,
                        item.DISCOUNTID,
                        item.DISCOUNT,
                        item.TOTALAMOUNT,
                        item.DESCRIPTIONS,
                        item.REMARKS
                    );
                }

                // ================= PARAMETERS =================

                var parameters = new List<SqlParameter>
                {
                    new SqlParameter("@TYPEINSERTSALESQUATATIONHEADER", SqlDbType.Structured)
                    {
                        TypeName = "InsertSalesQuatationHeader",
                        Value = master
                    },
                    new SqlParameter("@TYPEINSERTSALESQUATATIONLINE", SqlDbType.Structured)
                    {
                        TypeName = "InsertSalesQuatationLine",
                        Value = details
                    },

                    new SqlParameter("@SHIPMENTMODE", sq.SHIPMENTMODE),
                    new SqlParameter("@SQTYPE", sq.SQTYPEID),
                    new SqlParameter("@FROMSHIPMENT", sq.FROMSHIPMENT),
                    new SqlParameter("@TOSHIPMENT", sq.TOSHIPMENT),
                    new SqlParameter("@TEXTFROMSHIPMENT", sq.TEXTFROMSHIPMENT ?? ""),
                    new SqlParameter("@DESTINATIONPORT", sq.DESTINATIONPORT ?? ""),
                    new SqlParameter("@CURRENCY", sq.CURRENCY),
                    new SqlParameter("@LOADINGPORT", sq.LOADINGPORT),
                    new SqlParameter("@LOADINGPLACE", sq.LOADINGPLACE ?? ""),
                    new SqlParameter("@INCOTERM", sq.INCOTERM),

                    new SqlParameter("@PAYMENTTERMS", (object?)sq.PAYMENTTERMS ?? DBNull.Value),
                    new SqlParameter("@PAYMENTTERMS_OTHERS", (object?)sq.PAYMENTTERMS_OTHERS ?? DBNull.Value),
                    new SqlParameter("@PAYMENTTERMSID", sq.PAYMENTTERMSID),

                    new SqlParameter("@SHIPPINGPERIOD", sq.SHIPPINGPERIOD ?? ""),
                    new SqlParameter("@TRANSPORTATIONMODE", sq.TRANSPORTATIONMODE),
                    new SqlParameter("@UNITID", sq.UnitID),

                    new SqlParameter("@QUANTITYSUMMARY", sq.QUANTITYSUMMARY ?? ""),
                    new SqlParameter("@PACKING", sq.PACKING ?? ""),
                    new SqlParameter("@PRICEREPORT", sq.PRICEREPORT ?? ""),
                    new SqlParameter("@MARKER", sq.MARKER ?? ""),
                    new SqlParameter("@DESCRIPTIONSPECIFICATION", sq.DESCRIPTIONSPECIFICATION ?? ""),

                    new SqlParameter("@MODULECODE", enumSubMenu.SQ00001.ToString()),
                    new SqlParameter("@ENROLL", sq.DOCUMENTCREATEDBY),
                    new SqlParameter("@DOCSTATUS", enumDocumentStatus.PEND.ToString()),
                    new SqlParameter("@PROCESSNAME", enumProcessName.SQ.ToString()),
                    new SqlParameter("@MSGSTATUS", enumSQMessage.SQSAVE.ToString()),
                    new SqlParameter("@NOTIFICATION", enumSQNotification.SQSSUBMIT.ToString()),
                    new SqlParameter("@LOG", "")
                };

                var outParam = new SqlParameter("@MSG", SqlDbType.VarChar, 200)
                {
                    Direction = ParameterDirection.Output
                };

                parameters.Add(outParam);

                // ================= EXECUTION (ORDER SAFE) =================
                _context.Database.ExecuteSqlRaw(@"
                    EXEC SPINSERTSALESQUATATION
                        @TYPEINSERTSALESQUATATIONHEADER=@TYPEINSERTSALESQUATATIONHEADER,
                        @TYPEINSERTSALESQUATATIONLINE=@TYPEINSERTSALESQUATATIONLINE,
                        @SHIPMENTMODE=@SHIPMENTMODE,
                        @SQTYPE=@SQTYPE,
                        @FROMSHIPMENT=@FROMSHIPMENT,
                        @TOSHIPMENT=@TOSHIPMENT,
                        @TEXTFROMSHIPMENT=@TEXTFROMSHIPMENT,
                        @DESTINATIONPORT=@DESTINATIONPORT,
                        @CURRENCY=@CURRENCY,
                        @LOADINGPORT=@LOADINGPORT,
                        @LOADINGPLACE=@LOADINGPLACE,
                        @INCOTERM=@INCOTERM,
                        @PAYMENTTERMS=@PAYMENTTERMS,
                        @PAYMENTTERMS_OTHERS=@PAYMENTTERMS_OTHERS,
                        @PAYMENTTERMSID=@PAYMENTTERMSID,
                        @SHIPPINGPERIOD=@SHIPPINGPERIOD,
                        @TRANSPORTATIONMODE=@TRANSPORTATIONMODE,
                        @UNITID=@UNITID,
                        @QUANTITYSUMMARY=@QUANTITYSUMMARY,
                        @PACKING=@PACKING,
                        @PRICEREPORT=@PRICEREPORT,
                        @MARKER=@MARKER,
                        @DESCRIPTIONSPECIFICATION=@DESCRIPTIONSPECIFICATION,
                        @MODULECODE=@MODULECODE,
                        @ENROLL=@ENROLL,
                        @DOCSTATUS=@DOCSTATUS,
                        @PROCESSNAME=@PROCESSNAME,
                        @MSGSTATUS=@MSGSTATUS,
                        @NOTIFICATION=@NOTIFICATION,
                        @LOG=@LOG,
                        @MSG=@MSG OUTPUT
                ", parameters.ToArray());

                return outParam.Value?.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog("", ex.ToString(),
                    enumSubMenu.SQ00001.ToString(),
                    enumProcessName.SQ.ToString(),
                    info.UnitID, info.Enroll, "");

                return ex.Message;
            }
        }

        public IQueryable<FileDetail> GetFileDetail (string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            return _context.FileDetail.FromSqlRaw("Exec SPGetFileUpload @Prefix", Prefix);
        }

        public int UpdateFileDetail(int type, string processCode, string fileName)
        {
            try
            {
               
                SqlParameter typeParam = new SqlParameter("@Type", type);
                SqlParameter processCodeParam = new SqlParameter("@PROCESSCODE", processCode);
                SqlParameter fileNameParam = new SqlParameter("@FILENAME", fileName);

              
                return _context.Database.ExecuteSqlRaw("EXEC SpForFileUpdateAndGet @Type, @PROCESSCODE, @FILENAME", typeParam,processCodeParam,fileNameParam);
            }
            catch (Exception ex)
            {
               
                Console.WriteLine($"An error occurred: {ex.Message}");
                throw; 
            }
        }

        public IQueryable<CustomerInfo> GetCustomerInfo(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfo @Prefix", Prefix);
        }

        

        public IQueryable<SellerInfo> GetSellerInfo(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", SqlDbType.VarChar, 100)
            {
                Value = string.IsNullOrEmpty(prefix) ? "" : prefix
            };
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfo @Prefix = @Prefix", Prefix);
        }

        public IQueryable<SalesQuatationLandingView> EditByMasterID(int headerid)
        {
            int id = 0;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.SalesQuatationLandingView.FromSqlRaw("Exec EditbyID @id,@headerid", ID, HeaderID);
        }

        public IQueryable<SalesQuotationViewModel> ViewByMasterID(int headerid)
        {
            int id = 3;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.SalesQuotationViewModel.FromSqlRaw("Exec EditbyID @id,@headerid", ID, HeaderID);
        }


        public IQueryable<SalesQuatationLandingDetails> EditByDetailsID(int headerid)
        {
            int id = 1;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.tblsalesquotationline.FromSqlRaw("Exec EditbyID @id,@headerid", ID, HeaderID);
        }

        public IQueryable<SalesQuatationLandingDetails> ViewByDetailsID(int headerid)
        {
            int id = 2;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.tblsalesquotationline.FromSqlRaw("Exec EditbyID @id,@headerid", ID, HeaderID);
        }

        public string DeleteSQDetailsByID(int id)
        {
            strMsg=id.ToString();
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter UnitID = new SqlParameter("@UnitID", info.UnitID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.SQ00001.ToString());
                SqlParameter Enroll = new SqlParameter("@Enroll", info.Enroll);
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.SQ.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumSQMessage.SQDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };
                _context.Database.ExecuteSqlRaw("Exec SPDeleteSQDetailsByID @id,@UnitID,@ModuleCode,@Enroll,@ProcessCode,@MessageName,@Msg output", ID, UnitID, ModuleCode, Enroll, ProcessCode, MessageName, outParam);
                strMsg = outParam.Value.ToString();   
            }
            catch(Exception ex) {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            return strMsg;
        }
        public string DeleteSQMasterByID(int id)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@id", id);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", info.Enroll);
                SqlParameter UNITID = new SqlParameter("@UNITID", info.UnitID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.SQ00001.ToString());
                SqlParameter ProcessCode = new SqlParameter("@ProcessCode", enumProcessName.SQ.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumSQMessage.SQDEL.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPDeleteSQMasterByID @id,@DOCUMENTCREATEDBY,@UNITID,@ModuleCode,@ProcessCode,@MessageName,@Msg output", ID, DOCUMENTCREATEDBY, UNITID, ModuleCode, ProcessCode, MessageName, outParam);
                strMsg= outParam.Value.ToString();  
            }
            catch (Exception ex) {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            
            return strMsg;
        }

        public string UpdateDetailsByID(SalesQuatationLandingDetails sqd)
        {
            string strMsg = string.Empty;
            string PROCESSID = sqd.ID.ToString();

            try
            {
                var parameters = new[]
                {
                    new SqlParameter("@ID", sqd.ID),
                    new SqlParameter("@SALESQUOTATIONHEADERID", sqd.SALESQUOTATIONHEADERID),
                    new SqlParameter("@ITEMTYPEID", sqd.ITEMTYPEID),
                    new SqlParameter("@ITEMID", sqd.ITEMID),
                    new SqlParameter("@UOMID", sqd.UOMID),
                    new SqlParameter("@SIZE", (object)sqd.SIZE ?? DBNull.Value),
                    new SqlParameter("@CONSTRUCTION", (object)sqd.CONSTRUCTION ?? DBNull.Value),
                    new SqlParameter("@WEIGHT", (object)sqd.WEIGHT ?? DBNull.Value),
                    new SqlParameter("@SLIT", (object)sqd.SLIT ?? DBNull.Value),
                    new SqlParameter("@SCRIM", (object)sqd.SCRIM ?? DBNull.Value),
                    new SqlParameter("@QUANTITY", sqd.QUANTITY),
                    new SqlParameter("@ITEMTITLE", (object)sqd.ITEMTITLE ?? DBNull.Value),
                    new SqlParameter("@PACKINGDETAILS", (object)sqd.PACKINGDETAILS ?? DBNull.Value),
                    new SqlParameter("@QUALITY", (object)sqd.QUALITY ?? DBNull.Value),
                    new SqlParameter("@PRICE", sqd.PRICE),
                    new SqlParameter("@DISCOUNTID", sqd.DISCOUNTID),
                    new SqlParameter("@DISCOUNT", sqd.DISCOUNT),
                    new SqlParameter("@TOTALAMOUNT", sqd.TOTALAMOUNT),
                    new SqlParameter("@REMARKS", (object)sqd.REMARKS ?? DBNull.Value),
                    new SqlParameter("@DESCRIPTIONS", (object)sqd.DESCRIPTIONS ?? DBNull.Value),
                    new SqlParameter("@UNITID", info.UnitID),
                    new SqlParameter("@MODULECODE", "SQ00001"),
                    new SqlParameter("@ENROLL", info.Enroll),
                    new SqlParameter("@PROCESSNAME", "SQ"),
                    new SqlParameter("@MESSAGENAME", "SQEDIT"),
                    new SqlParameter
                    {
                        ParameterName = "@MSG",
                        SqlDbType = System.Data.SqlDbType.VarChar,
                        Size = 100,
                        Direction = System.Data.ParameterDirection.Output
                    }
                };

                _context.Database.ExecuteSqlRaw(
                    "EXEC SPUpdateSQDetailsByID @ID,@SALESQUOTATIONHEADERID,@ITEMTYPEID,@ITEMID,@UOMID,@SIZE,@CONSTRUCTION,@WEIGHT,@SLIT,@SCRIM,@QUANTITY,@ITEMTITLE,@PACKINGDETAILS,@QUALITY,@PRICE,@DISCOUNTID,@DISCOUNT,@TOTALAMOUNT,@REMARKS,@DESCRIPTIONS,@UNITID,@MODULECODE,@ENROLL,@PROCESSNAME,@MESSAGENAME,@MSG OUTPUT",
                    parameters
                );

                strMsg = parameters.Last().Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(PROCESSID, ex.ToString(), "SQ00001", "SQ", info.UnitID, info.Enroll, "");
                strMsg = "Error: " + ex.Message;
            }

            return strMsg;
        }

        public string SaveFile(DataTable fileupload)
        {
            try
            {
                SqlParameter UnitID = new SqlParameter("@UnitID", info.UnitID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.SQ00001.ToString());
                SqlParameter Enroll = new SqlParameter("@Enroll", info.Enroll);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.SQ.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumSQMessage.SQSAVE.ToString());

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                SqlParameter detailsparam = new SqlParameter();
                detailsparam.ParameterName = "@typefileupload";
                detailsparam.SqlDbType = SqlDbType.Structured;
                detailsparam.TypeName = "TypeFileUpload";
                detailsparam.SqlValue = fileupload;

                 _context.Database.ExecuteSqlRaw("Exec SPSaveFileUpload @typefileupload,@UnitID,@ModuleCode,@Enroll,@ProcessName,@MessageName,@Msg output", detailsparam, UnitID, ModuleCode, Enroll, ProcessName, MessageName, outParam);
                strMsg= outParam.Value.ToString();
            }
            catch(Exception ex) {
                _common.ErrorLog("", ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            finally { }
            
            return strMsg;
        }

        public List<FileDetail> GetFileUploads(string proc)
        {
            List<FileDetail> fileDetails = new List<FileDetail>();

            try
            {
                SqlParameter PROC = new SqlParameter("@PROC", proc);
                //SqlParameter UnitID = new SqlParameter("@UnitID", info.UnitID);
                //SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.SQ00001.ToString());
                //SqlParameter Enroll = new SqlParameter("@Enroll", info.Enroll);
                //SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.SQ.ToString());
                //SqlParameter MessageName = new SqlParameter("@MessageName", enumSQMessage.SQSAVE.ToString());
                fileDetails = _context.FileDetail
                   .FromSqlRaw("Exec SPGetFileUpload @PROC", PROC)
                   .ToList();
            }
            catch (Exception ex)
            {
                //_common.ErrorLog("", ex.ToString(), moduleCode, processName, unitId, info.Enroll, "");
            }

            return fileDetails;
        }

        public string EditDetailsAdd(SalesQuatationLandingDetails sqd)
        {
            try
            {
                SqlParameter SALESQUOTATIONHEADERID = new SqlParameter("@SALESQUOTATIONHEADERID", sqd.SALESQUOTATIONHEADERID);
                SqlParameter ITEMTYPEID = new SqlParameter("@ITEMTYPEID", sqd.ITEMTYPEID);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", sqd.ITEMID);
                SqlParameter UOMID = new SqlParameter("@UOMID", sqd.UOMID);
                SqlParameter SIZE = new SqlParameter("@SIZE", sqd.SIZE==null ? "": sqd.SIZE);
                SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", sqd.CONSTRUCTION==null ? "" : sqd.CONSTRUCTION);
                SqlParameter WEIGHT = new SqlParameter("@WEIGHT", sqd.WEIGHT == null ? "" : sqd.WEIGHT);
                SqlParameter SLIT = new SqlParameter("@SLIT", sqd.SLIT == null ? "" : sqd.SLIT);
                SqlParameter SCRIM = new SqlParameter("@SCRIM", sqd.SCRIM == null ? "" : sqd.SCRIM);
                SqlParameter QUANTITY = new SqlParameter("@QUANTITY", sqd.QUANTITY);
                SqlParameter ITEMTITLE = new SqlParameter("@ITEMTITLE", sqd.ITEMTITLE == null ? "" : sqd.ITEMTITLE);

                SqlParameter QUALITY = new SqlParameter("@QUALITY", sqd.QUALITY == null ? "" : sqd.QUALITY);
                SqlParameter PRICE = new SqlParameter("@PRICE", sqd.PRICE);
                SqlParameter DISCOUNTID = new SqlParameter("@DISCOUNTID", sqd.DISCOUNTID);
                SqlParameter DISCOUNT = new SqlParameter("@DISCOUNT", sqd.DISCOUNT);
                SqlParameter TOTALAMOUNT = new SqlParameter("@TOTALAMOUNT", sqd.TOTALAMOUNT);
                SqlParameter DESCRIPTIONS = new SqlParameter("@DESCRIPTIONS", sqd.DESCRIPTIONS == null ? "" : sqd.DESCRIPTIONS);
                SqlParameter REMARKS = new SqlParameter("@REMARKS", sqd.REMARKS == null ? "" : sqd.REMARKS);
                

                SqlParameter UnitID = new SqlParameter("@UnitID", info.UnitID);
                SqlParameter ModuleCode = new SqlParameter("@ModuleCode", enumSubMenu.SQ00001.ToString());
                SqlParameter Enroll = new SqlParameter("@Enroll", info.Enroll);
                SqlParameter ProcessName = new SqlParameter("@ProcessName", enumProcessName.SQ.ToString());
                SqlParameter MessageName = new SqlParameter("@MessageName", enumSQMessage.SQSAVE.ToString());


                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPEditDetailsAdd @SALESQUOTATIONHEADERID,@ITEMTYPEID,@ITEMID,@UOMID,@SIZE,@CONSTRUCTION,@WEIGHT,@SLIT,@SCRIM,@QUANTITY,@ITEMTITLE,@QUALITY,@PRICE,@DISCOUNTID,@DISCOUNT,@TOTALAMOUNT,@REMARKS,@DESCRIPTIONS,@UnitID,@ModuleCode,@Enroll,@ProcessName,@MessageName, @Msg output", SALESQUOTATIONHEADERID, ITEMTYPEID, ITEMID, UOMID, SIZE, CONSTRUCTION, WEIGHT, SLIT, SCRIM, QUANTITY, ITEMTITLE, QUALITY, PRICE, DISCOUNTID, DISCOUNT, TOTALAMOUNT, REMARKS, DESCRIPTIONS, UnitID, ModuleCode, Enroll, ProcessName, MessageName, outParam);
                strMsg= outParam.Value.ToString();
            }
            catch(Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            return strMsg;  
        }

        public string Update(SalesQuatationLanding sql)
        {
            string strMsg = sql.ID.ToString();
            try
            {
                var parameters = new[] {

                    new SqlParameter("@ID", SqlDbType.Int) { Value = sql.ID },
                    new SqlParameter("@CUSTOMERID", SqlDbType.Int) { Value = sql.CUSTOMERID },
                    new SqlParameter("@UNITID", SqlDbType.Int) { Value = sql.UnitID },

                    // String fields - use NVarChar for Unicode
                    new SqlParameter("@QUANTITYSUMMARY", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.QUANTITYSUMMARY) ? (object)DBNull.Value : sql.QUANTITYSUMMARY },
                    new SqlParameter("@PACKING", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.PACKING) ? (object)DBNull.Value : sql.PACKING },
                    new SqlParameter("@PRICEREPORT", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.PRICEREPORT) ? (object)DBNull.Value : sql.PRICEREPORT },
                    new SqlParameter("@MARKER", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.MARKER) ? (object)DBNull.Value : sql.MARKER },
                    new SqlParameter("@DESCRIPTIONSPECIFICATION", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.DESCRIPTIONSPECIFICATION) ? (object)DBNull.Value : sql.DESCRIPTIONSPECIFICATION },
                    new SqlParameter("@DESCRIPTIONS", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.DESCRIPTIONS) ? (object)DBNull.Value : sql.DESCRIPTIONS },

                    // Document info
                    new SqlParameter("@DOCUMENTCREATEDBY", SqlDbType.Int) { Value = sql.DOCUMENTCREATEDBY },
                    new SqlParameter("@DOCUMENTSTATUSID", SqlDbType.Int) { Value = sql.DOCUMENTSTATUSID },

                    // Shipment info
                    new SqlParameter("@SHIPMENTMODE", SqlDbType.Int) { Value = sql.SHIPMENTMODE },
                    new SqlParameter("@FROMSHIPMENT", SqlDbType.Int) { Value = sql.FROMSHIPMENT },
                    new SqlParameter("@TOSHIPMENT", SqlDbType.Int) { Value = sql.TOSHIPMENT },

                    // Location / Ports
                    new SqlParameter("@LOADINGPLACE", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.LOADINGPLACE) ? (object)DBNull.Value : sql.LOADINGPLACE },
                    new SqlParameter("@LOADINGPORT", SqlDbType.Int) { Value = sql.LOADINGPORT },
                    new SqlParameter("@DESTINATIONPORT", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.DESTINATIONPORT) ? (object)DBNull.Value : sql.DESTINATIONPORT },

                    // Trade / Transport
                    new SqlParameter("@CURRENCY", SqlDbType.Int) { Value = sql.CURRENCY },
                    new SqlParameter("@INCOTERM", SqlDbType.Int) { Value = sql.INCOTERM },
                    new SqlParameter("@TRANSPORTATIONMODE", SqlDbType.Int) { Value = sql.TRANSPORTATIONMODE },

                    // Terms
                    new SqlParameter("@TERMSCONDITION", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.TERMSCONDITION) ? (object)DBNull.Value : sql.TERMSCONDITION },
                    new SqlParameter("@PAYMENTTERMS", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.PAYMENTTERMS) ? (object)DBNull.Value : sql.PAYMENTTERMS },
                    new SqlParameter("@PAYMENTTERMS_OTHERS", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.PAYMENTTERMS_OTHERS) ? (object)DBNull.Value : sql.PAYMENTTERMS_OTHERS },
                    new SqlParameter("@PAYMENTTERMSID", SqlDbType.Int) { Value = sql.PAYMENTTERMSID },

                    // Other
                    new SqlParameter("@SHIPPINGPERIOD", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(sql.SHIPPINGPERIOD) ? (object)DBNull.Value : sql.SHIPPINGPERIOD },
                    new SqlParameter("@SQTYPEID", SqlDbType.Int) { Value = sql.SQTYPEID },
                    new SqlParameter("@EXPIREDATE", SqlDbType.Date) { Value = string.IsNullOrEmpty(sql.EXPIREDATE) ? (object)DBNull.Value : DateTime.Parse(sql.EXPIREDATE) },

                    // Process metadata
                    new SqlParameter("@ModuleCode", SqlDbType.NVarChar) { Value = enumSubMenu.SQ00001.ToString() },
                    new SqlParameter("@ProcessName", SqlDbType.NVarChar) { Value = enumProcessName.SQ.ToString() },
                    new SqlParameter("@MessageName", SqlDbType.NVarChar) { Value = enumSQMessage.SQEDIT.ToString() },
                    new SqlParameter("@Notification", SqlDbType.NVarChar) { Value = enumSQNotification.SQESUBMIT.ToString() },

                    // Output
                    new SqlParameter("@Msg", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output }
                };

                _context.Database.ExecuteSqlRaw(@"
                    Exec SPUpdateSalesQuatation 
                    @ID,
                    @CUSTOMERID,
                    @UNITID,
                    @QUANTITYSUMMARY,
                    @PACKING,
                    @PRICEREPORT,
                    @MARKER,
                    @DESCRIPTIONSPECIFICATION,
                    @DESCRIPTIONS,
                    @DOCUMENTCREATEDBY,
                    @DOCUMENTSTATUSID,
                    @SHIPMENTMODE,
                    @FROMSHIPMENT,
                    @TOSHIPMENT,
                    @CURRENCY,
                    @LOADINGPLACE,     
                    @LOADINGPORT,
                    @DESTINATIONPORT,
                    @INCOTERM,
                    @TRANSPORTATIONMODE,
                    @TERMSCONDITION,
                    @PAYMENTTERMS,
                    @PAYMENTTERMS_OTHERS,
                    @PAYMENTTERMSID,
                    @SHIPPINGPERIOD,
                    @SQTYPEID,
                    @EXPIREDATE,
                    @ModuleCode,
                    @ProcessName,
                    @MessageName,
                    @Notification,
                    @Msg OUTPUT", parameters);


                strMsg = parameters.Last().Value.ToString();
            }

            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }

            return strMsg;
        }

        public string CopyMaster(int id, int enroll)
        {
            strMsg = id.ToString();
            try
            {
                SqlParameter SOURCEID = new SqlParameter("@SOURCEID", id);
                SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);

                var outParam = new SqlParameter
                {
                    ParameterName = "@MSG",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.VarChar,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw(
                    "Exec SPCOPYSALESQUOTATION @SOURCEID,@ENROLL,@MSG output",
                    SOURCEID, ENROLL, outParam);

                strMsg = outParam.Value.ToString();
            }
            catch (Exception ex)
            {
                _common.ErrorLog(strMsg, ex.ToString(), enumSubMenu.SQ00001.ToString(), enumProcessName.SQ.ToString(), info.UnitID, info.Enroll, "");
            }
            return strMsg;
        }

    }
}


