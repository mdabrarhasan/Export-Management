using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Models.PackingRequestModel;



namespace ImportExport.UI.Service.PackingRequestConfirmService
{
    public interface IPickingPackingConfirmRequest
    {
        public IQueryable<PickPackLandingView> ViewByDetailsID(int headerID);
        public IQueryable<CustomerInfo> GetCustomerInfoShortPISC(int id);
        IQueryable<PickingPackingRequestLandingView> GetAllData(int enroll, int unitid);
        IQueryable<PickingPackingRequestDelSummary> EditByDetailsSummary(int id, int unitid, int enroll);
        string Save(PickingPackingRequestLanding pr, PickPackingRequestDetails[] prd);

        public IQueryable<PickPackingMasterDetailsView> GetEditByMasterID(int id, int enroll, int unitid);

        public string EditByMasterID(PickPackingEditMaster pr, PickingPackingRequestDelvery[] pd, int enroll, int unitid);

        string DeleteMasterByID(int id, int enroll, int unitid);
      //  IQueryable<PickingPackingRequestLandingView> GetEditByMasterID(int id, int unitid, int enroll);
        IQueryable<PickingPackingRequestDelSummary> EditByMasterIDSummary(int id, int unitid, int enroll);
        IQueryable<PickingPackingRequestDelSummary> EditByDetailsID(int id, int unitid, int enroll);
        string UpdateDetailsByID(PackingRequestConfirmLandingDetails sqd, int unitid, int enroll);
        string DeleteDetailsByID(int id, int enroll, int unitid);
        IQueryable<CheckQty> GetCheckQty(int pinumber, int itemid);
        IQueryable<PickPackingMasterDetailsView> ViewMaster(int id, int unitid, int enroll);
    }
}
