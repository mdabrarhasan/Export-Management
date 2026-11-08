using ImportExport.UI.Models.CustomerInfoModel;
using ImportExport.UI.Service.CustomerInfoService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class CustomerInfoController : Controller
    {
        private readonly ICustomerInfo _obj;

        public CustomerInfoController(ICustomerInfo obj)
        {
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View("~/Views/Customer/Index.cshtml");
        }

        [HttpGet]
        public JsonResult GetCustomerBankAll()
        {
            var li = _obj.GetCustomerBankAll();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCustomerBankById(int id)
        {
            var li = _obj.GetCustomerBankById(id);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Create(CustomerBankModel customerBank)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll");
            customerBank.CREATEDBY = enroll;

            var li = _obj.Create(customerBank);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Update(CustomerBankModel customerBank)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
            customerBank.UPDATEDBY = enroll;

            var li = _obj.Update(customerBank);
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