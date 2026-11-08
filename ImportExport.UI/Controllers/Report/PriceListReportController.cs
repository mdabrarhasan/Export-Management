using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers.Report
{
    public class PriceListReportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
