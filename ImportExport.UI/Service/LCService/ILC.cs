using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.QuotationModel;

namespace ImportExport.UI.Service.LCService
{
    public interface ILC
    {

        IQueryable<DropDownBind> GetLCProcessCode(int id); // get lc by id for file view
        IQueryable<OCFListView> GetOCFListView(int id);
        IQueryable<LCView> GetLCDetails(int enroll);
        IQueryable<LCView> GetLCDetailsBiax(int typeid, int enroll);
        IQueryable<DropDownBind> GetSalesQuotation();
        string Save(LC al);
        string Update(LC al);
        string DeletePIMasterByID(int id,int unitid,int enroll);
        IQueryable<LCView> GetLCDetailsByID(int id, int unitid, int enroll);
        IQueryable<AgreementLandingDetails> GetPIDetailsByIDEdit(int id);

        IQueryable<SellerInfo> GetSellerInfoShortPISCEdit(int id);
        IQueryable<CustomerInfo> GetCustomerInfoShortPISCEdit(int id);
        IQueryable<DropDownBind> GetDocument();
        IQueryable<DropDownBind> GetUnit();
        IQueryable<DropDownBind> CheckLocal(int id);
        IQueryable<DropDownBind> Billno(string prefix);
        public IQueryable<OCFListView> GetOCFList(int type);
        IQueryable<LCView> GetLCDetailsByIDBiax(int id, int unitid, int enroll);
        //string Save(AgreementLanding al, AgreementLandingDetails[] ald);


    }
}
