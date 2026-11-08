using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCService;
using ImportExport.UI.Service.PriceConfirmService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class PriceConfirmController : Controller
    {
        UserInfo userinfo = new UserInfo();

        private readonly IPriceConfirm _obj;
        private readonly ICommon objcommon;


        public PriceConfirmController(IPriceConfirm obj, ICommon ic)
        {
            _obj = obj;
            objcommon = ic;
            //userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
        }

        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = objcommon.GetDocStatus(id, enumSubMenu.PC00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCusInfo(int id)
        {
            var li = objcommon.GetCustomerInfoShortPISC(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSellerInfoGeneral(int id)
        {
            var li = objcommon.GetSellerInfoShortGeneral(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfoGeneral(int id)
        {
            var li = objcommon.GetCustomerInfoShortGeneral(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSellerInfo(int id)
        {
            var li = objcommon.GetSellerInfoShortPISC(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetPCPending(int unitid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPendingList(userinfo.Enroll, unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult OCFListViewPending(int id)
        {
            var li = _obj.GetOCFListPending(id);
            return Json(li);
        }

        public JsonResult GetLasttenItem(int id)
        {
            var li = _obj.GetLasttenItem(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPCPendingBiax(int unitid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPendingListBiax(userinfo.Enroll, unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPCPendingBiaxView(int unitid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPendingListBiaxView(userinfo.Enroll, unitid);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditMasterByID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByMasterID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetPIDetailsByID(int id)
        {
            var li = _obj.EditByDetailsID(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditDetailsByID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetPricecConfirmLine(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditDetailsByIDBiax(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditDetailsByIDBiax(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetMasterByID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByMasterID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult DeleteMaster(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.DeleteMaster(id,userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetPIInfo(string prefix)
        {
            var li = objcommon.GetPIInfo(0, prefix);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIInfoBiax(string prefix,int unitid)
        {
            var li = objcommon.GetPIInfo(3, prefix);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Save(PriceConfirm pc, PriceConfirmDetails[] pcd)
        {
            pc.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            pc.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.SaveMaster(pc,pcd);
            return Json(li);
        }

        [HttpPost]
        public JsonResult SaveBiax(PriceConfirm pc, PILandingDetails[] pcd)
        {
            pc.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            pc.UNITID = 91;
             var li = _obj.SaveBiax(pc, pcd);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateMaster(PriceConfirm pc)
        {
            pc.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            pc.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdateMaster(pc);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateDetailsByID(PriceConfirmQuotationDetails pcd)
        {
            userinfo.Enroll= (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdateDetailsByID(pcd, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPriceConfirmQuotationApproval(int id)
        {
            var li = _obj.GetPriceConfirmApprovalQuotations(id);
            return Json(li);
        }
    }
}
