
using ImportExport.UI.Service.CommonService;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Data.SqlClient;
using System.Data;

namespace ImportExport.UI.Controllers.Report
{
    public class LCBankInfoReportController : Controller
    {
        private readonly ICommon objcommon;

        private readonly IConfiguration _configuration;
        public LCBankInfoReportController(ICommon common, IConfiguration configuration)
        {
            objcommon = common;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetApplicantList()
        {
            var li = objcommon.GetApplicantList();
            return Json(li);
        }





        [HttpGet]
        public JsonResult GetLCNoList()
        {
            var li = objcommon.GetLCNoList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetBankList()
        {
            var li = objcommon.GetBankList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetRmList()
        {
            var li = objcommon.GetRmList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetRmDateList()
        {
            var li = objcommon.GetRmDateList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetAitCertificateStatusList()
        {
            var li = objcommon.GetAitCertificateStatusList();
            return Json(li);
        }


      




    }
}