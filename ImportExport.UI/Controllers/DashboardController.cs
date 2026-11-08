
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.Dashboard;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{

    public class DashboardController : Controller
    {
        private readonly IDashboard _obj;
        UserInfo userinfo = new UserInfo();
        public DashboardController(IDashboard obj)
        {
                _obj = obj;
            
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult GetDashboardvalue()
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = _obj.GetDashboardvalue(userinfo.Enroll);
            return Json(li);
        }
    }
}
