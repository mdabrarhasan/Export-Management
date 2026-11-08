using ImportExport.UI.Service.Dashboard;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class BiaxDashboardController : Controller
    {
        public readonly IBiaxDashboard dashboard;
        public BiaxDashboardController(IBiaxDashboard _dashboard)
        {
            dashboard = _dashboard;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult DashBoard(int type)
        {
            var li = dashboard.Dashboard(type);

            return Json(li);
        }
        public JsonResult DashBoardGraphBar(int type)
        {
            var li = dashboard.DashBoardGraphBar(type);

            return Json(li);
        }
        public JsonResult DashBoardGraphpie(int type)
        {
            var li = dashboard.DashBoardGraphBar(type);

            return Json(li);
        }
        public JsonResult DashBoardGraphBardo(int type)
        {
            var li = dashboard.DashBoardGraphBar(type);

            return Json(li);
        }
        public JsonResult DashBoardGraphbarr(int type)
        {
            var li = dashboard.DashBoardGraphBar(type);

            return Json(li);
        }
    }
}
