using ImportExport.UI.Models.MasterTypeModel;
using ImportExport.UI.Service.MasterTypeService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
	public class MasterTypeController : Controller
	{
		private readonly IMasterType _obj;

		public MasterTypeController(IMasterType obj)
		{
			_obj = obj;
		}

		public IActionResult Index()
		{
			return View("~/Views/MasterType/Index.cshtml");
		}

		[HttpGet]
		public JsonResult GetAll(string masterType)
		{
			var li = _obj.GetAll(masterType);
			return Json(li);
		}

		[HttpPost]
		public JsonResult Save(MasterTypeModel master)
		{
			var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
			master.CREATEDBY = enroll;
			master.UPDATEDBY = enroll;

			var li = _obj.Save(master);
			return Json(li);
		}

		[HttpPost]
		public JsonResult Delete(int id, string masterType)
		{
			var enroll = HttpContext.Session.GetInt32("Enroll") ?? 0;
			var li = _obj.Delete(id, masterType, enroll);
			return Json(li);
		}
	}
}
