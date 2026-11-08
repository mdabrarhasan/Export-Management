using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.MenuService;
using ImportExport.UI.Service.PackingRequestService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class MenuController : Controller
    {
        private readonly IMenu _obj;
        public IActionResult Index()
        {
            return View();
        }

        public MenuController(IMenu obj)
        {
            _obj = obj;
        }

        [HttpGet]
        public JsonResult GetMenuList()
        {
            var li = _obj.GetMenuList(535949); // parameter should be come from user session.
            return Json(li);
        }
    }
}
