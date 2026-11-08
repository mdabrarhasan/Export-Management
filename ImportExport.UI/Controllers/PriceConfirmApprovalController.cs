using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PriceConfirmService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class PriceConfirmApprovalController : Controller
    {

        UserInfo userinfo = new UserInfo();

        private readonly IPriceConfirmApproval _obj;
        private readonly IPriceConfirm _objpc;
        private readonly ICommon objcommon;


        public PriceConfirmApprovalController(IPriceConfirmApproval obj, ICommon ic, IPriceConfirm objpc)
        {
            _obj = obj;
            objcommon = ic;
            _objpc = objpc;
            //userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetPCPending(string statusid,int unitid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPCPending(userinfo.Enroll, unitid, statusid);
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
            var li = objcommon.Rejected(userinfo.UnitID, enumSubMenu.PC00001.ToString(), userinfo.Enroll, id, remarks, enumDocumentStatus.REJC.ToString(), enumPCMessage.PCAPPR.ToString(), enumPCNotification.PCREJECT.ToString(), enumProcessName.PC.ToString()); // parameter should be come from user session.
            return Json(li);
        }

        //[HttpPost]
        //public JsonResult Approve(int id, string remarks)
        //{
        //    userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        //    userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
        //    var li = objcommon.Approve(userinfo.UnitID, enumSubMenu.PC00001.ToString(), userinfo.Enroll, id, 0, remarks, enumDocumentStatus.APPR.ToString(), enumPCMessage.PCAPPR.ToString(), enumPCNotification.PCAPPROVE.ToString(), enumProcessName.PC.ToString()); // parameter should be come from user session.
        //    return Json(li);
        //}


        [HttpPost]
        public JsonResult Approve(int id,int unitid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            userinfo.UnitID = unitid;
            var li = objcommon.Approve(userinfo.UnitID, enumSubMenu.PC00001.ToString(), userinfo.Enroll, id, 0, "", enumDocumentStatus.APPR.ToString(), enumPCMessage.PCAPPR.ToString(), enumPCNotification.PCAPPROVE.ToString(), enumProcessName.PC.ToString()); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var limaster = _obj.ViewByMasterID(id, userinfo.UnitID,userinfo.Enroll);
            return Json(limaster);
        }

        [HttpGet]
        public JsonResult ViewByMasterIDBiax(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var limaster = _objpc.GetPendingListBiaxView(userinfo.Enroll, id);
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

        [HttpPost]
        public JsonResult UpdateDetailsByID(PriceConfirmDetails pcd)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdateDetailsByID(pcd, userinfo.UnitID, userinfo.Enroll);
            return Json(li);
        }



        //[HttpPost]
        //public JsonResult UpdateDetailsByID([FromForm] PriceConfirmDetails pcd)
        //{
        //    userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        //    userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");

        //    // Fallback safeguard: If standard model binding fails the wrapper,
        //    // explicitly read the form collections if necessary, or let [FromForm] parse the payload.
        //    var li = _obj.UpdateDetailsByID(pcd, userinfo.Enroll, userinfo.UnitID);
        //    return Json(li);
        //}



        [HttpPost]
        public JsonResult Update(int id, PriceConfirmDetails[] pcd)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdatePrice(id, pcd, userinfo.UnitID, userinfo.Enroll);
            return Json(li);
        }
        
    }
}
