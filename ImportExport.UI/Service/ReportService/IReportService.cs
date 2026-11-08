using ImportExport.UI.Models.ReportModel;

namespace ImportExport.UI.Service.ReportService
{
    public interface IReportService
    {
        ReportLandingView GetReportCredentials(string code);
    }
}
