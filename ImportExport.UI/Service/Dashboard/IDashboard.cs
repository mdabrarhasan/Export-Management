
using ImportExport.UI.Models.Dashboard;

namespace ImportExport.UI.Service.Dashboard
{
    public interface IDashboard
    {
       public IQueryable<GDashboard> GetDashboardvalue(int enroll);
    }
}
