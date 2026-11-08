using ImportExport.UI.Models.FreightCost;

namespace ImportExport.UI.Service.FreightCostService
{
    public interface IFreightCostApproval
    {
        IQueryable<FreightCostApprovalView> GetPending(int enroll, string statuscode);
    }
}