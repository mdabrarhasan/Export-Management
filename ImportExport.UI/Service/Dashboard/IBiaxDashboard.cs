using ImportExport.UI.Models.Dashboard;

namespace ImportExport.UI.Service.Dashboard
{
    public interface IBiaxDashboard
    {
        public IQueryable<DashboardData> Dashboard(int type);

        public IQueryable<DashboardGraphData> DashBoardGraphBar(int type);
    }
}
