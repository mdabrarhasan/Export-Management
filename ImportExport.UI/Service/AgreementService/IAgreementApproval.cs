using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;

namespace ImportExport.UI.Service.AgreementService
{
    public interface IAgreementApproval
    {
        IQueryable<AgreementLandingView> GetAgreementPending(int Enroll,string modulecode,string aggcode,int UnitID,string id);
        IQueryable<AgreementLandingView> ViewByMasterID(int headerid);
        IQueryable<AgreementLandingDetails> ViewByDetailsID(int headerid);

    }
}
