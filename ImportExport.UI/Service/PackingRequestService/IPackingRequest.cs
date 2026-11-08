using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.PackingRequestModel;

namespace ImportExport.UI.Service.PackingRequestService
{
    public interface IPackingRequest
    {
        IQueryable<PackingRequestLandingView> GetAllData(int enroll, int unitid);
        IQueryable<PackingRequestDelSummary> EditByDetailsSummary(int id, int unitid, int enroll);

        public IQueryable<PackingRequestAddSummery> AddByDetailsSummary(int id, int unitid, int enroll);

        string Save(PackingRequestLanding pr, PackingRequestLandingDetails[] prd);
        IQueryable<PackingRequestLandingView> EditByMasterID(int id, int unitid, int enroll);
        string EditDetailsAdd(AgreementLandingDetails sqd, int enroll, int unitid);

        public IQueryable<PackingRequestLandingHeader> ViewMasterOn(int id);
        string Update(PackingRequestLanding agl);
        string DeleteMasterByID(int id, int enroll, int unitid);
        IQueryable<PackingRequestLanding> GetEditByMasterID(int id, int unitid, int enroll);
        IQueryable<PackingRequestDelSummary> EditByMasterIDSummary(int id, int unitid, int enroll);
        IQueryable<PackingRequestLandingDetails> EditByDetailsID(int id,int unitid,int enroll);
        string UpdateDetailsByID(PackingRequestLandingDetails sqd, int unitid, int enroll);
        string DeleteDetailsByID(int id,int enroll, int unitid);
        IQueryable<CheckQty> GetCheckQty(int pinumber, int itemid);
        IQueryable<PackingRequestLandingView> ViewMaster(int id, int unitid, int enroll);
        //IQueryable<PackingRequestLandingView> ViewMasterID(int id, int unitid, int enroll);
        IQueryable<DropDownBind> GetPackingMode();
        IQueryable<DropDownBind> GetCustomerCategory();
        IQueryable<DropDownBind> GetShipPoint();
        IQueryable<DropDownBind> GetMillByUnit(int unitid);
        IQueryable<DropDownBind> GetMillByPISC(int piscid);

    }
}
