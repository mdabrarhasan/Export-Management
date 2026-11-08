using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ReportModel;
using ImportExport.UI.Repository.ReportRepository;
using ImportExport.UI.Service.Dashboard;
using ImportExport.UI.Service.ReportService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace ImportExport.UI.Controllers.Report
{
    public class ReportController : Controller
    {
        private readonly IReportService _obj;
        private readonly HttpClient _httpClient;

        public ReportController(IReportService obj, HttpClient httpClient)
        {
            _obj = obj;
            _httpClient = httpClient;
        }

        [HttpGet("Report%2f{code}")]
        public IActionResult ReportBuilder(string code)
        {
           // code = "JuteInvoiceReport";

            var reportData = _obj.GetReportCredentials(code);

            
            if (reportData == null)
            {
                return NotFound();
            }

           
            var viewModel = new ReportLandingView
            {
                ID = reportData.ID,
                CODE = reportData.CODE,
                MOTHERURL = reportData.MOTHERURL,
                FOLDERURL = reportData.FOLDERURL,
                OTHERURL = reportData.OTHERURL,
                CREATEDBY = reportData.CREATEDBY,
                CREATEDATE = reportData.CREATEDATE
            };

        
            return View(viewModel);
        }

        [HttpGet("proxy")]
        public async Task<IActionResult> GetReport(string motherUrl, string folderUrl, string otherUrl)
        {
            if (string.IsNullOrEmpty(motherUrl) || !motherUrl.StartsWith(""))
            {
                return BadRequest("Invalid mother URL.");
            }
            var Url = motherUrl + folderUrl + "&rs:Embed=true&rc:LinkTarget=_self";


            return Redirect(Url);


        }

    }
}
