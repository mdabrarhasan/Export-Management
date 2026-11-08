using AspDotNet.FTPHelper;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Repository.CommonRepository;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class SalesQuatationApprovalController : Controller
    {
        private readonly ISalesQuatationApproval obj;
        private readonly ICommon objcommon;

        UserInfo userinfo = new UserInfo();

    

        public SalesQuatationApprovalController(ISalesQuatationApproval sql,ICommon ic)
        {
            obj = sql;
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
            var li = objcommon.GetStatusData(); // parameter should be come from user session.
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetSalesQuatationApproval(string id)
        {
            userinfo.Enroll=(int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.GetSalesQuatationApproval(userinfo.UnitID, enumSubMenu.SQ00001.ToString(), userinfo.Enroll,id); // parameter should be come from user session.
            return Json(li);
        }


        [HttpPost]
        public JsonResult Approve(int id,int histryid,string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.Approve(userinfo.UnitID,enumSubMenu.SQ00001.ToString(), userinfo.Enroll, id,histryid, remarks); // parameter should be come from user session.
            return Json(li);
        }

        [HttpPost]
        public JsonResult Rejected(int id, string remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = obj.Rejected(userinfo.UnitID, enumSubMenu.SQ00001.ToString(), userinfo.Enroll, id, remarks); // parameter should be come from user session.
            return Json(li);
        }

        [HttpGet]
        public JsonResult LoadDocument(int id)
        {
            var li = objcommon.GetDocument(id,enumSubMenu.SQ00001.ToString());// parameter should be come from user session.
            return Json(li);
        }

        [HttpGet]
        public void Download(int id)
        {
            try
            {
                FTPHelper fTPHelper = new FTPHelper("", "", "");
                fTPHelper.DownloadFile(@"\FTProot\Screenshot.png", @"D:\Export");
            }
            catch (Exception)
            {
               
            }
        }
    }
}
