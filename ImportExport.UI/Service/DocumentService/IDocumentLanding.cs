using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;

namespace ImportExport.UI.Service.DocumentService
{
    public interface IDocumentLanding
    {
        IQueryable<DocumentLandingViewModel> GetLandingAll(int id, int enroll, int unitid);
        IQueryable<DocumentListLoadView> GetDocListAll(int id, int enroll, int unitid);
        string Save(DocumentLandingModel sq,int unitid,int enroll);
        string Update(DocumentLandingModel sq);

        IQueryable<DocumentLandingView> GetDocListFromHeader(int id, int pickpackid, int enroll, int unitid);
        IQueryable<DocumentLandingView> GetDetailsByID(int id, int pickpackid,string status);
        string DeleteMasterByID(int id,int pickpackid,int rootdoclistid,int enroll, int unitid);
        IQueryable<DocumentLandingViewModel> EditByMasterID(int headerid);
    }
}
