using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;

namespace ImportExport.UI.Service.SalesQuatationService
{
    public interface ISalesQuatationApproval
    {
        IQueryable<SalesQuatationLandingView> GetSalesQuatationApproval(int unitid,string Modulecode,int enroll,string id);
        string Approve(int unitid, string Modulecode, int enroll, int id,int histryid,string remarks);
        string Rejected(int unitid, string Modulecode, int enroll, int id, string remarks);

        //IQueryable<SalesQuatationLandingView> GetDataByStatusID(int unitid, int submenuid, int enroll,int id);
    }
}
