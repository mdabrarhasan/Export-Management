using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{

    public class PackingRequestApprovalController : Controller
    {

        UserInfo userinfo = new UserInfo();

        private readonly IPackingRequestApproval _obj;
        private readonly ICommon objcommon;

        public PackingRequestApprovalController(IPackingRequestApproval obj, ICommon ic)
        {
            _obj = obj;
            objcommon = ic;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetStatusData()
        {
            var li = objcommon.GetStatusData(); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetPending(string statusid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPending(userinfo.Enroll, userinfo.UnitID, statusid);
            return Json(li);
        }


        //[HttpGet]
        //public JsonResult ViewCData(int id)
        //{
        //    userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        //    userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
        //    var li = _obj.ViewLCData(id);
        //    return Json(li);
        //}



        [HttpPost]
        public JsonResult Rejected(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Rejected(userinfo.UnitID, enumSubMenu.PR00001.ToString(), userinfo.Enroll, id, remarks, enumDocumentStatus.REJC.ToString(), enumPRMessage.PRREJ.ToString(), enumPRCNotification.PRCREJ.ToString(), enumProcessName.PR.ToString()); // parameter should be come from user session.
            return Json(li);
        }

        [HttpPost]
        public JsonResult Approve(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = 0;// (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Approve(userinfo.UnitID, enumSubMenu.PR00001.ToString(), userinfo.Enroll, id, 0, remarks, enumDocumentStatus.APPR.ToString(), enumPRMessage.PRAPPR.ToString(), enumPRNotification.PRAPPR.ToString(), enumProcessName.PR.ToString()); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var limaster = _obj.ViewByMasterID(id, userinfo.UnitID, userinfo.Enroll);
            return Json(limaster);
        }

        [HttpGet]
        public JsonResult ViewByDetailsID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var lidetails = _obj.ViewByDetailsID(id, userinfo.UnitID, userinfo.Enroll);
            return Json(lidetails);
        }
    }
}


