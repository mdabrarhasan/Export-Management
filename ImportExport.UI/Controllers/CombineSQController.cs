using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Models.Combine;
using ImportExport.UI.Service.CombineSQServise;
using Microsoft.AspNetCore.Mvc;
using ImportExport.UI.Models.CommonModel;

namespace ImportExport.UI.Controllers
{
    public class CombineSQController : Controller
    {
        private ICombineSQ combineSQ;
        UserInfo userinfo = new UserInfo();

        public CombineSQController(ICombineSQ combineSQ)
        {
            this.combineSQ = combineSQ;
        }

        public JsonResult GetSQ(string prefix)
        {
            var li= combineSQ.GetSQ(prefix);
            return Json(li);
        }

        public JsonResult GetSC(string prefix, string sqIds)
        {
            var li = combineSQ.GetSC(prefix, sqIds);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ValidateSCMatch(int baselineId, int candidateId)
        {
            var result = combineSQ.ValidateSCMatch(baselineId, candidateId);
            return Json(result);
        }

        [HttpGet]
        public JsonResult GetSCHeader(int scId)
        {
            var result = combineSQ.GetSCHeader(scId);
            return Json(result);
        }

        public JsonResult GetSCList(string prefix)
        {
            var li = combineSQ.GetSCList(prefix);
            return Json(li);
        }

        public JsonResult GetSCExisting(string prefix, string excludeIds)
        {
            var li = combineSQ.GetSCExisting(prefix, excludeIds);
            return Json(li);
        }

        [HttpPost]
        public JsonResult GetSQItem(AgreementLanding al,Hscodes[] HS)
        {
            al.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            al.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = combineSQ.GetSQItem(al,HS);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetCombineSQitem(int[] HS)
        {
            var hscodeObjects = HS.Select(id => new Hscodes { ID = id }).ToArray();
            var li = combineSQ.GetCombineSQitem(hscodeObjects);
            return Json(li);
        }


        [HttpPost]
        public JsonResult Save([FromBody] CombineSaveRequest req)
        {
            // Debug: log what actually arrived
            System.Diagnostics.Debug.WriteLine($"[CombineSQ.Save] req is null: {req == null}");
            System.Diagnostics.Debug.WriteLine($"[CombineSQ.Save] ald is null: {req?.ald == null}, ald.Length: {req?.ald?.Length ?? -1}");
            if (req?.ald != null && req.ald.Length > 0)
            {
                System.Diagnostics.Debug.WriteLine($"[CombineSQ.Save] First item: ITEMID={req.ald[0].ITEMID}, QUANTITY={req.ald[0].QUANTITY}, PRICE={req.ald[0].PRICE}");
            }
            System.Diagnostics.Debug.WriteLine($"[CombineSQ.Save] sourceScIds.Length: {req?.sourceScIds?.Length ?? -1}");
            System.Diagnostics.Debug.WriteLine($"[CombineSQ.Save] al.AGREEMENTTYPEID: {req?.al?.AGREEMENTTYPEID}");

            if (req == null || req.al == null)
            {
                return Json("Invalid request");
            }

            req.al.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            req.al.UNITID = (int)HttpContext.Session.GetInt32("UnitID");
            var sourceCsv = req.sourceScIds != null ? string.Join(",", req.sourceScIds) : "";
            //var sourceLineCsv = req.sourceLineIds != null ? string.Join(",", req.sourceLineIds) : "";
            //var li = combineSQ.Save(req.id, req.scid, req.sctypeid, sourceCsv, sourceLineCsv, req.al, req.ald);
            var li = combineSQ.Save(req.id, req.scid, req.sctypeid, sourceCsv, req.mergeSourceLines, req.al, req.ald);
            return Json(li);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAgreementLandingAll(string code)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = combineSQ.GetAgreementLandingAll(userinfo.Enroll, code, userinfo.UnitID);
            return Json(li);
        }

        [HttpGet]
        public JsonResult ViewByMasterID(int id)
        {
            var limaster = combineSQ.ViewByMasterID(id);
            return Json(limaster);
        }

        [HttpGet]
        public JsonResult EditByMasterID(int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var limaster = combineSQ.EditByMasterID(id, userinfo.Enroll, userinfo.UnitID);
            return Json(limaster);
        }


        [HttpGet]
        public JsonResult GetAgreementLine(int id)
        {
            var li = combineSQ.EditByDetailsID(id);
            return Json(li);
        }

        [HttpPost]
        public JsonResult UpdateDetailsByID(AgreementLandingDetails sqd, string agreementtypeid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            //userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var liDetails = combineSQ.UpdatePIDetailsByID(sqd, agreementtypeid, userinfo.UnitID, userinfo.Enroll);
            return Json(liDetails);
        }


        [HttpPost]
        public JsonResult DeleteByLineByID(int id, string aggtypeid)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var liDetails = combineSQ.DeletePIDetailsByID(id, aggtypeid, userinfo.Enroll, userinfo.UnitID);
            return Json(liDetails);
        }
    }
}
