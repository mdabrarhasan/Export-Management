using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestConfirmService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class PickingPackingRequestApprovalController : Controller
    {
        UserInfo userinfo = new UserInfo();

        private readonly IIPickingPackingRequestConfrimApproval _obj;
        private readonly ICommon objcommon;

        public PickingPackingRequestApprovalController(IIPickingPackingRequestConfrimApproval obj, ICommon ic)
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

        [HttpGet]
        public JsonResult GetPickPackingId(int id)
        {
            var li = _obj.GetMasterIDinPro(id);
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
            var li = objcommon.Rejected(userinfo.UnitID, enumSubMenu.PRC00001.ToString(), userinfo.Enroll, id, remarks, enumDocumentStatus.REJC.ToString(), enumPRCMessage.PRCDEL.ToString(), enumPRCNotification.PRCREJ.ToString(), enumProcessName.PRC.ToString()); // parameter should be come from user session.
            return Json(li);
        }


        [HttpPost]
        public JsonResult Approve(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Approve(userinfo.UnitID, enumSubMenu.PRC00001.ToString(), userinfo.Enroll, id, 0, remarks, enumDocumentStatus.APPR.ToString(), enumPRCMessage.PRCAPPR.ToString(), enumPRCNotification.PRCAPPR.ToString(), enumProcessName.PRC.ToString()); // parameter should be come from user session.
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
