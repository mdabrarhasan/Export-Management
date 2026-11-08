using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.FreightCost;
using ImportExport.UI.Service.FreightCostService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.RFreightCost
{
    public class RFreightCostApproval : IFreightCostApproval
    {
        private readonly Context _context;

        public RFreightCostApproval(Context context)
        {
            _context = context;
        }

        public IQueryable<FreightCostApprovalView> GetPending(int enroll, string statuscode)
        {
            SqlParameter ENROLL = new SqlParameter("@ENROLL", enroll);
            SqlParameter STATUSCODE = new SqlParameter("@STATUSCODE", (object)statuscode ?? DBNull.Value);

            return _context.FreightCostApprovalView.FromSqlRaw(
                "EXEC SPGETFREIGHTCOSTFORAPPROVAL @ENROLL,@STATUSCODE", ENROLL, STATUSCODE);
        }
    }
}