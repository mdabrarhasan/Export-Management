using ImportExport.UI.Models.CustomerModel;
using ImportExport.UI.Service.CustomerService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ICustomer _obj;

        public CustomerController(ICustomer obj)
        {
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View("~/Views/MasterType/Customer.cshtml");
        }

        [HttpGet]
        public IActionResult GetCustomerAll()
        {
            var li = _obj.GetCustomerAll();
            return Json(li);
        }
        [HttpGet]
        public IActionResult GetCustomerDropdown(string prefix)
        {
            var li = _obj.GetCustomerDropdown(prefix);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Create(CustomerModel customer)
        {
            var li = _obj.Create(customer);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Update(CustomerModel customer)
        {
            var li = _obj.Update(customer);
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