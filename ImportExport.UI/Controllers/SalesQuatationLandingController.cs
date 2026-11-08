using ExcelDataReader;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.File;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.QuotationService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IO;
using System.Net;
using System.Net.Http.Headers;

namespace ImportExport.UI.Controllers
{
    public class SalesQuatationLandingController : Controller
    {
        
        private readonly ISalesQuatationLanding obj;
        private readonly IFileUpload objfileupload;
        private readonly IFileUpload _fileUpload;
        private readonly ICommon objcommon;
        string msg = "";


        UserInfo userinfo=new UserInfo();
        FileServerModel server=new FileServerModel();

        public SalesQuatationLandingController(ISalesQuatationLanding sql, IFileUpload fupload,ICommon common) 
        { 
            obj = sql;
            objfileupload=fupload;
            _fileUpload = fupload;
            objcommon =common;
            //userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        }

        [HttpPost]
        public JsonResult UpdateFileDetail(int type, string processCode, string fileName)
        {
            var li = obj.UpdateFileDetail(type,processCode,fileName);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetFileDetails(string prefix)
        {
            var li = obj.GetFileDetail(prefix);
            return Json(li);
        }


        public IActionResult Index()
        {
           return View();
        }


        [HttpGet]
        public JsonResult GetSalesQuatationLandingAll()
        {
            userinfo.Enroll= (int)HttpContext.Session.GetInt32("Enroll");
            var li = obj.GetAllSalesQuatationLanding(userinfo.Enroll); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetFGUOM(int unitid)
        {
            var li = objcommon.GetFGUOM(unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetFGUOMAll(int unitid)
        {
            var li = objcommon.GetUOMForAll(unitid);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = objcommon.GetDocStatus(id, enumSubMenu.SQ00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetVatDetails()
        {
            var li = obj.GetVatData();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSQType(int unitid)
        {
            var li = objcommon.GetSQType(unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetDiscountDetails()
        {
            var li = obj.GetDiscountData();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetDisCal(int id)
        {
            var li = obj.GetDisCal(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetVatCal(int id)
        {
            var li = obj.GetVatCal(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfo(string prefix)
        {
            var li = obj.GetCustomerInfo(prefix);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSellerInfo(string prefix)
        {
            var li = obj.GetSellerInfo(prefix);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetFGlist(string prefix,int unitid,int itemtypeid)
        {
            var li = obj.GetFGlist(unitid, prefix, itemtypeid);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetDelPointlist(int unitid , int type, int cusId, string prefix)
        {
            var li = obj.GetDelPointist(unitid,type,cusId,prefix);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save(SalesQuatationLanding sq,SalesQuatationLandingDetails[] sqd)
        {
            sq.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            //sq.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.Save(sq, sqd);
            return Json(li);
        }



        [HttpPost]
        public JsonResult EditDetailsAdd(SalesQuatationLandingDetails sqd)
        {
            var li = obj.EditDetailsAdd(sqd);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditByMasterID(int id)
        {
            var limaster = obj.EditByMasterID(id);
            return Json(limaster);
        }


        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            var limaster = obj.ViewByMasterID(id);
            return Json(limaster);
        }


        [HttpGet]
        public JsonResult EditByDetaisID(int id)
        {
            var liDetails = obj.EditByDetailsID(id);
            return Json(liDetails);
        }


        [HttpGet]
        public JsonResult ViewByDetaisID(int id)
        {
            var liDetails = obj.ViewByDetailsID(id);
            return Json(liDetails);
        }



        //[HttpPost]
        //public JsonResult EditByLineByID(int id)
        //{
        //    var liDetails = obj.UpdateSQDetailsByID(id);
        //    return Json(liDetails);
        //}


        [HttpPost]
        public JsonResult DeleteByLineByID(int id)
        {
            var liDetails = obj.DeleteSQDetailsByID(id);
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult DeleteMasterByID(int id)
        {
            var liDetails = obj.DeleteSQMasterByID(id);
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult UpdateDetailsByID(SalesQuatationLandingDetails sqd)
        {
            var li = obj.UpdateDetailsByID(sqd);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Update(SalesQuatationLanding sql)
        {
            sql.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            sql.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.Update(sql);
            return Json(li);
        }

        [HttpPost]
        public JsonResult CopyMaster(int id)
        {
            int enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = obj.CopyMaster(id, enroll);
            return Json(li);
        }

        [HttpPost]
        public JsonResult FileUpload()
        {
            try
            {
                var file = Request.Form.Files.FirstOrDefault();
                var extension = Path.GetExtension(file.FileName).ToLower();

                System.Text.Encoding.RegisterProvider(
                    System.Text.CodePagesEncodingProvider.Instance
                );

                DataSet excelRecords;

                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Position = 0;

                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        excelRecords = reader.AsDataSet();
                    }
                }

                if (file == null || file.Length == 0)
                {
                    return Json(new
                    {
                        success = false,
                        message = "No file selected"
                    });
                }

                else if (extension != ".xls" && extension != ".xlsx")
                {
                    return Json(new
                    {
                        success = false,
                        message = "Invalid file format"
                    });
                }

                else if (excelRecords.Tables.Count == 0)
                {
                    return Json(new
                    {
                        success = false,
                        message = "Excel sheet is empty"
                    });
                }

                else
                {
                    var table = excelRecords.Tables[0];

                    DataTable dt = new DataTable();

                    dt.Columns.Add("ItemType", typeof(string));
                    dt.Columns.Add("ItemName", typeof(string));
                    dt.Columns.Add("Size", typeof(string));
                    dt.Columns.Add("Construction", typeof(string));
                    dt.Columns.Add("Weight", typeof(string));
                    dt.Columns.Add("Slit", typeof(string));
                    dt.Columns.Add("Scrim", typeof(string));
                    dt.Columns.Add("Quality", typeof(string));
                    dt.Columns.Add("ItemTitle", typeof(string));
                    dt.Columns.Add("PackingDetails", typeof(string));
                    dt.Columns.Add("UOM", typeof(string));

                    dt.Columns.Add("Quantity", typeof(decimal));
                    dt.Columns.Add("UnitPrice", typeof(decimal));
                    dt.Columns.Add("DiscountPercent", typeof(string));
                    dt.Columns.Add("DiscountAmount", typeof(decimal));
                    dt.Columns.Add("TotalAmount", typeof(decimal));
                    dt.Columns.Add("ShortDetails", typeof(string));

                    foreach (DataRow row in table.Rows)
                    {
                        if (row == null) continue;

                        string Get(int i)
                        {
                            if (i >= table.Columns.Count)
                                return "";

                            return row[i] == DBNull.Value
                                ? ""
                                : row[i]?.ToString()?.Trim();
                        }

                        decimal.TryParse(Get(11), out decimal qty);
                        decimal.TryParse(Get(12), out decimal unitPrice);
                        decimal.TryParse(Get(14), out decimal discountAmount);
                        decimal.TryParse(Get(15), out decimal totalAmount);

                        if (string.IsNullOrWhiteSpace(Get(0)) &&
                            string.IsNullOrWhiteSpace(Get(1)))
                            continue;

                        dt.Rows.Add(
                            Get(0),
                            Get(1),
                            Get(2),
                            Get(3),
                            Get(4),
                            Get(5),
                            Get(6),
                            Get(7),
                            Get(8),
                            Get(9),
                            Get(10),
                            qty,
                            unitPrice,
                            Get(13),
                            discountAmount,
                            totalAmount,
                            Get(16)
                        );
                    }

                    var result = dt.AsEnumerable()
                    .Select(r => dt.Columns.Cast<DataColumn>()
                        .ToDictionary(c => c.ColumnName, c => r[c]))
                    .ToList();

                    return Json(new
                    {
                        success = true,
                        data = result
                    });
                }

            }
            catch (Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = ex.Message,
                    inner = ex.InnerException?.Message,
                    stack = ex.StackTrace
                });
            }
        }

    }
}


