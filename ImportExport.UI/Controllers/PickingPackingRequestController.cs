using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestConfirmService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{

    public class PickingPackingRequestController : Controller
    {
        private UserInfo _userInfo = new UserInfo();

        private readonly IPickingPackingConfirmRequest _obj;
        private readonly ICommon _objcommon;

        public PickingPackingRequestController(IPickingPackingConfirmRequest obj, ICommon objcommon)
        {
            _obj = obj;
            _objcommon = objcommon;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllData()
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetAllData(_userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewMaster(id, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewByDetailsID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByMasterIDSummary(id, _userInfo.UnitID, _userInfo.Enroll);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = _objcommon.GetDocStatus(id, enumSubMenu.PRC00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }

        [HttpGet]
        public JsonResult DeleteMasterByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.DeleteMasterByID(id, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpPost]
        public JsonResult EditMasterWithId(PickPackingEditMaster pr, PickingPackingRequestDelvery[] pd)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByMasterID(pr, pd, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditMasterByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetEditByMasterID(id, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditByDetailsID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByDetailsID(id, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save(PickingPackingRequestLanding pr, PickPackingRequestDetails[] prd)
        {
            pr.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            pr.UNITID = 0;//(int)HttpContext.Session.GetInt32("UnitID");

            var li = _obj.Save(pr ,prd);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateDetailsByID(PackingRequestConfirmLandingDetails prc)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdateDetailsByID(prc, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIInfo(string prefix)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _objcommon.GetPIInfo(7, prefix);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIDetailsByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewByDetailsID(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfo(int id)
        {
            var li = _obj.GetCustomerInfoShortPISC(id);
            return Json(li);
        }


    }
}
