using ImportExport.UI.Models.ExchangeRateModel;
using ImportExport.UI.Service.ExchangeRateService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class ExchangeRateController : Controller
    {
        private readonly IExchangeRate _obj;
        public ExchangeRateController(IExchangeRate obj)
        {
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View("~/Views/ExchangeRate/Index.cshtml");
        }

        [HttpGet]
        public JsonResult GetSellerUnits()
        {
            var li = _obj.GetSellerUnits().ToList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var li = _obj.GetAll().ToList();
            return Json(li);
        }

        [HttpPost]
        public JsonResult Save(ExchangeRateModel exchange)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
            exchange.CREATEDBY = enroll;
            exchange.UPDATEDBY = enroll;
            var li = _obj.Save(exchange);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
            var li = _obj.Delete(id, enroll);
            return Json(li);
        }
    }
}