using ImportExport.UI.Models.Dashboard;
using ImportExport.UI.Service.Dashboard;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ImportExport.UI.Repository.Dashboard
{
    public class RBiaxDashboard : IBiaxDashboard
    {
        private Context _context;
        public RBiaxDashboard(Context context)
        {

            _context = context;
        }
        public IQueryable<DashboardData> Dashboard(int type)

        {
            try
            {
                // SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.DashboardData.FromSqlRaw("Exec spGetBiaxDashBoard @TYPE", TYPE);
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        public IQueryable<DashboardGraphData> DashBoardGraphBar(int type)

        {
            try
            {
                // SqlParameter ID = new SqlParameter("@ID", id);
                SqlParameter TYPE = new SqlParameter("@TYPE", type);

                return _context.DashboardGraphData.FromSqlRaw("Exec spGetBiaxDashBoard @TYPE", TYPE);
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
