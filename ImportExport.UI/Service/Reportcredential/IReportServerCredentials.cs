using System.Net;
using System.Security.Principal;

namespace ImportExport.UI.Service.Reportcredential
{
    public interface IReportServerCredentials
    {
        WindowsIdentity ImpersonationUser { get; }
        ICredentials NetworkCredentials { get; }

        bool GetFormsCredentials(out Cookie authCookie, out string userName, out string password);
    }
}
