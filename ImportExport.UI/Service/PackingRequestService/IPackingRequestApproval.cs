using ImportExport.UI.Models.PackingRequestModel;


namespace ImportExport.UI.Service.PackingRequestService
{
    public interface IPackingRequestApproval
    {
        IQueryable<PackingRequestLandingView> GetPending(int Enroll, int UnitID, string statusid);
        IQueryable<PackingRequestLandingView> ViewByMasterID(int headerid, int unitid, int enroll);
        IQueryable<PackingRequestDelSummary> ViewByDetailsID(int headerid, int unitid, int enroll);
    }
}
