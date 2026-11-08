using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.LCModel;

namespace ImportExport.UI.Service.LCService
{
    public interface ILCApproval
    {
        IQueryable<LCView> GetLCPending(int Enroll,int UnitID, string id);
        IQueryable<LCView> ViewByMasterID(int headerid);
        IQueryable<LCView> ViewLCData(int id);
        IQueryable<LCView> ViewLCDataBiax(int id);
    }
}


