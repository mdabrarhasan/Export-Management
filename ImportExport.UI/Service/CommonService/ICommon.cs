using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.ItemSpecificationModel;
using ImportExport.UI.Models.PackingRequestModel;
using System.Diagnostics;

namespace ImportExport.UI.Service.CommonService
{
    public interface ICommon
    {
        Task<IEnumerable<TBLSize>> GetSize(int unitid,string prefix);
        Task<IEnumerable<TBLConstruction>> GetConstruction(int unitid, string prefix);
        Task<IEnumerable<TBLWeight>> GetWeight(int unitid, string prefix);
        Task<IEnumerable<TBLSlit>> GetSlit(int unitid, string prefix);
        Task<IEnumerable<TBLScrim>> GetScrim(int unitid, string prefix);
        Task<IEnumerable<TBLQuality>> GetQuality(int unitid, string prefix);
        public IQueryable<DropDownBind> GetToShipment();
        IQueryable<DropDownBind> GetUnitPermission(int enroll);
        public IQueryable<DropDownBind> GetBuyerBankInfo();
        public IQueryable<DropDownBind> GetItemType();
        IQueryable<DropDownBind> GetShipPointByUser(int type, int userid, int unitid);
        IQueryable<DropDownBind> GetUnit(int unitid);
        public IQueryable<DropDownBind> GetWearHouse();
        public IQueryable<DropDownBind> GetSalesType();
        public IQueryable<DropDownBind> GetTermsAndCondition();


        //party outstanding report filters
        public IQueryable<DropDownBind> GetApplicantList();

        public IQueryable<DropDownBind> GetLCNoList();
        public IQueryable<DropDownBind> GetBankList();
        public IQueryable<DropDownBind> GetRmList();
        public IQueryable<DropDownBind> GetRmDateList();
        public IQueryable<DropDownBind> GetAitCertificateStatusList();
        //

        public IQueryable<DropDownBind> GetCreditType();
        public IQueryable<CustomerInfo> GetCustomerInfoShortForBusiness(int typeid, int id);

        public IQueryable<PackingRequestFromToShipment> GetShipment(int id);
        public IQueryable<SellerInfo> GetSellerInfoShortForBusiness(int typeid, int prefix);
        IQueryable<DropDownBind> GetFGUOM(int unitid);
        IQueryable<DropDownBind64Base> GetTreatmentDirection(int unitid);
        IQueryable<DropDownBind64Base> GetBiaxFlimCore(int unitid);
        IQueryable<DocumentStatus> GetStatusData();
        IQueryable<FileModel> GetDocument(int id, string ModuleCode);
        void ErrorLog(string PROCESSID,string ERRORDETAILS,string MODULENAME,string PROCESSNAME,int UnitID,int DocumentCreatedBy,string Description);
        string FileUpload(IFormFileCollection file,int processid, string Processcode, string process,string modulename,string strMessage, int documentcreatedby, int unit);
        string FileUploadForDocument(IFormFileCollection file, int ProcessID, string ProcessCode, string process, string modulename, string strMessage, int documentcreatedby, int unit);
        IQueryable<ViewDocStatus> GetDocStatus(int processid,string modulecode,int unitid);
        IQueryable<ViewDocStatus> GetDocStatusForDocument(int processid, string modulecode, int unitid);
        IQueryable<VatModel> GetVatData();
        IQueryable<DiscountModel> GetDiscountData();
        IQueryable<FGModel> GetFGlist(int UnitID, string Prefix);
        IQueryable<VatModel> GetVatCal(int id);
        IQueryable<DropDownBind> GetSQType(int unitid);
        IQueryable<DiscountModel> GetDisCal(int id);

        IQueryable<CustomerInfo> GetCustomerInfo(string prefix);

        IQueryable<DropDownBind> GetPIInfo(int type,string prefix);

        IQueryable<CustomerInfo> GetCustomerInfoShortPISC(int id);
        IQueryable<SellerInfo> GetSellerInfoShortPISC(int id);

        IQueryable<CustomerInfo> GetCustomerInfoShort(int id);
        IQueryable<SellerInfo> GetSellerInfo(string prefix);

        IQueryable<SellerInfo> GetSellerInfoShortGeneral(int id);
        IQueryable<CustomerInfo> GetCustomerInfoShortGeneral(int id);

        IQueryable<AgreementType> GetAgreementType();

        IQueryable<DropDownBind> GetBankInfo(int pino);
        IQueryable<DropDownBind> GetShipmentMode();
        IQueryable<DropDownBind> GetTransportationMode();
        IQueryable<DropDownBind> GetCurrency();
        IQueryable<DropDownBind> GETLOADINGBY();
        IQueryable<DropDownBind> GetIncoTerm();
        IQueryable<DropDownBind> GetShipmentCountry();

        IQueryable<DropDownBind> GetToShipmentCountry();
        IQueryable<DropDownBind> GetDelTerm();
        IQueryable<DropDownBind> GetPaymentTerm();
        IQueryable<DropDownBind> GetLoadingport();
        IQueryable<ToleranceModel> GetTolerance();
        IQueryable<ToleranceModel> GetToleranceData(int id);
        IQueryable<DropDownBind> GetConfirm();
        IQueryable<DropDownBind> GetRootDocumentList(int unit);
        IQueryable<DropDownBind> GetPickPackNumber(string prefix);
        IQueryable<DropDownBind> GetUOMForAll(int unitid);
        IQueryable<DropdownLong> GetHSCode(string prefix);
        IQueryable<DropDownBind> GetTransportAgency();
        IQueryable<Account> GetAccountInfo();
        string Rejected(int unitid, string modeulecode, int enroll, int id, string remarks,string docstatus,string messege, string notification, string processname);
        string Approve(int unitid, string modeulecode, int enroll, int id, int histryid, string remarks, string status, string message,string notification,string processname);
        string SaveItemSpecific(ItemSpecification obj);
        string UpdateItemSpecific(ItemSpecification obj,int sqnumber,int processid, string process, string processcode);

        string UpdateItemSpecificForSQ(ItemSpecification obj, int id, int processid, string process, string processcode);
        string Cancled(int UnitID, string Modulecode, int Enroll, int id, int remarks);
        string Ropen(int UnitID, string Modulecode, int Enroll, int type, int id);
        IQueryable<ItemSpecification> GetItemSpecification(int itemid, string number);




        List<FileStatusModel> GetActiveFiles(string processCode);
        string DeleteFileFromDB(string processCode, string fileName);

        string DeleteFilesFromDB(string processCode, string fileNames);
    }
}


