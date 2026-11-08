using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Models.QuotationModel;

namespace ImportExport.UI.Service.PriceConfirmService
{
    public interface IPriceConfirm
    {
        public IQueryable<OCFListView> GetOCFListPending(int type);
      
        public List<PriceReport> GetLasttenItem(int id);
       // List<Dictionary<string, object>> GetLasttenItem(int type);
        IQueryable<PriceConfirmView> GetPendingList(int enroll,int unitid);
        IQueryable<AgreementPriceConfirm> EditByDetailsID(int id);
        IQueryable<PriceConfirmView> GetPendingListBiax(int enroll, int unitid);
        IQueryable<PriceConfirmView> GetPendingListBiaxView(int enroll, int unitid);

        IQueryable<PriceConfirmDetails> EditByMasterID(int id,int enroll, int unitid);

        IQueryable<PriceConfirmQuotationApproval> GetPriceConfirmApprovalQuotations(int id);

        

        string SaveMaster(PriceConfirm pc, PriceConfirmDetails [] pcd);
        string SaveBiax(PriceConfirm pc, PILandingDetails[] pcd);
        string UpdateMaster(PriceConfirm agl);
        string DeleteMaster(int id, int enroll, int unitid);

        IQueryable<PriceConfirmDetails> GetPricecConfirmLine(int headerid, int enroll, int unitid);
        IQueryable<PriceConfirmQuotationDetails> EditDetailsByIDBiax(int headerid, int enroll, int unitid);
        //IQueryable<PriceConfirmDetails> EditByDetailsID(int id);
        string SaveDetails(PriceConfirmDetails[] sqd, int enroll, int unitid);
        string UpdateDetailsByID(PriceConfirmQuotationDetails sqd, int unitid, int enroll);
        string DeleteDetailsByID(int id, int enroll, int unitid); 
        
    }
}
