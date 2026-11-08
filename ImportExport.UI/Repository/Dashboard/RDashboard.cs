
using ImportExport.UI.Models.Dashboard;
using ImportExport.UI.Service.Dashboard;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

namespace ImportExport.UI.Repository.Dashboard
{
    public class RDashboard : IDashboard
    {
        private Context _context;
        public RDashboard(Context context) {
            _context = context;
        }
       public IQueryable<GDashboard> GetDashboardvalue(int enroll)
        {
            SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
            return _context.getdashboarad.FromSqlRaw("Exec sprDasboard @Enroll", Enroll);
        }
    }
}
