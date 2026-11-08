using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.LCVSBILL;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCVSBILLService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class LCVSBILLController : Controller
    {

        private readonly ILCVSBILL _obj;
        private readonly ICommon _objcommon;
        UserInfo userinfo = new UserInfo();

        public LCVSBILLController(ILCVSBILL obj, ICommon objcommon)
        {
            _obj = obj;
            _objcommon = objcommon;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetLCVSBILL(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.GetLCDetails(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetShipment()
        {
            var li = _obj.GetShipment();
            return Json(li);
        }

        [HttpGet]
        public JsonResult LCNO(string prefix)
        {
            var li = _obj.GetLCNO(prefix);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Save(LCVSBILL lcvsbill)
        {
            lcvsbill.CREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            lcvsbill.UNITID = 91;
            var li = _obj.Save(lcvsbill);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateRM(UPDATERMBY master)
        {
            
            var li = _obj.UpdateRM(master);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var li = _obj.Delete(id);
            return Json(li);
        }
    }
}
