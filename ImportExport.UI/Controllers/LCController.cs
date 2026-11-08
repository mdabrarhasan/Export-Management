using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class LCController : Controller
    {
        private readonly ILC _obj;
        private readonly ICommon _objcommon;
        private readonly IAgreementLanding _al;
        UserInfo userinfo = new UserInfo();

        public LCController(ILC obj, ICommon objcommon,IAgreementLanding al)
        {
            _obj = obj;
            _objcommon = objcommon;
            _al = al;   
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetLCProcessCode(int id)
        {
            var li = _obj.GetLCProcessCode(id);
            return Json(li);
        }



        [HttpGet]
        public JsonResult GetPIInfo(string prefix)
        {
            var li = _objcommon.GetPIInfo(1,prefix);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIInfoBiax(int typeid, string prefix)
        {
            var li = _objcommon.GetPIInfo(typeid, prefix);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetUnit()
        {

            var li = _obj.GetUnit();
            return Json(li);
        } 

        public JsonResult CheckLocal(int id)
        {
            var li = _obj.CheckLocal(id);
            return Json(li);
        } 

        public JsonResult Billno(string prefix)
        {
            var li = _obj.Billno(prefix);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfo(int id)
        {
            var li = _objcommon.GetCustomerInfoShortPISC(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSellerInfo(int id)
        {
            var li = _objcommon.GetSellerInfoShortPISC(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfoForBusiness(int typeid,int id)
        {
            var li = _objcommon.GetCustomerInfoShortForBusiness(typeid,id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSellerInfoShortForBusiness(int typeid, int id)
        {
            var li = _objcommon.GetSellerInfoShortForBusiness(typeid,id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCusInfoEdit(int id)
        {
            var li = _obj.GetCustomerInfoShortPISCEdit(id);
            return Json(li);
        }

        public JsonResult GetDocument()
        {
            var li = _obj.GetDocument();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSellerInfoEdit(int id)
        {
            var li = _obj.GetSellerInfoShortPISCEdit(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIDetailsByID(int id)
        {
            var li = _al.EditByDetailsID(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult OCFListView(int id)
        {
            var li = _obj.GetOCFList(id);
            return Json(li);
        }
        [HttpGet]
        public JsonResult OCFListViewByID(int id)
        {
            var li = _obj.GetOCFListView(id);
            return Json(li);
        }
        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = _objcommon.GetDocStatus(id, enumSubMenu.LC00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPIDetailsByIDEdit(int id)
        {
            var li = _obj.GetPIDetailsByIDEdit(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetLCData()
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetLCDetails(userinfo.Enroll);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetLCDetailsBiax(int typeid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetLCDetailsBiax(typeid,userinfo.Enroll);
            return Json(li);
        }

        [HttpPost]
        public JsonResult DeleteMasterByID(int id)
        {
            var liDetails = _obj.DeletePIMasterByID(id, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult GetLCDetailsByID(int id)
        {
            var liDetails = _obj.GetLCDetailsByIDBiax(id, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult GetLCDetailsByIDBiax(int id)
        {
            var liDetails = _obj.GetLCDetailsByIDBiax(id, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"));
            return Json(liDetails);
        }

        [HttpPost]
        public JsonResult Save(LC lc)
        {
            lc.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            lc.UNITID = 91;
            var li = _obj.Save(lc);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Update(LC lc)
        {
            lc.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            lc.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.Update(lc);
            return Json(li);
        }
    }
}
