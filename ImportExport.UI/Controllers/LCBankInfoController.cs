using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCBankInfoModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCBankInfoService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Controllers
{
    public class LCBankInfoController : Controller
    {
        private readonly ILCBankInfo _obj;
        private readonly ICommon _objcommon;
        private readonly Context _context;
        UserInfo userinfo = new UserInfo();

        public LCBankInfoController(ILCBankInfo obj, ICommon objcommon, Context context)
        {
            _obj = obj;
            _objcommon = objcommon;
            _context = context;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetLCBankInfoAll()
        {
            var li = _obj.GetLCBankInfoAll();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetInvoiceByLC(int lcid)
        {
            var li = _obj.GetInvoiceByLC(lcid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult LCNO(string prefix)
       {
            var li = _obj.GetLCNO(prefix);
            return Json(li);
        }


        [HttpGet]
        public JsonResult LoadInvoice(int lcid)
        {
            var li = _obj.LoadInvoice(lcid);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save(LCBankInfoModel lcbankinfo)
        {
            lcbankinfo.CREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.Save(lcbankinfo);
            return Json(li);
        }
        [HttpPost]
        public JsonResult Update(LCBankInfoModel lcbankinfo)
        {
            lcbankinfo.UPDATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.Update(lcbankinfo);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var li = _obj.Delete(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetStatus()
        {
            var li = _obj.GetStatus();
            return Json(li);
        }







        [HttpGet]
        public JsonResult GetFinancialCostRate(int lcid)
        {
            try
            {
                decimal data = 0;

                using (SqlConnection con = new SqlConnection(_context.Database.GetConnectionString()))
                {
                    string query = @"
                SELECT TOP 1 ISNULL(FINANCIALCOSTRATE,0)
                FROM ABGAPIS.dbo.TBLLCBANKINFO
                WHERE LCID = @LCID
                AND ISACTIVE = 1
                ORDER BY CREATEDDATE DESC, ID DESC";

                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.Parameters.AddWithValue("@LCID", lcid);

                    con.Open();

                    var result = cmd.ExecuteScalar();

                    if (result != null)
                    {
                        data = Convert.ToDecimal(result);
                    }

                    con.Close();
                }

                return Json(data);
            }
            catch
            {
                return Json(0);
            }
        }





    }
}
