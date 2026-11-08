using AspDotNet.FTPHelper;
using Microsoft.AspNetCore.Http;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ItemSpecificationModel;
using ImportExport.UI.Service.CommonService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

using System.Net;
using System.Security.Cryptography.Xml;
using ImportExport.UI.Models.PackingRequestModel;

namespace ImportExport.UI.Repository.CommonRepository
{
    public class RCommon : ICommon
    {
        private Context _context;
        private FileServerModel server=new FileServerModel();
        private ICommon _common;
        string strMsg = "";

        public RCommon(Context context)
        {
            _context = context;
        }


        public IQueryable<DropDownBind> GetItemType()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETITEMTYPE");
        }

        public IQueryable<DropDownBind> GetUnitPermission(int enroll)
        {
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETUNITBYUSER @ENROLL", ENROLL);
        }

        public IQueryable<DropDownBind> GetWearHouse()
        {
            SqlParameter Type = new SqlParameter("@Type", 91);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETWAREHOUSENAME @Type", Type);
        }


        public IQueryable<DropDownBind> GetShipPointByUser(int type,int userid,int unitid)
        {
            SqlParameter TYPE = new SqlParameter("@TYPE", type);
            SqlParameter USERID = new SqlParameter("@USERID", userid);
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            SqlParameter YSNENABLED = new SqlParameter("@YSNENABLED", 1);

            return _context.DropDownBind.FromSqlRaw("Exec SPGETWAREHOUSENAME @TYPE,@USERID,@UNITID,@YSNENABLED", TYPE,USERID, UNITID, YSNENABLED);
        }

        public IQueryable<DropDownBind> GetSalesType()
        {
            SqlParameter Type = new SqlParameter("@Type", 91);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETSALESTYPE @Type", Type);
        }

        public IQueryable<DropDownBind> GetCreditType()
        {
            SqlParameter Type = new SqlParameter("@Type", 91);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETCREDITTYPE @Type", Type);
        }
        public void ErrorLog(string vPROCESSCODE, string vERRORDETAILS, string vModuleCode, string vPROCESSNAME, int vUnitID, int vDocumentCreatedBy, string vDescription)
        {
            SqlParameter PROCESSCODE = new SqlParameter("@PROCESSCODE", vPROCESSCODE);
            SqlParameter ERRORDETAILS = new SqlParameter("@ERRORDETAILS", vERRORDETAILS);
            SqlParameter ModuleCode = new SqlParameter("@ModuleCode", vModuleCode);
            SqlParameter ProcessName = new SqlParameter("@ProcessName", vPROCESSNAME);
            SqlParameter UnitID = new SqlParameter("@UnitID", vUnitID);
            SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", vDocumentCreatedBy);
            SqlParameter Description = new SqlParameter("@Description", vDescription);
            _context.Database.ExecuteSqlRaw("Exec SPErrorLog @PROCESSCODE,@ERRORDETAILS,@ModuleCode,@PROCESSNAME,@UNITID,@DOCUMENTCREATEDBY,@Description", PROCESSCODE, ERRORDETAILS, ModuleCode, ProcessName, UnitID, DOCUMENTCREATEDBY, Description);
        }

        
        public IQueryable<ViewDocStatus> GetDocStatus(int processid,string modulecode,int unitid)
        {
            SqlParameter PROCESSID = new SqlParameter("@PROCESSID", processid);
            SqlParameter MODULECODE = new SqlParameter("@MODULECODE", modulecode);
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.ViewDocStatus.FromSqlRaw("Exec SPGETVIEWDOCSTATUS @PROCESSID,@MODULECODE,@UNITID", PROCESSID, MODULECODE, UNITID);
        }

        public IQueryable<ViewDocStatus> GetDocStatusForDocument(int processid, string modulecode, int unitid)
        {
            SqlParameter PROCESSID = new SqlParameter("@PROCESSID", processid);
            SqlParameter MODULECODE = new SqlParameter("@MODULECODE", modulecode);
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.ViewDocStatus.FromSqlRaw("Exec SPGETVIEWDOCSTATUSFORDOCUMENT @PROCESSID,@MODULECODE,@UNITID", PROCESSID, MODULECODE, UNITID);
        }

        public IQueryable<Account> GetAccountInfo()
        {
            SqlParameter ROOTMODULE = new SqlParameter("@ROOTMODULE", enumRootModule.CODE0002.ToString());
            return _context.Account.FromSqlRaw("Exec GETACCOUNTINFO @ROOTMODULE", ROOTMODULE);
        }

