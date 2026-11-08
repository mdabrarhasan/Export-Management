using ExcelDataReader.Log;
using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ReportModel;
using ImportExport.UI.Service.ReportService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ImportExport.UI.Repository.ReportRepository
{

    public class RReportLanding : IReportService
    {
        string strMsg = "";
        private Context _context;

        public RReportLanding(Context context)
        {
            _context = context; 
        }

        public ReportLandingView GetReportCredentials(string code)
        {
            //  SqlParameter CODE = new SqlParameter("@CODE", code);

            SqlParameter CODE = new SqlParameter("@CODE", code == null ? "" : code);
            //  return _context.ReportLandingView.FromSqlRaw("Exec spReportExportProcess @CODE", CODE);

            return _context.ReportLandingView
        .FromSqlRaw("Exec spReportExportProcess @CODE", CODE)
        .AsEnumerable()
        .FirstOrDefault();

        }
    }
}
