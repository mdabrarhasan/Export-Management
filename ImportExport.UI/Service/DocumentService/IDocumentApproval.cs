using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Models.PackingRequestModel;

namespace ImportExport.UI.Service.DocumentService
{
    public interface IDocumentApproval
    {
        IQueryable<DocumentLandingViewModel> GetPending(string statusid, int rootdoclistid, int enroll, int unitid);
        IQueryable<DocumentLandingViewModel> ViewByMasterID(int headerid, int enroll, int unitid);
        IQueryable<DocumentLandingView> ViewByDetailsID(int headerid, int enroll, int unitid);
        string Rejected(int unitid, string modeulecode, int enroll, int id, string remarks, string docstatus, string messege, string notification, string processname);
        string Approve(int unitid, string modeulecode, int enroll, int histryid, int id, string remarks, string status, string message, string notification, string processname);
    }
}
