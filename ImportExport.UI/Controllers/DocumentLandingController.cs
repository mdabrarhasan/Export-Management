using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.DocumentService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class DocumentLandingController : Controller
    {
        private readonly ICommon _objcommon;
        UserInfo userinfo = new UserInfo();
        private readonly IDocumentLanding _obj;

        public DocumentLandingController(ICommon objcommon, IDocumentLanding obj)
        {
            _objcommon = objcommon;
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View();
        }

        
        [HttpGet]
        public JsonResult GetData(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetLandingAll(id, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetDocStatus(int id)
        {
            var li = _objcommon.GetDocStatusForDocument(id, enumSubMenu.SQ00001.ToString(), (int)HttpContext.Session.GetInt32("UnitID")); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]  public JsonResult GetDoclistData(int id,int pickpackid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetDocListFromHeader(id, pickpackid, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.EditByMasterID(id);
            return Json(li);
        }

        [HttpGet]
        public JsonResult EditbyDetailsID(int id,int pickpackid,string status)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
      
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.GetDetailsByID(id, pickpackid, status);
            return Json(li);
        }

        [HttpPost]
        public JsonResult DeleteMasterByID(int id,int pickpackid,int rootdoclistid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.DeleteMasterByID(id, pickpackid, rootdoclistid, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Save(DocumentLandingModel master)
        {
            master.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            master.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.Save(master, userinfo.Enroll, userinfo.UnitID);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Update(DocumentLandingModel master)
        {
            master.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            master.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = _obj.Update(master);
            return Json(li);

        }

    }
}
