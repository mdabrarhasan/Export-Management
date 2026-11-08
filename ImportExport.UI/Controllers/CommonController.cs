using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ItemSpecificationModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ImportExport.UI.Controllers
{
    public class CommonController : Controller
    {

        private readonly ICommon objcommon;
        UserInfo userinfo = new UserInfo();

        public CommonController(ICommon common)
        {
            objcommon = common;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAccInfo()
        {
            var li = objcommon.GetAccountInfo(); 
            var result = new { Result = li, LoginUrl = EnamProcess.APILOGIN,UploadMultiple= EnamProcess.APIUPLOADMULTIPLEFILE,DownloadMultiple=EnamProcess.APIDOWNLOADMULTIPLEFILE };
            return Json(result);
        }


        [HttpPost]
        public JsonResult GetActiveFiles(string processCode)
        {
            var result = objcommon.GetActiveFiles(processCode)
                                  .Select(x => x.FILENAME)
                                  .ToList();

            return Json(result);
        }

        [HttpPost]
        public JsonResult DeleteFileFromDB(string processCode, string fileName)
        {
            var result = objcommon.DeleteFileFromDB(processCode, fileName);
            return Json(result);
        }

        [HttpPost]
        public JsonResult DeleteFilesFromDB(string processCode, string fileNames)
        {
            var result = objcommon.DeleteFilesFromDB(processCode, fileNames);
            return Json(result);
        }




        [HttpGet]
        public JsonResult GetConfirm()
        {
            var li = objcommon.GetConfirm();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetItemType()
        {
            var li = objcommon.GetItemType();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetToShipment()
        {
            var li = objcommon.GetToShipment();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetSalesType()
        {
            var li = objcommon.GetSalesType();
            return Json(li);
        }
         public JsonResult GetTermsAndCondition()
            {
                var li = objcommon.GetTermsAndCondition();
                return Json(li);
            }

        [HttpGet]
        public JsonResult GetUnitByUser()
        {
            int Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            var li = objcommon.GetUnitPermission(Enroll);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetCreditType()
        {
            var li = objcommon.GetCreditType();
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetTolarance()
        {
            var li = objcommon.GetTolerance();
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetTolaranceData(int id)
        {
            var li = objcommon.GetToleranceData(id);
            return Json(li);
        }


        [HttpGet]
        public JsonResult GetRootDocumentList()
        {
            int unit = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.GetRootDocumentList(unit);
            return Json(li);
        }

        [HttpGet]
        public JsonResult GetPickPackNumber(string prefix)
        {
            var li = objcommon.GetPickPackNumber(prefix);
            return Json(li);
        }

        [HttpPost]
        public JsonResult FileUpload()
        {
            try
            {
                string strSubMenu = "";
                string strMessage = "";

                int ProcessID = Convert.ToInt32(Request.Form["ProcessID"]);
                string Processcode = Request.Form["Processcode"].ToString();
                string ProcessName = Request.Form["ProcessName"].ToString();

                if (ProcessName == "SQ")
                {
                    strSubMenu = enumSubMenu.SQ00001.ToString();
                    strMessage = enumSQMessage.SQSAVE.ToString();
                }
                else if (ProcessName == "PI")
                {
                    strSubMenu = enumSubMenu.PI00001.ToString();
                    strMessage = enumPIMessage.PISAVE.ToString();
                }
                else if (ProcessName == "SC")
                {
                    strSubMenu = enumSubMenu.SC00001.ToString();
                    strMessage = enumSCMessage.SCSAVE.ToString();
                }
                else if (ProcessName == "PC")
                {
                    strSubMenu = enumSubMenu.PC00001.ToString();
                    strMessage = enumPCMessage.PCSAVE.ToString();
                }
                else if (ProcessName == "LC")
                {
                    strSubMenu = enumSubMenu.LC00001.ToString();
                    strMessage = enumLCMessage.LCSAVE.ToString();
                }
                else if (ProcessName == "PR")
                {
                    strSubMenu = enumSubMenu.PR00001.ToString();
                    strMessage = enumPRMessage.PRSAVE.ToString();
                }
                else if (ProcessName == "PRC")
                {
                    strSubMenu = enumSubMenu.PRC00001.ToString();
                    strMessage = enumPRCMessage.PRCSAVE.ToString();
                }

                int enroll = (int)HttpContext.Session.GetInt32("Enroll");
                int UnitID = (int)HttpContext.Session.GetInt32("UnitID");

                try
                {
                    objcommon.FileUpload(Request.Form.Files, ProcessID, Processcode, ProcessName, strSubMenu, strMessage, enroll, UnitID);
                }
                catch (Exception)
                {

                }
            }
            catch (Exception ex) { }
            

            return Json(null);
        }

        [HttpPost]
        public JsonResult FileUploadForDocument()
        {
            string strSubMenu = "";
            string strMessage = "";

            int ProcessID = Convert.ToInt32(Request.Form["ProcessID"]);
            string Processcode = Request.Form["Processcode"].ToString();
            string ProcessName = Request.Form["ProcessName"].ToString();

            if (ProcessName == "SQ")
            {
                strSubMenu = enumSubMenu.SQ00001.ToString();
                strMessage = enumSQMessage.SQSAVE.ToString();
            }
            else if (ProcessName == "PI")
            {
                strSubMenu = enumSubMenu.PI00001.ToString();
                strMessage = enumPIMessage.PISAVE.ToString();
            }
            else if (ProcessName == "SC")
            {
                strSubMenu = enumSubMenu.SC00001.ToString();
                strMessage = enumSCMessage.SCSAVE.ToString();
            }
            else if (ProcessName == "PC")
            {
                strSubMenu = enumSubMenu.PC00001.ToString();
                strMessage = enumPCMessage.PCSAVE.ToString();
            }
            else if (ProcessName == "LC")
            {
                strSubMenu = enumSubMenu.LC00001.ToString();
                strMessage = enumLCMessage.LCSAVE.ToString();
            }
            else if (ProcessName == "PR")
            {
                strSubMenu = enumSubMenu.PR00001.ToString();
                strMessage = enumPRMessage.PRSAVE.ToString();
            }
            else if (ProcessName == "PRC")
            {
                strSubMenu = enumSubMenu.PRC00001.ToString();
                strMessage = enumPRCMessage.PRCSAVE.ToString();
            }
            else if (ProcessName == "PP")
            {
                strSubMenu = enumSubMenu.PRC00001.ToString();
                strMessage = enumPRCMessage.PRCSAVE.ToString();
            }

            int enroll = (int)HttpContext.Session.GetInt32("Enroll");
            int UnitID = (int)HttpContext.Session.GetInt32("UnitID");

            try
            {
                var li=objcommon.FileUploadForDocument(Request.Form.Files, ProcessID, Processcode, ProcessName, strSubMenu, strMessage, enroll, UnitID);
            }
            catch (Exception)
            {

            }

            return Json(null);
        }


        [HttpPost]
        public JsonResult SaveItems(ItemSpecification itemspicific)
        {
            itemspicific.SESSIONID = HttpContext.Session.Id;
            itemspicific.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            string strMsg = objcommon.SaveItemSpecific(itemspicific);
            return Json(strMsg);
        }

        [HttpPost]
        public JsonResult UpdateItems(ItemSpecification itemspicific,int id,int processid,string process,string processcode)
        {
            itemspicific.SESSIONID = HttpContext.Session.Id;
            itemspicific.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            string strMsg = objcommon.UpdateItemSpecific(itemspicific, id, processid, process, processcode);
            return Json(strMsg);
        }

        [HttpPost]
        public JsonResult UpdateItemsSQ(ItemSpecification itemspicific, int id, int processid, string process, string processcode)
        {
            itemspicific.SESSIONID = HttpContext.Session.Id;
            itemspicific.DOCUMENTCREATEDBY = (int)HttpContext.Session.GetInt32("Enroll");
            string strMsg = objcommon.UpdateItemSpecificForSQ(itemspicific, id, processid, process, processcode);
            return Json(strMsg);
        }

        [HttpPost]
        public JsonResult GetItemSpecification(int itemid, string number)
        {
            var li = objcommon.GetItemSpecification(itemid, number);
            return Json(li);
        }
        [HttpGet]
        public JsonResult Cancled(int id, int remarks)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Cancled(userinfo.UnitID, enumSubMenu.SQ00001.ToString(), userinfo.Enroll, id, remarks);
            return Json(li);
        }
        [HttpGet]
        public JsonResult Ropen(int type, int id)
        {
            userinfo.Enroll = (int)HttpContext.Session.GetInt32("Enroll");
            userinfo.UnitID = (int)HttpContext.Session.GetInt32("UnitID");
            var li = objcommon.Ropen(userinfo.UnitID, enumSubMenu.SQ00001.ToString(), userinfo.Enroll, type, id);
            return Json(li);
        }


        [HttpGet]
        public async Task<IActionResult> GetSize(string prefix, int unitid)
        {
            var li =await objcommon.GetSize(unitid, prefix);
            return Ok(li);
        }

        [HttpGet]
        public async Task<IActionResult> GetConstruction(string prefix, int unitid)
        {
            var li = await objcommon.GetConstruction(unitid, prefix);
            return Ok(li);
        }

        [HttpGet]
        public async Task<IActionResult> GetWeight(string prefix, int unitid)
        {
            var li = await objcommon.GetWeight(unitid, prefix);
            return Ok(li);
        }

        [HttpGet]
        public async Task<IActionResult> GetSlit(string prefix, int unitid)
        {
            var li = await objcommon.GetSlit(unitid, prefix);
            return Ok(li);
        }

        [HttpGet]
        public async Task<IActionResult> GetScrim(string prefix, int unitid)
        {
            var li = await objcommon.GetScrim(unitid, prefix);
            return Ok(li);
        }

        [HttpGet]
        public JsonResult GetTransportAgency()
        {
            var li = objcommon.GetTransportAgency();
            return Json(li);
        }

        [HttpGet]
        public async Task<IActionResult> GetQuality(string prefix, int unitid)
        {
            var li = await objcommon.GetQuality(unitid, prefix);
            return Ok(li);
        }
        [HttpGet]
        public JsonResult GetUOMForAll(int unitid)
        {
            var li = objcommon.GetUOMForAll(unitid);
            return Json(li);
        }
    }
}


