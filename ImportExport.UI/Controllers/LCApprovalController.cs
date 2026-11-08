using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class LCApprovalController : Controller
    {
        UserInfo userinfo = new UserInfo();

        private readonly ILCApproval _obj;
        private readonly ICommon objcommon;


        public LCApprovalController(ILCApproval obj, ICommon ic)
        {
            _obj = obj;
            objcommon = ic;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetLCPending(string statusid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetLCPending(userinfo.Enroll, userinfo.UnitID, statusid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewLCData(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewLCData(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewCDataBiax(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewLCDataBiax(id);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Rejected(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Rejected(userinfo.UnitID, enumSubMenu.LC00001.ToString(), userinfo.Enroll, id, remarks, enumDocumentStatus.REJC.ToString(), enumLCMessage.LCREJ.ToString(), enumLCNotification.LCREJECT.ToString(), enumProcessName.LC.ToString()); // parameter should be come from user session.
            return Json(li);
        }

        [HttpPost]
        public JsonResult Approve(int id,string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Approve(userinfo.UnitID, enumSubMenu.LC00001.ToString(), userinfo.Enroll, id, 0, remarks, enumDocumentStatus.APPR.ToString(), enumLCMessage.LCAPPR.ToString(),enumLCNotification.LCAPPROVE.ToString(),enumProcessName.LC.ToString()); // parameter should be come from user session.
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            var limaster = _obj.ViewByMasterID(id);
            return Json(limaster);
        }

    }
}
