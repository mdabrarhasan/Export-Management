using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.FreightCost;
using ImportExport.UI.Service.FreightCostService;
using Microsoft.AspNetCore.Mvc;

namespace ImportExport.UI.Controllers
{
    public class FreightCostController : Controller
    {
        private readonly IFreightCost _freightcost;

        public FreightCostController(IFreightCost freightcost)
        {
            _freightcost = freightcost;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetPIDetailsData(int id)
        {
            var li = _freightcost.GetPIDetailsData(id);
            return Json(li);
        } 
        public JsonResult Getdata(int unitid)
        {
            var li = _freightcost.Getdata(unitid);
            return Json(li);
        } 
        public JsonResult GetPackingData(int id)
        {
            var li = _freightcost.GetPackingData(id);
            return Json(li);
        } 
        public JsonResult ViewCData(int id)
        {
            var li = _freightcost.ViewCData(id);
            return Json(li);
        } 
        public JsonResult GetCostItemList()
        {
            var li = _freightcost.GetCostItemList();
            return Json(li);
        }
        public JsonResult GetItemListByShipNo(int id)
        {
            var li = _freightcost.GetItemListByShipNo(id);
            return Json(li);
        }
        public JsonResult Save(FreightCostMaster master, FreightCostLine[] fcl)
        {
            master.DOCUMENTCREATEDBY= (int)HttpContext.Session.GetInt32("Enroll");
            var li = _freightcost.Save(master, fcl);
            return Json(li);
        }

        public JsonResult Update(FreightCostUpdate master)
        {
            var result = _freightcost.Update(master);
            return Json(result);
        }

        public JsonResult GetPISCWithPacking(string prefix)
        {
            var li = _freightcost.GetPISCWithPacking(prefix);
            return Json(li);
        }

        public JsonResult GetSupplierByUnit(int unitid, string prefix)
        {
            if (unitid <= 0)
                return Json(new List<DropDownBind>());

            var li = _freightcost.GetSupplierByUnit(unitid, prefix);
            return Json(li);
        }

        public JsonResult DeleteMaster(FreightCostUpdate del)
        {
            var result = _freightcost.DeleteMaster(del);
            return Json(result);
        }
        public JsonResult DeleteLine(FreightCostUpdate del)
        {
            var result = _freightcost.DeleteLine(del);
            return Json(result);
        }

    }
}
