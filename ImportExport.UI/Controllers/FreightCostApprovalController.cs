using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FreightCostService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class FreightCostApprovalController : Controller
    {
        UserInfo userinfo = new UserInfo();

        private readonly IFreightCostApproval _obj;
        private readonly IFreightCost _freightcost;
        private readonly ICommon objcommon;

        public FreightCostApprovalController(IFreightCostApproval obj, IFreightCost freightcost, ICommon ic)
        {
            _obj = obj;
            _freightcost = freightcost;
            objcommon = ic;
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

        [HttpGet]
        public JsonResult GetPending(string statusid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.GetPending(userinfo.Enroll, statusid);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Approve(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = 0;   // same as Packing Request: SPApprove resolves the matrix by submenu + approver

            var li = objcommon.Approve(
                userinfo.UnitID,
                enumSubMenu.FC0001.ToString(),
                userinfo.Enroll,
                id,                 // history ID
                0,
                remarks,
                enumDocumentStatus.APPR.ToString(),
                enumFCMessage.FCAPPR.ToString(),
                enumFreightCostNotification.FRCAPPR.ToString(),
                enumProcessName.FC.ToString());

            return Json(li);
        }

        // View modal reuses the existing Freight Cost SPs (id = TBLFREIGHTCOST.ID)
        [HttpGet]
        public JsonResult ViewMaster(int id)
        {
            var li = _freightcost.ViewCData(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewDetails(int id)
        {
            var li = _freightcost.GetPIDetailsData(id);
            return Json(li);
        }
    }
}