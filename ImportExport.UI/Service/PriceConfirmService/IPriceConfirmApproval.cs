using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.PriceConfirmModel;

namespace ImportExport.UI.Service.PriceConfirmService
{
    public interface IPriceConfirmApproval
    {
        IQueryable<PriceConfirmView> GetPCPending(int Enroll, int UnitID,string statusid);
        IQueryable<PriceConfirmView> ViewByMasterID(int headerid,int unitid,int enroll);
        IQueryable<PriceConfirmDetails> ViewByDetailsID(int headerid, int unitid, int enroll);
        string UpdateDetailsByID(PriceConfirmDetails sqd, int unitid, int enroll);
        string UpdatePrice(int id, PriceConfirmDetails[] pcd, int unitid, int enroll);
    }
}

