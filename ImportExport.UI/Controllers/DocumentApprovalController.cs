using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Repository.DocumentRepository;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.DocumentService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class DocumentApprovalController : Controller
    {
        private readonly ICommon _objcommon;
        UserInfo userinfo = new UserInfo();
        private readonly IDocumentApproval _obj;
        public IActionResult Index()
        {
            return View();
        }

        public DocumentApprovalController(IDocumentApproval obj, ICommon ic)
        {
            _obj = obj;
            _objcommon = ic;
        }

        [HttpGet]
        public JsonResult GetPending(string statusid, int rootdoclistid)
        {
            var li = _obj.GetPending(statusid, rootdoclistid, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");

            var li = _obj.ViewByMasterID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditbyDetailsID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewByDetailsID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Rejected(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.Rejected(userinfo.UnitID, enumSubMenu.PRC00001.ToString(), userinfo.Enroll, id, remarks, enumDocumentStatus.REJC.ToString(), enumPRCMessage.PRCDEL.ToString(), enumPRCNotification.PRCREJ.ToString(), enumProcessName.PRC.ToString()); // parameter should be come from user session.
            return Json(li);
        }

        [HttpPost]
        public JsonResult Approve(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.Approve(userinfo.UnitID, enumSubMenu.PRC00001.ToString(), userinfo.Enroll, id, 0, remarks, enumDocumentStatus.APPR.ToString(), enumPRCMessage.PRCAPPR.ToString(), enumPRCNotification.PRCAPPR.ToString(), enumProcessName.PRC.ToString()); // parameter should be come from user session.
            return Json(li);
        }


    }
}
