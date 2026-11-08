using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.File;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using System.Data;
using System.Web.Mvc;

namespace ImportExport.UI.Service.SalesQuatationService
{
    public interface ISalesQuatationLanding
    {
        public IQueryable<DELPOINTMODEL> GetDelPointist(int intUnitId, int intType, int customerId, string strprefix);
        public IQueryable<FileDetail> GetFileDetail(string prefix);
        public IQueryable<SalesQuotationViewModel> ViewByMasterID(int headerid);
        public int UpdateFileDetail(int type, string processCode, string fileName);
        IQueryable<SalesQuatationLandingView> GetAllSalesQuatationLanding(int enroll);
        string Save(SalesQuatationLanding sq,SalesQuatationLandingDetails[] sqd);
        IQueryable<SalesQuatationLandingView> EditByMasterID(int id);
        IQueryable<SalesQuatationLandingDetails> EditByDetailsID(int id);
        IQueryable<SalesQuatationLandingDetails> ViewByDetailsID(int id);
        string Update(SalesQuatationLanding sql);
        string CopyMaster(int id, int enroll);
        string DeleteSQDetailsByID(int id);
        string DeleteSQMasterByID(int id);
        string UpdateDetailsByID(SalesQuatationLandingDetails sqd);
        string EditDetailsAdd(SalesQuatationLandingDetails sqd);
        IQueryable<VatModel> GetVatData();
        IQueryable<DiscountModel> GetDiscountData();
        IQueryable<FGModel> GetFGlist(int UnitID,string Prefix, int ItemTypeID);
        IQueryable<VatModel> GetVatCal(int id);
        IQueryable<DiscountModel> GetDisCal(int id);
       
        IQueryable<CustomerInfo> GetCustomerInfo(string prefix);
        IQueryable<SellerInfo> GetSellerInfo(string prefix);
    }
}

