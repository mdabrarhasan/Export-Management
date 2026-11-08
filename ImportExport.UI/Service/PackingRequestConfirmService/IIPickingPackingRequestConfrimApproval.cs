using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Models.PackingRequestModel;

namespace ImportExport.UI.Service.PackingRequestConfirmService
{
    public interface IIPickingPackingRequestConfrimApproval
    {
        IQueryable<GetPickPackMaster> GetMasterIDinPro(int id);
        IQueryable<PickingPackingRequestLandingView> GetPending(int Enroll, int UnitID, string statusid);
        IQueryable<PickingPackingRequestLandingView> ViewByMasterID(int headerid, int unitid, int enroll);
        IQueryable<PickingPackingRequestDelSummary> ViewByDetailsID(int headerid, int unitid, int enroll);
    }
}

