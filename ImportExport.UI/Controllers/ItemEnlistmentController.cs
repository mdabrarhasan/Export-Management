using ImportExport.UI.Models.ItemEnlistmentModel;
using ImportExport.UI.Service.ItemEnlistmentService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class ItemEnlistmentController : Controller
    {
        private readonly IItemEnlistment _obj;

        public ItemEnlistmentController(IItemEnlistment obj)
        {
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View("~/Views/ItemEnlistment/Index.cshtml");
        }

        [HttpGet]
        public JsonResult GetSellerUnits()
        {
            var li = _obj.GetSellerUnits().ToList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetItemTypesByUnit(int unitId)
        {
            var li = _obj.GetItemTypesByUnit(unitId).ToList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetProductCategories()
        {
            var li = _obj.GetProductCategories().ToList();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            var li = _obj.GetAll().ToList();
            return Json(li);
        }

        [HttpPost]
        public JsonResult Save(ItemEnlistmentModel item)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
            item.CREATEDBY = enroll;
            item.UPDATEDBY = enroll;
            var li = _obj.Save(item);
            return Json(li);
        }

        [HttpPost]
        public JsonResult Delete(long id)
        {
            var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
            var li = _obj.Delete(id, enroll);
            return Json(li);
        }
    }
}