using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;


namespace ImportExport.UI.Controllers
{
    public class PackingRequestController : Controller
    {
        private UserInfo _userInfo=new UserInfo();

        private readonly IPackingRequest _obj;
        private readonly ICommon _objcommon;

        public PackingRequestController(IPackingRequest obj, ICommon objcommon)
        {
            _obj = obj;
            _objcommon = objcommon;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.ViewMaster(id,_userInfo.Enroll, _userInfo.UnitID);
            return Json(li?.ToList() ?? new List<PackingRequestLandingView>());
        }

        [HttpGet]
        public JsonResult ViewMasterOn(int id)
        {
            var li = _obj.ViewMasterOn(id);
            return Json(li?.ToList() ?? new List<PackingRequestLandingHeader>());
        }

        [HttpGet]
        public JsonResult EditMasterByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetEditByMasterID(id,_userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditByDetailsID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByDetailsID(id, _userInfo.UnitID, _userInfo.Enroll);
            return Json(li?.ToList() ?? new List<PackingRequestLandingDetails>());
        }


        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = _objcommon.GetDocStatus(id, enumSubMenu.PR00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult ViewByDetailsID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByDetailsID(id, _userInfo.UnitID, _userInfo.Enroll);
            return Json(li?.ToList() ?? new List<PackingRequestLandingDetails>());
        }


        [HttpGet]
        public JsonResult GetAllData()
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetAllData(_userInfo.Enroll,_userInfo.UnitID);
            return Json(li?.ToList() ?? new List<PackingRequestLandingView>());
        }

        [HttpGet]
        public JsonResult DeleteMasterByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.DeleteMasterByID(id,_userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult DeleteLineByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.DeleteDetailsByID(id, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetShipment(int id)
        {

           var li = _objcommon.GetShipment(id);
           return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfoByPISC(int id)
        {
            var li = _objcommon.GetCustomerInfoShortPISC(id);
            return Json(li?.ToList() ?? new List<CustomerInfo>());
        }


        [HttpGet]
        public JsonResult GetPIInfo(string  prefix)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _objcommon.GetPIInfo(2,prefix);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetPIDetailsByIDOnAdd(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.AddByDetailsSummary(id, _userInfo.UnitID, _userInfo.Enroll);
            return Json(li);
        }

        


        [HttpGet]
        public JsonResult GetPIDetailsByID(int id)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByDetailsSummary(id, _userInfo.UnitID, _userInfo.Enroll);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCheckQty(int pinumber,int itemid)
        {
            var li = _obj.GetCheckQty(pinumber, itemid);
            return Json(li);
        }


        [HttpPost]
        public JsonResult UpdateDetailsByID(PackingRequestLandingDetails prc)
        {
            _userInfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            _userInfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.UpdateDetailsByID(prc, _userInfo.Enroll, _userInfo.UnitID);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save(PackingRequestLanding pr, PackingRequestLandingDetails[] prd)
        {
            
            pr.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            //pr.UNITID = (int)HttpContext.Session.GetInt32("UnitID");

            var li = _obj.Save(pr, prd);
            return Json(li);
        }


        [HttpPost]
        public JsonResult UpdateMaster(PackingRequestLanding pr)
        {
            pr.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            pr.UNITID = (int)HttpContext.Session.GetInt32("UnitID");

            var li = _obj.Update(pr);
            return Json(li);
        }
        [HttpGet]
        public JsonResult GetPackingMode()
        {
            var li = _obj.GetPackingMode();
            return Json(li);
        }
        public JsonResult GetCustomerCategory()
        {
            var li = _obj.GetCustomerCategory();
            return Json(li);
        }
        public JsonResult GetShipPoint()
        {
            var li = _obj.GetShipPoint();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetMillByUnit(int? unitid)
        {
            var sessionUnitId = HttpContext.Session.GetInt32("UnitID");
            int finalUnitId = unitid ?? sessionUnitId ?? 0;

            if (finalUnitId <= 0)
            {
                return Json(new List<DropDownBind>());
            }

            var li = _obj.GetMillByUnit(finalUnitId);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetMillByPISC(int piscid)
        {
            var li = _obj.GetMillByUnit(piscid);
            return Json(li);
        }
    }
}
