using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class AgreementApprovalController : Controller
    {
        private readonly IAgreementApproval _obj;
        private readonly ICommon objcommon;

        string strSubMenu = "";
        string strNotification = "";
        string strProcessName = "";
        string strMessegeName = "";



        UserInfo userinfo = new UserInfo();


        public AgreementApprovalController(IAgreementApproval obj, ICommon ic)
        {
            _obj = obj;
            objcommon = ic;
            //userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetStatusData()
        {
            var li = objcommon.GetStatusData(); 
            return Json(li);
        }

        public JsonResult GetAgreementType()
        {
            var li = objcommon.GetAgreementType(); 
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetAgreementPending(string aggcode, string statusid)
        {
            if (aggcode == "PI")
                 strSubMenu = enumSubMenu.PI00001.ToString();
            else
                strSubMenu = enumSubMenu.SC00001.ToString();

            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetAgreementPending(userinfo.Enroll, strSubMenu, aggcode, userinfo.UnitID, statusid);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Rejected(int id, string remarks,string aggtype)
        {
            if (aggtype == "PI")
            {
                strSubMenu = enumSubMenu.PI00001.ToString();
                strNotification = enumPINotification.PIAPPROVE.ToString();
                strProcessName = enumProcessName.PI.ToString();
                strMessegeName=enumPIMessage.PIREJ.ToString();  
            }
            else
            {
                strSubMenu = enumSubMenu.SC00001.ToString();
                strNotification = enumSCNotification.SCAPPROVE.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessegeName = enumSCMessage.SCREJ.ToString();
            }

            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Rejected(userinfo.UnitID, strSubMenu, userinfo.Enroll, id, remarks,enumDocumentStatus.REJC.ToString(), strMessegeName, strNotification, strProcessName); // parameter should be come from user session.
            return Json(li);
        }


        [HttpPost]
        public JsonResult Approve(int id,int histryid, string remarks,string aggtype)
        {
            if (aggtype == "PI")
            {
                strSubMenu = enumSubMenu.PI00001.ToString();
                strNotification=enumPINotification.PIAPPROVE.ToString();
                strProcessName = enumProcessName.PI.ToString();
                strMessegeName = enumPIMessage.PIAPPR.ToString();
            }
            else
            {
                strSubMenu = enumSubMenu.SC00001.ToString();
                strNotification = enumSCNotification.SCAPPROVE.ToString();
                strProcessName = enumProcessName.SC.ToString();
                strMessegeName = enumSCMessage.SCAPPR.ToString();
            }
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Approve(userinfo.UnitID, strSubMenu, userinfo.Enroll, id, histryid, remarks,enumDocumentStatus.APPR.ToString(), strMessegeName, strNotification, strProcessName); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            var limaster = _obj.ViewByMasterID(id);
            return Json(limaster);
        }


        [HttpGet]
        public JsonResult ViewByDetailsID(int id)
        {
            var liDetails = _obj.ViewByDetailsID(id);
            return Json(liDetails);
        }

    }
}