        public string FileUpload(IFormFileCollection file, int ProcessID,string ProcessCode, string process,string modulename,string strMessage, int documentcreatedby,int unit)
        {
            var files = file;
            //SqlParameter PROCESS = new SqlParameter("@PROCESS", process);
            if (files.Count > 0)
            {
               
                DataTable fileupload = new DataTable();
                fileupload.Columns.Add("PROCESSID", typeof(int));
                fileupload.Columns.Add("PROCESSCODE", typeof(string));
                fileupload.Columns.Add("PROCESS", typeof(string));
                fileupload.Columns.Add("FILENAME", typeof(string));
                fileupload.Columns.Add("FILESIZE", typeof(string));
                fileupload.Columns.Add("FILETYPE", typeof(string));
                fileupload.Columns.Add("FILEURL", typeof(string));
                fileupload.Columns.Add("DOCUMENTCREATEDBY", typeof(int));


                for (int i = 0; i < files.Count; i++)
                {
                    var vfile = files[i];
                    var originalfileName = vfile.FileName.Trim('"');
                    string fileExtension = Path.GetExtension(originalfileName);
                    long fileSize = vfile.Length;

                    fileupload.Rows.Add(ProcessID, ProcessCode, process, originalfileName, fileSize, fileExtension, "", documentcreatedby);
                }

                try
                {
                    SqlParameter UnitID = new SqlParameter("@UnitID", unit);
                    SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modulename);
                    SqlParameter Enroll = new SqlParameter("@Enroll", documentcreatedby);
                    SqlParameter ProcessName = new SqlParameter("@ProcessName", process);
                    SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);

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
                    strMsg = outParam.Value.ToString();
                }
                catch (Exception ex)
                {
                    _common.ErrorLog("", ex.ToString(), modulename, modulename, unit, documentcreatedby, "");
                    strMsg = "Failed to upload attachment.";
                }
                finally { }

               
            }
            else
            {
                strMsg = "Data Saved Successfully without Attachment.";
            }
            return strMsg;
        }

        public string FileUploadForDocument(IFormFileCollection file, int ProcessLineID, string ProcessHeaderID, string PickPackID, string modulename, string strMessage, int documentcreatedby, int unit)
        {
            var files = file;
            //SqlParameter PROCESS = new SqlParameter("@PROCESS", process);
            if (files.Count > 0)
            {

                DataTable fileupload = new DataTable();
                fileupload.Columns.Add("PROCESSID", typeof(int));
                fileupload.Columns.Add("PROCESSCODE", typeof(string));
                fileupload.Columns.Add("PROCESS", typeof(string));

                fileupload.Columns.Add("FILENAME", typeof(string));
                fileupload.Columns.Add("FILESIZE", typeof(string));
                fileupload.Columns.Add("FILETYPE", typeof(string));
                fileupload.Columns.Add("FILEURL", typeof(string));
                fileupload.Columns.Add("DOCUMENTCREATEDBY", typeof(int));


                for (int i = 0; i < files.Count; i++)
                {
                    var vfile = files[i];
                    var originalfileName = vfile.FileName.Trim('"');
                    string fileExtension = Path.GetExtension(originalfileName);
                    long fileSize = vfile.Length;

                    fileupload.Rows.Add(ProcessLineID, ProcessHeaderID, PickPackID, originalfileName, fileSize, fileExtension, "", documentcreatedby);
                }

                try
                {
                    SqlParameter UnitID = new SqlParameter("@UnitID", unit);
                    SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modulename);
                    SqlParameter Enroll = new SqlParameter("@Enroll", documentcreatedby);
                    SqlParameter ProcessName = new SqlParameter("@ProcessName", PickPackID);
                    SqlParameter MessageName = new SqlParameter("@MessageName", strMessage);


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
                    detailsparam.TypeName = "TypeFileUploadForDocument";
                    detailsparam.SqlValue = fileupload;


                    _context.Database.ExecuteSqlRaw("Exec SPSaveFileUploadForDocument @typefileupload,@UnitID,@ModuleCode,@Enroll,@ProcessName,@MessageName,@Msg output", detailsparam, UnitID, ModuleCode, Enroll, ProcessName, MessageName, outParam);
                    strMsg = outParam.Value.ToString();
                }
                catch (Exception ex)
                {
                    _common.ErrorLog("", ex.ToString(), modulename, modulename, unit, documentcreatedby, "");
                    strMsg = "Failed to upload attachment.";
                }
                finally { }


            }
            else
            {
                strMsg = "Data Saved Successfully without Attachment.";
            }
            return strMsg;
        }

        public IQueryable<FileModel> GetDocument(int id,string modulecode)
        {
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter ModuleCode = new SqlParameter("@ModuleCode", modulecode);
            return _context.FileModel.FromSqlRaw("Exec SPGetDocument @id,@ModuleCode", ID, ModuleCode);
        }

        public IQueryable<DocumentStatus> GetStatusData()
        {
            return _context.DocumentStatus.FromSqlRaw("Exec SPGetDocumentStatus");
        }
         public IQueryable<DropDownBind> GetTermsAndCondition()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGetTermsAndCondition");
        }

        public IQueryable<DropDownBind> GetRootDocumentList(int unit)
        {
            SqlParameter unitid = new SqlParameter("@unit", unit);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETROOTDOCMENTLIST @unit", unitid);
        }

        public IQueryable<VatModel> GetVatData()
        {
            SqlParameter Type = new SqlParameter("@Type", 1);
            SqlParameter VatID = new SqlParameter("@VatID", 1);
            return _context.VatModel.FromSqlRaw("Exec spGetVatDetails @Type,@VatID", Type, VatID);
        }

        public IQueryable<DiscountModel> GetDiscountData()
        {
            SqlParameter Type = new SqlParameter("@Type", 1);
            SqlParameter DisID = new SqlParameter("@DisID", 1);
            return _context.DiscountModel.FromSqlRaw("Exec spGetDiscountDetails @Type,@DisID", Type, DisID);
        }

        public IQueryable<ToleranceModel> GetTolerance()
        {
            SqlParameter Type = new SqlParameter("@Type", 1);
            SqlParameter DisID = new SqlParameter("@DisID", 1);    ///false parametre for matching
            return _context.ToleranceModel.FromSqlRaw("Exec SPGetTolerance @Type,@DisID", Type, DisID);
        }

        public IQueryable<ToleranceModel> GetToleranceData(int id)
        {
            SqlParameter Type = new SqlParameter("@Type", 2);
            SqlParameter DisID = new SqlParameter("@DisID", id);
            return _context.ToleranceModel.FromSqlRaw("Exec SPGetTolerance @Type,@DisID", Type, DisID);
        }

        public IQueryable<DropDownBind> GetPickPackNumber(string Prefix)
        {
            SqlParameter Type = new SqlParameter("@Type", 1);
            SqlParameter PPrefix = new SqlParameter("@Prefix", Prefix);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETPICKPACKNUMBER @Type,@Prefix", Type, PPrefix);
        }

        public IQueryable<FGModel> GetFGlist(int UnitID, string Prefix)
        {
            SqlParameter PUnitID = new SqlParameter("@UnitID", UnitID);
            SqlParameter PPrefix = new SqlParameter("@Prefix", Prefix);
            return _context.FGModel.FromSqlRaw("Exec SPGetFGName @UnitID,@Prefix", PUnitID, PPrefix);
        }

        public IQueryable<VatModel> GetVatCal(int id)
        {
            SqlParameter Type = new SqlParameter("@Type", 2);
            SqlParameter VatID = new SqlParameter("@VatID", id);
            return _context.VatModel.FromSqlRaw("Exec spGetVatDetails @Type,@VatID", Type, VatID);
        }

        public IQueryable<DiscountModel> GetDisCal(int id)
        {
            SqlParameter Type = new SqlParameter("@Type", 2);
            SqlParameter DisID = new SqlParameter("@DisID", id);
            return _context.DiscountModel.FromSqlRaw("Exec spGetDiscountDetails @Type,@DisID", Type, DisID);
        }

        public IQueryable<CustomerInfo> GetCustomerInfo(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfo @Prefix", Prefix);
        }

        public IQueryable<CustomerInfo> GetCustomerInfoShort(int id)
        {
            SqlParameter cusid = new SqlParameter("@id", id);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfoShort @id", cusid);
        }


        public IQueryable<CustomerInfo> GetCustomerInfoShortPISC(int id)
        {
            SqlParameter cusid = new SqlParameter("@id", id);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfoShortPISC @id", cusid);
        }

        public IQueryable<SellerInfo> GetSellerInfo(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfo @Prefix", Prefix);
        }


        public IQueryable<CustomerInfo> GetCustomerInfoShortForBusiness(int typeid,int id)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCustomerInfoShortForBusiness @TYPEID,@ID", TYPEID,ID);
        }

        public IQueryable<SellerInfo> GetSellerInfoShortForBusiness(int typeid,int id)
        {
            SqlParameter TYPEID = new SqlParameter("@TYPEID", typeid);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfoShortForBusiness @TYPEID,@ID", TYPEID, ID);
        }

        public IQueryable<AgreementType> GetAgreementType()
        {
            return _context.AgreementType.FromSqlRaw("Exec GetAgreementtype");
        }

        public IQueryable<DropDownBind> GetApplicantList() ////
        {
            return _context.DropDownBind.FromSqlRaw("SELECT intCusID AS id, strName AS name FROM ERP_SAD.dbo.tblCustomer where intUnitID=91  ORDER BY strName" //WHERE ysnCustActive = 1
                                                            );
        }

        public IQueryable<DropDownBind> GetLCNoList()
        {
            return _context.DropDownBind.FromSqlRaw(@"
        SELECT DISTINCT
            ID AS id,
            LCNUMBER AS name
        FROM ABGAPIS.dbo.TBLLCDETAILS
        WHERE ISACTIVE = 1
          AND LCNUMBER IS NOT NULL
        ORDER BY LCNUMBER");
        }

        public IQueryable<DropDownBind> GetBankList()
        {
            return _context.DropDownBind.FromSqlRaw(
                "Exec spGetBuyerBank"

//        @"
//SELECT
//    ID AS id,
//    CUSTOMERBANKNAME AS name
//FROM ABGAPIS.dbo.TBLCUSTOMERBANK
//WHERE ISACTIVE = 1
//ORDER BY CUSTOMERBANKNAME"

);
        }




        public IQueryable<DropDownBind> GetRmList()
        {
            return _context.DropDownBind.FromSqlRaw(@"
        SELECT
            MIN(ID) AS id,
            RMBY AS name
        FROM ABGAPIS.dbo.TBLLCVSBILL
        WHERE ISACTIVE = 1
          AND RMBY IS NOT NULL
          AND LTRIM(RTRIM(RMBY)) <> ''
        GROUP BY RMBY
        ORDER BY RMBY");
        }






        public IQueryable<DropDownBind> GetRmDateList()
        {
            return _context.DropDownBind.FromSqlRaw(@"
        SELECT
            ROW_NUMBER() OVER (ORDER BY RMDATE) AS id,
            CONVERT(VARCHAR(10), RMDATE, 101) AS name
        FROM
        (
            SELECT DISTINCT RMDATE
            FROM ABGAPIS.dbo.TBLLCVSBILL
            WHERE ISACTIVE = 1
              AND RMDATE IS NOT NULL
        ) X");
        }

        public IQueryable<DropDownBind> GetAitCertificateStatusList()
        {
            return _context.DropDownBind.FromSqlRaw(@"
        SELECT
            ID AS id,
            STATUS AS name
        FROM ABGAPIS.dbo.TBLAITCERTIFICATESTATUS
        ORDER BY STATUS");
        }

        //

        public List<FileStatusModel> GetActiveFiles(string processCode)
        {
            SqlParameter PROCESSCODE = new SqlParameter("@PROCESSCODE", processCode);

            return _context.Set<FileStatusModel>()
                .FromSqlRaw("EXEC SPGETACTIVEFILES @PROCESSCODE", PROCESSCODE)
                .ToList();
        }

        public string DeleteFileFromDB(string processCode, string fileName)
        {
            _context.Database.ExecuteSqlRaw(@"
        UPDATE ABGAPIS.dbo.TBLFILEDETAILS
        SET ISACTIVE = 0
        WHERE LTRIM(RTRIM(PROCESSCODE)) = LTRIM(RTRIM({0}))
          AND LOWER(LTRIM(RTRIM(FILENAME))) = LOWER(LTRIM(RTRIM({1})))",
                processCode, fileName);

            return "Deleted";
        }

        public string DeleteFilesFromDB(string processCode, string fileNames)
        {
            var files = Newtonsoft.Json.JsonConvert.DeserializeObject<List<string>>(fileNames);

            foreach (var fileName in files)
            {
                _context.Database.ExecuteSqlRaw(@"
            UPDATE ABGAPIS.dbo.TBLFILEDETAILS
            SET ISACTIVE = 0
            WHERE LTRIM(RTRIM(PROCESSCODE)) = LTRIM(RTRIM({0}))  
              AND LOWER(LTRIM(RTRIM(FILENAME))) = LOWER(LTRIM(RTRIM({1})))",
                    processCode, fileName);
            }

            return "Deleted";
        }






        public IQueryable<DropDownBind> GetShipmentMode()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETSHIPMENTMODE");
        }

        public IQueryable<DropDownBind> GetTransportationMode()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETTRANSPORTATIONMODE");
        }

        public IQueryable<DropDownBind> GetCurrency()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETCURRENCY");
        }
        public IQueryable<DropDownBind> GETLOADINGBY()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETLOADINGBY");
        }
        public IQueryable<DropDownBind> GetIncoTerm()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETINCOTERM");
        }

        public IQueryable<DropDownBind> GetBuyerBankInfo()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETBUYERBANK");
        }

        public IQueryable<DropDownBind> GetShipmentCountry()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETSHIPMENTCOUNTRY");
        }

        public IQueryable<DropDownBind> GetToShipmentCountry()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETTOSHIPMENT");
        }
        public IQueryable<DropDownBind> GetDelTerm()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETDELTERM");
        }

        public IQueryable<DropDownBind> GetSQType(int unitid)
        {
            SqlParameter UNIT = new SqlParameter("@UNIT", unitid);
            return _context.DropDownBind.FromSqlRaw("Exec GETSQTYPE @UNIT",UNIT);
        }

        public IQueryable<DropDownBind> GetPaymentTerm()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETPAYMENTTERM");
        }

        public IQueryable<DropDownBind> GetLoadingport()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETLOADINGPORT");
        }

        public IQueryable<DropDownBind> GetConfirm()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETCONFIRM");
        }

        public IQueryable<DropDownBind> GetBankInfo(int pino)
        {
            SqlParameter PINO = new SqlParameter("@PINO", pino);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETBANKINFO @PINO", PINO);
        }

        public IQueryable<DropdownLong> GetHSCode(string prefix)
        {
            SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
            return _context.DropDownBindLong.FromSqlRaw("Exec SPGETHSCODE @Prefix", Prefix);
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

                _context.Database.ExecuteSqlRaw("Exec SPRejected @unitid,@ModuleCode,@Enroll,@ID,@Remarks,@ProcessName,@RejectCode,@RejectedMsg,@Notification, @Msg output", UnitID, ModuleCode, Enroll, ID, Remarks, RejectedCode, RejectedMsg,Notification,ProcessName, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch(Exception ex)
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
            catch(Exception ex)
            {
                _common.ErrorLog("", ex.ToString(), modeulecode, processname, unitid, enroll, "");
            }
            finally { }
            return strMsg;
        }


        public IQueryable<DropDownBind> GetPIInfo(int type, string prefix)
        {
            if(type==0)    //search for price confirm
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
                
                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if(type==1)   //search for lc details
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);
               
                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if (type == 2)   //search for production/packing request.
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);

                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if (type == 3)   //search PI for Price Confirm.
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);

                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if (type == 4)   //search PI for Price Confirm.
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);

                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if (type == 91)   //search PI for LC.
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);

                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            else if(type== 7)
            {
                SqlParameter Type = new SqlParameter("@Type", type);
                SqlParameter Prefix = new SqlParameter("@Prefix", prefix);

                return _context.DropDownBind.FromSqlRaw("Exec GETSPPISC @Type,@Prefix", Type, Prefix);
            }
            return null;
        }

        public IQueryable<SellerInfo> GetSellerInfoShortPISC(int id)
        {
            SqlParameter sellerid = new SqlParameter("@id", id);
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfoShortPISC @id", sellerid);
        }

        public IQueryable<SellerInfo> GetSellerInfoShortGeneral(int id)
        {
            SqlParameter sellerid = new SqlParameter("@id", id);
            return _context.SellerInfo.FromSqlRaw("Exec GetSellerInfoShortGeneral @id", sellerid);
        }

        public IQueryable<CustomerInfo> GetCustomerInfoShortGeneral(int id)
        {
            SqlParameter sellerid = new SqlParameter("@id", id);
            return _context.CustomerInfo.FromSqlRaw("Exec GetCusInfoShortGeneral @id", sellerid);
        }

        public IQueryable<PackingRequestFromToShipment> GetShipment(int id)
        {
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.PackingRequestFromToShipment.FromSqlRaw("EXEC SPGetTextFromShipmentAndCountry @ID", ID);
        }

        public IQueryable<DropDownBind> GetToShipment()
        {
            return _context.DropDownBind.FromSqlRaw("EXEC SPGETTOSHIPMENT");
        }

        public string SaveItemSpecific(ItemSpecification obj)
        {
            try
            {
                SqlParameter ITEMID = new SqlParameter("@ITEMID", obj.ITEMID);
                SqlParameter LENGTH = new SqlParameter("@LENGTH", obj.LENGTH==null ? "" : obj.LENGTH);
                SqlParameter WIDTH = new SqlParameter("@WIDTH", obj.WIDTH == null ? "" : obj.WIDTH);
                SqlParameter HEIGHT = new SqlParameter("@HEIGHT", obj.HEIGHT == null ? "" : obj.HEIGHT);
                SqlParameter THICKNESS = new SqlParameter("@THICKNESS", obj.THICKNESS == null ? "" : obj.THICKNESS);

                SqlParameter WEIGHT = new SqlParameter("@WEIGHT", obj.WEIGHT == null ? "" : obj.WEIGHT);
                SqlParameter COLOR = new SqlParameter("@COLOR", obj.COLOR == null ? "" : obj.COLOR);
                SqlParameter SIZE = new SqlParameter("@SIZE", obj.SIZE == null ? "" : obj.SIZE);
                SqlParameter DESIGN = new SqlParameter("@DESIGN", obj.DESIGN == null ? "" : obj.DESIGN);
                SqlParameter PACKAGING = new SqlParameter("@PACKAGING", obj.PACKAGING == null ? "" : obj.PACKAGING);

                SqlParameter MATERIAL = new SqlParameter("@MATERIAL", obj.MATERIAL == null ? "" : obj.MATERIAL);
                SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", obj.CONSTRUCTION == null ? "" : obj.CONSTRUCTION);
                SqlParameter PLY = new SqlParameter("@PLY", obj.PLY == null ? "" : obj.PLY);
                SqlParameter CORE = new SqlParameter("@CORE", obj.CORE == null ? "" : obj.CORE);
                SqlParameter TREATMENTDIRECTION = new SqlParameter("@TREATMENTDIRECTION", obj.TREATMENTDIRECTION == null ? "" : obj.TREATMENTDIRECTION);

                SqlParameter OTHERS = new SqlParameter("@OTHERS", obj.OTHERS == null ? "" : obj.OTHERS);
                SqlParameter REMARK = new SqlParameter("@REMARK", obj.REMARK == null ? "" : obj.REMARK);


                SqlParameter SESSIONID = new SqlParameter("@SESSIONID", obj.SESSIONID == null ? "" : obj.SESSIONID);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", obj.DOCUMENTCREATEDBY);

                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPSAVEITEMSPECIFIC @ITEMID,@LENGTH,@WIDTH,@HEIGHT,@THICKNESS,@WEIGHT," +
                    "@COLOR,@SIZE,@DESIGN,@PACKAGING,@MATERIAL,@CONSTRUCTION,@CONSTRUCTION,@PLY,@CORE,@OTHERS,@REMARK,@SESSIONID,@DOCUMENTCREATEDBY, @Msg output",
                    ITEMID, LENGTH, WIDTH, HEIGHT, THICKNESS, THICKNESS, WEIGHT, COLOR, SIZE, DESIGN, PACKAGING, MATERIAL,
                    CONSTRUCTION, PLY, CORE, TREATMENTDIRECTION, OTHERS, REMARK, SESSIONID, DOCUMENTCREATEDBY, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch(Exception)
            {

            }
            return null;
        }

        public string UpdateItemSpecific(ItemSpecification obj,int id, int processid, string process, string processcode)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", obj.ITEMID);
                SqlParameter LENGTH = new SqlParameter("@LENGTH", obj.LENGTH == null ? "" : obj.LENGTH);
                SqlParameter WIDTH = new SqlParameter("@WIDTH", obj.WIDTH == null ? "" : obj.WIDTH);
                SqlParameter HEIGHT = new SqlParameter("@HEIGHT", obj.HEIGHT == null ? "" : obj.HEIGHT);
                SqlParameter THICKNESS = new SqlParameter("@THICKNESS", obj.THICKNESS == null ? "" : obj.THICKNESS);

                SqlParameter WEIGHT = new SqlParameter("@WEIGHT", obj.WEIGHT == null ? "" : obj.WEIGHT);
                SqlParameter COLOR = new SqlParameter("@COLOR", obj.COLOR == null ? "" : obj.COLOR);
                SqlParameter SIZE = new SqlParameter("@SIZE", obj.SIZE == null ? "" : obj.SIZE);
                SqlParameter DESIGN = new SqlParameter("@DESIGN", obj.DESIGN == null ? "" : obj.DESIGN);
                SqlParameter PACKAGING = new SqlParameter("@PACKAGING", obj.PACKAGING == null ? "" : obj.PACKAGING);

                SqlParameter MATERIAL = new SqlParameter("@MATERIAL", obj.MATERIAL == null ? "" : obj.MATERIAL);
                SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", obj.CONSTRUCTION == null ? "" : obj.CONSTRUCTION);
                SqlParameter PLY = new SqlParameter("@PLY", obj.PLY == null ? "" : obj.PLY);
                SqlParameter CORE = new SqlParameter("@CORE", obj.CORE == null ? "" : obj.CORE);
                SqlParameter TREATMENTDIRECTION = new SqlParameter("@TREATMENTDIRECTION", obj.TREATMENTDIRECTION == null ? "" : obj.TREATMENTDIRECTION);

                SqlParameter OTHERS = new SqlParameter("@OTHERS", obj.OTHERS == null ? "" : obj.OTHERS);
                SqlParameter REMARK = new SqlParameter("@REMARK", obj.REMARK == null ? "" : obj.REMARK);

                SqlParameter PROCESSID = new SqlParameter("@PROCESSID", processid);
                SqlParameter PROCESS = new SqlParameter("@PROCESS", process);
                SqlParameter PROCESSCODE = new SqlParameter("@PROCESSCODE", processcode);

                SqlParameter SESSIONID = new SqlParameter("@SESSIONID", obj.SESSIONID == null ? "" : obj.SESSIONID);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", obj.DOCUMENTCREATEDBY);


                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEITEMSPECIFIC @ID,@ITEMID,@LENGTH,@WIDTH,@HEIGHT,@THICKNESS,@WEIGHT," +
                    "@COLOR,@SIZE,@DESIGN,@PACKAGING,@MATERIAL,@CONSTRUCTION,@CONSTRUCTION,@PLY,@CORE,@OTHERS,@REMARK,@PROCESSID,@PROCESS,@PROCESSCODE,@SESSIONID,@DOCUMENTCREATEDBY, @Msg output",
                    ID, ITEMID, LENGTH, WIDTH, HEIGHT, THICKNESS, THICKNESS, WEIGHT, COLOR, SIZE, DESIGN, PACKAGING, MATERIAL,
                    CONSTRUCTION, PLY, CORE, TREATMENTDIRECTION, OTHERS, REMARK, PROCESSID, PROCESS, PROCESSCODE, SESSIONID, DOCUMENTCREATEDBY, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception)
            {

            }
            return null;
        }

        public string UpdateItemSpecificForSQ(ItemSpecification obj, int id, int processid, string process, string processcode)
        {
            try
            {
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter ITEMID = new SqlParameter("@ITEMID", obj.ITEMID);
                SqlParameter LENGTH = new SqlParameter("@LENGTH", obj.LENGTH == null ? "" : obj.LENGTH);
                SqlParameter WIDTH = new SqlParameter("@WIDTH", obj.WIDTH == null ? "" : obj.WIDTH);
                SqlParameter HEIGHT = new SqlParameter("@HEIGHT", obj.HEIGHT == null ? "" : obj.HEIGHT);
                SqlParameter THICKNESS = new SqlParameter("@THICKNESS", obj.THICKNESS == null ? "" : obj.THICKNESS);

                SqlParameter WEIGHT = new SqlParameter("@WEIGHT", obj.WEIGHT == null ? "" : obj.WEIGHT);
                SqlParameter COLOR = new SqlParameter("@COLOR", obj.COLOR == null ? "" : obj.COLOR);
                SqlParameter SIZE = new SqlParameter("@SIZE", obj.SIZE == null ? "" : obj.SIZE);
                SqlParameter DESIGN = new SqlParameter("@DESIGN", obj.DESIGN == null ? "" : obj.DESIGN);
                SqlParameter PACKAGING = new SqlParameter("@PACKAGING", obj.PACKAGING == null ? "" : obj.PACKAGING);

                SqlParameter MATERIAL = new SqlParameter("@MATERIAL", obj.MATERIAL == null ? "" : obj.MATERIAL);
                SqlParameter CONSTRUCTION = new SqlParameter("@CONSTRUCTION", obj.CONSTRUCTION == null ? "" : obj.CONSTRUCTION);
                SqlParameter PLY = new SqlParameter("@PLY", obj.PLY == null ? "" : obj.PLY);
                SqlParameter CORE = new SqlParameter("@CORE", obj.CORE == null ? "" : obj.CORE);
                SqlParameter TREATMENTDIRECTION = new SqlParameter("@TREATMENTDIRECTION", obj.TREATMENTDIRECTION == null ? "" : obj.TREATMENTDIRECTION);

                SqlParameter OTHERS = new SqlParameter("@OTHERS", obj.OTHERS == null ? "" : obj.OTHERS);
                SqlParameter REMARK = new SqlParameter("@REMARK", obj.REMARK == null ? "" : obj.REMARK);

                SqlParameter PROCESSID = new SqlParameter("@PROCESSID", processid);
                SqlParameter PROCESS = new SqlParameter("@PROCESS", process);
                SqlParameter PROCESSCODE = new SqlParameter("@PROCESSCODE", processcode);

                SqlParameter SESSIONID = new SqlParameter("@SESSIONID", obj.SESSIONID == null ? "" : obj.SESSIONID);
                SqlParameter DOCUMENTCREATEDBY = new SqlParameter("@DOCUMENTCREATEDBY", obj.DOCUMENTCREATEDBY);


                var outParam = new SqlParameter
                {
                    ParameterName = "@Msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec SPUPDATEITEMSPECIFICFORSQ @ID,@ITEMID,@LENGTH,@WIDTH,@HEIGHT,@THICKNESS,@WEIGHT," +
                    "@COLOR,@SIZE,@DESIGN,@PACKAGING,@MATERIAL,@CONSTRUCTION,@CONSTRUCTION,@PLY,@CORE,@OTHERS,@REMARK,@PROCESSID,@PROCESS,@PROCESSCODE,@SESSIONID,@DOCUMENTCREATEDBY, @Msg output",
                    ID, ITEMID, LENGTH, WIDTH, HEIGHT, THICKNESS, THICKNESS, WEIGHT, COLOR, SIZE, DESIGN, PACKAGING, MATERIAL,
                    CONSTRUCTION, PLY, CORE, TREATMENTDIRECTION, OTHERS, REMARK, PROCESSID, PROCESS, PROCESSCODE, SESSIONID, DOCUMENTCREATEDBY, outParam);
                strMsg = outParam.Value.ToString();
                return strMsg;
            }
            catch (Exception)
            {

            }
            return null;
        }

        public IQueryable<ItemSpecification> GetItemSpecification(int itemid,string number)
        {
            SqlParameter ITEMID = new SqlParameter("@ITEMID", itemid);
            SqlParameter NUMBER = new SqlParameter("@NUMBER", number);

            return _context.ItemSpecification.FromSqlRaw("Exec SPGETITEMSPECIFIC @ITEMID,@NUMBER", ITEMID, NUMBER);
        }

        public string Cancled(int UnitID, string Modulecode, int Enroll, int id, int remarks)
        {
            try
            {
                SqlParameter unitID = new SqlParameter("@unitid", UnitID);
                SqlParameter moduleCode = new SqlParameter("@ModuleCode", Modulecode);
                SqlParameter enroll = new SqlParameter("@Enroll", Enroll);
                SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter Remarks = new SqlParameter("@Remarks", remarks);



                var outParam = new SqlParameter
                {
                    ParameterName = "@msg",
                    Size = 100,
                    SqlDbType = System.Data.SqlDbType.Char,
                    Direction = System.Data.ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("Exec sprcancle @unitid,@ModuleCode,@Enroll,@ID,@Remarks,@msg output", unitID, moduleCode, enroll, ID, Remarks, outParam);
                strMsg = outParam.Value.ToString();
            }
            catch
            {

            }
            finally { }
            return strMsg;
        }

        public string Ropen(int UnitID, string Modulecode, int Enroll, int type, int id)
        {
            if (type == 1)
            {
                try
                {
                    SqlParameter unitID = new SqlParameter("@unitid", UnitID);
                    SqlParameter moduleCode = new SqlParameter("@ModuleCode", Modulecode);
                    SqlParameter enroll = new SqlParameter("@Enroll", Enroll);
                    SqlParameter ID = new SqlParameter("@sq", id);




                    var outParam = new SqlParameter
                    {
                        ParameterName = "@msg",
                        Size = 100,
                        SqlDbType = System.Data.SqlDbType.Char,
                        Direction = System.Data.ParameterDirection.Output
                    };

                    _context.Database.ExecuteSqlRaw("Exec sprSQNEWINSERTAFTERREOPEN @sq,@unitid,@ModuleCode,@Enroll,@msg output", unitID, moduleCode, enroll, ID, outParam);
                    strMsg = outParam.Value.ToString();
                }
                catch
                {

                }
                finally { }
                return strMsg;
            }
            else
            {
                try
                {
                    string menu = "PI00001";
                    SqlParameter unitID = new SqlParameter("@unitid", UnitID);
                    SqlParameter moduleCode = new SqlParameter("@ModuleCode", menu);
                    SqlParameter enroll = new SqlParameter("@Enroll", Enroll);
                    SqlParameter ID = new SqlParameter("@pi", id);




                    var outParam = new SqlParameter
                    {
                        ParameterName = "@msg",
                        Size = 100,
                        SqlDbType = System.Data.SqlDbType.Char,
                        Direction = System.Data.ParameterDirection.Output
                    };

                    _context.Database.ExecuteSqlRaw("Exec sprPINEWINSERTAFTERREOPEN @pi,@unitid,@ModuleCode,@Enroll,@msg output", unitID, moduleCode, enroll, ID, outParam);
                    strMsg = outParam.Value.ToString();
                }
                catch
                {

                }
                finally { }
                return strMsg;
            }

        }

        public IQueryable<DropDownBind> GetFGUOM(int unitid)
        {
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETUOM @UNITID", UNITID);
        }

        public IQueryable<DropDownBind64Base> GetTreatmentDirection(int unitid)
        {
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.DropDownBind64Base.FromSqlRaw("Exec SPGETTREATMENTDIRECTION @UNITID", UNITID);
        }

        public IQueryable<DropDownBind64Base> GetBiaxFlimCore(int unitid)
        {
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.DropDownBind64Base.FromSqlRaw("Exec SPGETBIAXFLIMCOREID @UNITID", UNITID);
        }

        public IQueryable<DropDownBind> GetUOMForAll(int unitid)
        {
            SqlParameter UNITID = new SqlParameter("@UNITID", unitid);
            return _context.DropDownBind.FromSqlRaw("Exec SPGETUOMFORALL @UNITID", UNITID);
        }

        public async Task<IEnumerable<TBLSize>> GetSize(int unitid,string prefix)
        {
            if(string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLSize>();

            return await _context.TBLSize.Where(s => EF.Functions.Like(s.Size, $"%{prefix}%"))
                                                  .OrderBy(s => s.Size)
                                                  .Select(s => new TBLSize
                                                  {
                                                      ID = s.ID,
                                                      Size = s.Size
                                                  })
                                                  .ToListAsync();
        }

        public async Task<IEnumerable<TBLConstruction>> GetConstruction(int unitid, string prefix)
        {
            if (string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLConstruction>();

            return await _context.TBLConstruction.Where(s => EF.Functions.Like(s.Construction, $"%{prefix}%"))
                                                  .OrderBy(s => s.Construction)
                                                  .Select(s => new TBLConstruction
                                                  {
                                                      ID = s.ID,
                                                      Construction = s.Construction
                                                  })
                                                  .ToListAsync();
        }


        public async Task<IEnumerable<TBLWeight>> GetWeight(int unitid, string prefix)
        {
            if (string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLWeight>();

            return await _context.TBLWeight.Where(s => EF.Functions.Like(s.Weight, $"%{prefix}%"))
                                                  .OrderBy(s => s.Weight)
                                                  .Select(s => new TBLWeight
                                                  {
                                                      ID = s.ID,
                                                      Weight = s.Weight
                                                  })
                                                  .ToListAsync();
        }


        public async Task<IEnumerable<TBLSlit>> GetSlit(int unitid, string prefix)
        {
            if (string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLSlit>();

            return await _context.TBLSlit.Where(s => EF.Functions.Like(s.Slit, $"%{prefix}%"))
                                                  .OrderBy(s => s.Slit)
                                                  .Select(s => new TBLSlit
                                                  {
                                                      ID = s.ID,
                                                      Slit = s.Slit
                                                  })
                                                  .ToListAsync();
        }


        public async Task<IEnumerable<TBLScrim>> GetScrim(int unitid, string prefix)
        {
            if (string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLScrim>();

            return await _context.TBLScrim.Where(s => EF.Functions.Like(s.Scrim, $"%{prefix}%"))
                                                  .OrderBy(s => s.Scrim)
                                                  .Select(s => new TBLScrim
                                                  {
                                                      ID = s.ID,
                                                      Scrim = s.Scrim
                                                  })
                                                  .ToListAsync();
        }


        public async Task<IEnumerable<TBLQuality>> GetQuality(int unitid, string prefix)
        {
            if (string.IsNullOrWhiteSpace(prefix))
                return Enumerable.Empty<TBLQuality>();

            return await _context.TBLQuality.Where(s => EF.Functions.Like(s.Quality, $"%{prefix}%"))
                                                  .OrderBy(s => s.Quality)
                                                  .Select(s => new TBLQuality
                                                  {
                                                      ID = s.ID,
                                                      Quality = s.Quality
                                                  })
                                                  .ToListAsync();
        }

        public IQueryable<DropDownBind> GetUnit(int unitid)
        {
            throw new NotImplementedException();
        }

        public IQueryable<DropDownBind> GetTransportAgency()
        {
            return _context.DropDownBind.FromSqlRaw("Exec SPGETTRANSPORTAGENCY");
        }
    }
}
