using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Controllers
{
    public class AgreementLandingController : Controller
    {
        private readonly IAgreementLanding _obj;
        private readonly ICommon _objcommon;
        private readonly ISalesQuatationLanding _objsq;
        UserInfo userinfo = new UserInfo();

        public AgreementLandingController(IAgreementLanding obj,ICommon objcommon, ISalesQuatationLanding objsq)
        {
            _obj = obj;
            _objcommon = objcommon;
            _objsq = objsq;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetAgreementType()
        {
            var li = _obj.GetAgreementType();
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetConfirm()
        {
            var li = _objcommon.GetConfirm();
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetBankInfo(int sqid)
        {
            var li = _objcommon.GetBankInfo(sqid);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSalesQuotation(int id)
        {
             userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.GetSalesQuotation(id, userinfo.Enroll);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSalesQuotationLine(int id,string alpha)
        {
            var li = _obj.GetSalesQuotationLine(id, alpha);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSalesQuotationHeader(int id, string alpha)
        {
            var li = _obj.GetSalesQuotationHeader(id, alpha);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetAgreementLine(int id)
        {
            var li = _obj.EditByDetailsID(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditByDetailsPI(int id)
        {
            var li = _obj.EditByDetailsPI(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetDocStatus(int id, string aggcode)
        {
            string strSubMenu = "";
            if (aggcode == "PI")
                strSubMenu = enumSubMenu.PI00001.ToString();
            else if(aggcode == "SC")
                strSubMenu = enumSubMenu.SC00001.ToString();
            else if (aggcode == "PITOSC")
                strSubMenu = enumSubMenu.SC00001.ToString();

            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _objcommon.GetDocStatus(id, strSubMenu, userinfo.UnitID);
            return Json(li);
        }


        [HttpPost]
        public JsonResult EditDetailsAdd(AgreementLandingDetails sqd,string agreementtype)
        {
            var li = _obj.EditDetailsAdd(sqd, agreementtype, (int)HttpContext.Session.GetInt32("Enroll"),(int)HttpContext.Session.GetInt32("UnitID"));
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save(AgreementLanding al, AgreementLandingDetails[] ald)
        {
            al.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.Save(al, ald);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Update(AgreementLanding al)
        {
            al.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.Update(al);
            return Json(li);
        }


        [HttpPost]
        public JsonResult DeleteMasterByID(int id,string aggtypeid)
        {

            var liDetails = _obj.DeletePIMasterByID(id, (int)HttpContext.Session.GetInt32("Enroll"), (int)HttpContext.Session.GetInt32("UnitID"), aggtypeid);
            return Json(liDetails);
        }

        [HttpGet]
        public JsonResult GetShipmentMode()
        {
            var li = _objcommon.GetShipmentMode();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetTransportationMode()
        {
            var li = _objcommon.GetTransportationMode();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCurrency()
        {
            var li = _objcommon.GetCurrency();
            return Json(li);
        }
        public JsonResult GETLOADINGBY()
        {
            var li = _objcommon.GETLOADINGBY();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetIncoTerm()
        {
            var li = _objcommon.GetIncoTerm();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetBuyerBankInfo()
        {
            var li = _objcommon.GetBuyerBankInfo();
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetShipmentCountry()
        {
            var li = _objcommon.GetShipmentCountry();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetToShipmentCountry()
        {
            var li = _objcommon.GetToShipmentCountry();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetDelTerm()
        {
            var li = _objcommon.GetDelTerm();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPaymentTerm()
        {
            var li = _objcommon.GetPaymentTerm();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetLoadingport()
        {
            var li = _objcommon.GetLoadingport();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetHSCode(string prefix)
        {
            var li = _objcommon.GetHSCode(prefix);
            return Json(li);
        }


        [HttpPost]
        public JsonResult UpdateDetailsByID(AgreementLandingDetails sqd, string agreementtypeid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var liDetails = _obj.UpdatePIDetailsByID(sqd,agreementtypeid, userinfo.UnitID, userinfo.Enroll);
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult DeleteByLineByID(int id, string aggtypeid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var liDetails = _obj.DeletePIDetailsByID(id, aggtypeid, userinfo.Enroll, userinfo.UnitID);
            return Json(liDetails);
        }


        [HttpGet]
        public JsonResult GetAgreementLandingAll(string code)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetAgreementLandingAll(userinfo.Enroll, code, userinfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetCusInfo(int id)
        {
            var li = _objcommon.GetCustomerInfoShort(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult EditByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var limaster = _obj.EditByMasterID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(limaster);
        }
    }
}
