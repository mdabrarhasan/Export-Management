using ImportExport.UI.Service.Reportcredential;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Principal;

namespace ImportExport.UI.Controllers
{
    public class ReportServerNetworkCredentialsController : Controller, IReportServerCredentials
    {
        private string username = "erp", password = "erp";
        public IActionResult Index()
        {
            return View();
        }


        public bool GetFormsCredentials(out Cookie authCookie, out string userName, out string password)
        {
            userName = password = null;
            authCookie = null;

            // Get the authentication cookie value from the Request.Cookies collection
            var cookieValue = HttpContext.Request.Cookies[".ASPXAUTH"];

            if (cookieValue == null)
            {
                return false;
            }

            // Store the authentication cookie value in the session
            HttpContext.Session.SetString(".ASPXAUTH", cookieValue);

            // Set the authCookie to a placeholder value (since it's not used in this scenario)
            authCookie = new Cookie(".ASPXAUTH", "placeholder");

            return true;
        }





        public WindowsIdentity ImpersonationUser
        {
            get
            {
                return null;
            }
        }

        public ICredentials NetworkCredentials
        {
            get
            {
                return new NetworkCredential("erp", "erp");
            }
        }
    }
}
