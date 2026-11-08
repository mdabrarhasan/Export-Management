using ExcelDataReader;
using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.QuotationService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http.Headers;

namespace ImportExport.UI.Controllers
{
    public class QuotationController : Controller
    {
        private readonly IQuotationLanding obj;
        private readonly IFileUpload objfileupload;
        private readonly ICommon objcommon;
        string msg = "";
        UserInfo userinfo = new UserInfo();
        
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult PIPrint(int id)
        {
            HttpContext.Session.SetInt32("id",id);
            return View();

        }

        public QuotationController(IQuotationLanding ql, IFileUpload fupload, ICommon common)
        {
            obj = ql;
            objfileupload = fupload;
            objcommon = common;
            userinfo.UnitID = 91;
            //userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        }

        [HttpGet]
        public JsonResult GetHeaderPrint(int id, int typeid)
        {
            var li = obj.GetHeaderPrint(id, typeid);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetLinePrint(int id)
        {
            var li = obj.GetLinePrint(id);
            return Json(li);
        }


        public JsonResult FileUpload()
        {
            //var file = Request.Form.Files[0];
            var file = Request.Form.Files["uploadFile"];
            IExcelDataReader reader = null;
            DataSet excelRecords;

            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            string fileExtension = Path.GetExtension(fileName);
            long fileSize = file.Length;
            
            //SqlParameter PROCESS = new SqlParameter("@PROCESS", process);
            if (file.Length > 0)
            {
                if (fileExtension.ToLower() == ".xls" || fileExtension.ToLower() == ".xlsx")
                {
                    BinaryReader b = new BinaryReader(file.OpenReadStream());
                    int count = (int)file.Length;
                    byte[] binData = b.ReadBytes(count);

                    using (MemoryStream stream = new MemoryStream(binData))
                    {
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                        excelRecords = reader.AsDataSet();
                    }
                   
                    
                    reader.Close();

                    var finalRecords = excelRecords.Tables[0];
                    DataTable dt = new DataTable();
                    dt.Columns.Add("strOCFNo", typeof(string));
                    dt.Columns.Add("strProductCode", typeof(string));
                    dt.Columns.Add("strProductName", typeof(string));
                    dt.Columns.Add("intProductID", typeof(int));
                    dt.Columns.Add("decThickness", typeof(decimal));
                    dt.Columns.Add("decWidth", typeof(decimal));
                    dt.Columns.Add("decLength", typeof(decimal));
                    dt.Columns.Add("strTreatmentLavel", typeof(string));
                    dt.Columns.Add("strTreatmentDirection", typeof(string));
                    dt.Columns.Add("intTreatmentDirectionID", typeof(int));
                    dt.Columns.Add("strCoreID", typeof(string));
                    dt.Columns.Add("intCoreID", typeof(int));
                    dt.Columns.Add("strRealOD", typeof(string));
                    dt.Columns.Add("intOrderQty", typeof(int));
                    dt.Columns.Add("dteDesiredDateofDelivery", typeof(string));
                    dt.Columns.Add("dteTentativeDateofDelivery", typeof(string));
                    dt.Columns.Add("strUOM", typeof(string));
                    dt.Columns.Add("intUOM", typeof(int));
                    dt.Columns.Add("strRemarks", typeof(string));
                  

                    for (int i = 1; i < finalRecords.Rows.Count; i++)
                    {
                        dt.Rows.Add(finalRecords.Rows[i][0], finalRecords.Rows[i][1], finalRecords.Rows[i][2], finalRecords.Rows[i][3], finalRecords.Rows[i][4], finalRecords.Rows[i][5], finalRecords.Rows[i][6], finalRecords.Rows[i][7], finalRecords.Rows[i][8], finalRecords.Rows[i][9], finalRecords.Rows[i][10], finalRecords.Rows[i][11], finalRecords.Rows[i][12], finalRecords.Rows[i][13],
                                    finalRecords.Rows[i][14], finalRecords.Rows[i][15], finalRecords.Rows[i][16], finalRecords.Rows[i][17], finalRecords.Rows[i][18]
                            );
                    }

                    obj.UploadExcel( dt );
                }
                else
                {

                }
                
            }

            return null;
        }


        [HttpGet]
        public JsonResult GetExcelData()
        {
            var li = obj.GetExcelData();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetOCF(string prefix)
        {
            var li = objcommon.GetPIInfo(4,prefix);
            return Json(li);
        }


        [HttpGet]
        public JsonResult OCFListView(int id)
        {
            var li = obj.GetOCFList(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetOCFItems(int id)
        {
            var li = obj.GetOCFItems(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetQuotationAllView(int typeid,int id)
        {
            if (typeid == 1)                                                                                            //proforma invoice
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetProformaInvoiceView(typeid,id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 2)                                                                                       //sales quotation
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSalesQuotationView(typeid,id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 3)                                                                                       //sport order
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSpotOrderView(typeid,id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 4)                                                                                       //conditional approval
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetConditionalApprovalView(typeid,id, userinfo.Enroll);
                return Json(li);
            }
            return null;
        }

        [HttpGet]
        public JsonResult GetQuotationAllViewOCF(int typeid, int id)
        {
            if (typeid == 1)                                                                                            //proforma invoice
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetProformaInvoiceViewOCF(typeid, id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 2)                                                                                       //sales quotation
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSalesQuotationViewOCF(typeid, id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 3)                                                                                       //sport order
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSpotOrderViewOCF(typeid, id, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 4)                                                                                       //conditional approval
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetConditionalApprovalViewOCF(typeid, id, userinfo.Enroll);
                return Json(li);
            }
            return null;
           
        }


        [HttpGet]
        public JsonResult GetQuotationAll(int typeid)
        {
            if(typeid==1)                                                                                               //proforma invoice
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetProformaInvoice(typeid, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 2)                                                                                       //sales quotation
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSalesQuotation(typeid, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 3)                                                                                       //sport order
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetSpotOrder(typeid, userinfo.Enroll);
                return Json(li);
            }
            else if (typeid == 4)                                                                                       //conditional approval
            {
                userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
                userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
                var li = obj.GetConditionalApproval(typeid, userinfo.Enroll);
                return Json(li);
            }

            return null;
        }

        [HttpGet]
        public JsonResult GetQuotationList()
        {
            var li = obj.GetQuotationList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetFGUOM()
        {
            var li = objcommon.GetFGUOM(91);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetWHName()
        {
            var li = objcommon.GetShipPointByUser(1, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetTreatmentDirection()
        {
            var li = objcommon.GetTreatmentDirection(91);
            return Json(li);
        }
        public JsonResult GetCusInfo(string prefix, int unitid)
        {
            var li = obj.GetCustomerInfo(prefix, unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetBiaxFlimCore()
        {
            var li = objcommon.GetBiaxFlimCore(91);
            return Json(li);
        }

        [HttpPost]
        public JsonResult SavePI(PILanding PI, PILandingDetails[] PID, Hscodes[] HS )
        {
            PI.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            PI.UNITID = 91;
            var li = obj.SavePI(PI, PID,HS);
            return Json(li);
        }

        [HttpPost]
        public JsonResult SaveSQ(SQuatationLanding SQ, PILandingDetails[] SQD)
        {
            SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            SQ.UNITID = 91;
            var li = obj.SaveSQ(SQ, SQD);
            return Json(li);
        }

        [HttpPost]
        public JsonResult SaveConApp(ConditionalApproval SQ, PILandingDetails[] SQD)
        {
            try
            {
                SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
                SQ.UNITID = 91;
                var li = obj.SaveConApp(SQ, SQD);
                return Json(li);
            }
            catch {
                
            }
            return null;
        }

        [HttpPost]
        public JsonResult SaveSpot(SpotOrder SQ, PILandingDetails[] SQD)
        {
            SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            SQ.UNITID = 91;
            var li = obj.SaveSpot(SQ, SQD);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdatePI(PILanding PI)
        {
            PI.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            PI.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.UpdatePI(PI);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateSQ(SQuatationLanding SQ)
        {
            SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            SQ.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.UpdateSQ(SQ);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateSpot(SpotOrder SQ)
        {
            SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            SQ.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.UpdateSpot(SQ);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateConApp(ConditionalApproval SQ)
        {
            SQ.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            SQ.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.UpdateConApp(SQ);
            return Json(li);
        }

        [HttpPost]
        public JsonResult ESaveLine(PILandingDetails[] details, int ID)
        {
            var li = obj.ESaveLine(details, ID,(int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(li);
        }


        [HttpPost]
        public JsonResult UpdateLine(PILandingDetails[] details, int ID)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var lidt = obj.UpdateLine(details, ID, userinfo.UnitID, userinfo.Enroll);
            return Json(lidt);
        }


        [HttpPost]
        public JsonResult DeleteMasterByID(int id, string aggtypeid)
        {
            var lidt = obj.DeletePIMasterByID(id, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"), aggtypeid);
            return Json(lidt);
        }

        [HttpPost]
        public JsonResult DeleteByLineByID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var lidt = obj.DeleteDetailsByID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(lidt);
        }
    }
}
