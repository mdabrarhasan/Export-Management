using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.AuthModel;
using ImportExport.UI.Models.BankAcceptanceCalendarModel;
using ImportExport.UI.Models.Combine;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.CustomerInfoModel;
using ImportExport.UI.Models.CustomerModel;
using ImportExport.UI.Models.Dashboard;
using ImportExport.UI.Models.DocumentModel;
using ImportExport.UI.Models.ExchangeRateModel;
using ImportExport.UI.Models.File;
using ImportExport.UI.Models.FreightCost;
using ImportExport.UI.Models.ItemEnlistmentModel;
using ImportExport.UI.Models.ItemSpecificationModel;
using ImportExport.UI.Models.LCBankInfoModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Models.LCVSBILL;
using ImportExport.UI.Models.MasterTypeModel;
using ImportExport.UI.Models.Menu;
using ImportExport.UI.Models.PackingReqConfirmModel;
using ImportExport.UI.Models.PackingRequestModel;
using ImportExport.UI.Models.PriceConfirmModel;
using ImportExport.UI.Models.QuotationModel;
using ImportExport.UI.Models.ReportModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        { }

        public DbSet<FileStatusModel> FileStatusModel { get; set; }
        public DbSet<DropDownBind> DropDownBind { get; set; }
        public DbSet<TBLSize> TBLSize { get; set; }
        public DbSet<TBLWeight> TBLWeight { get; set; }
        public DbSet<TBLConstruction> TBLConstruction { get; set; }
        public DbSet<TBLSlit> TBLSlit { get; set; }
        public DbSet<TBLScrim> TBLScrim { get; set; }
        public DbSet<TBLQuality> TBLQuality { get; set; }

        public DbSet<BankAcceptanceCalendarModel> BankAcceptanceCalendarModel { get; set; }

        public DbSet<DropDownBind64Base> DropDownBind64Base { get; set; }
        public DbSet<DropdownLong> DropDownBindLong { get; set; }
        public DbSet<SalesQuatationLandingView> SalesQuatationLandingView { get; set; }
        public DbSet<SalesQuotationViewModel> SalesQuotationViewModel { get; set; }
        public DbSet<SalesQuatationLanding> tblsalesquotationheader { get; set; }
        public DbSet<SalesQuatationLandingDetails> tblsalesquotationline { get; set; }
        public DbSet<VatModel> VatModel { get; set; }
        public DbSet<DiscountModel> DiscountModel { get; set; }
        public DbSet<FGModel> FGModel { get; set; }

        public DbSet<DashboardGraphData> DashboardGraphData { get; set; }

        public DbSet<DELPOINTMODEL> DELPOINTMODEL { get; set; }

        public DbSet<DashboardData> DashboardData { get; set; }

        public DbSet<FileDetail> FileDetail { get; set; }
        public DbSet<CheckQty> CheckQty { get; set; }
        public DbSet<ToleranceModel> ToleranceModel { get; set; }
        public DbSet<CommissionModel> CommissionModel { get; set; }
        public DbSet<CustomerInfo> CustomerInfo { get; set; }
        public DbSet<SellerInfo> SellerInfo { get; set; }
        public DbSet<FileModel> FileModel { get; set; }
        public DbSet<SalesQuatationApproval> SalesQuatationApproval { get; set; }
        public DbSet<DocumentStatus> DocumentStatus { get; set; }
        public DbSet<ErrorLog> ErrorLog { get; set; }
        public DbSet<GetPickPackMaster> GetPickPackMaster { get; set; }
        public DbSet<ActivityLog> ActivityLog { get; set; }
        public DbSet<LoginModel> Login { get; set; }
        public DbSet<GDashboard> getdashboarad { get; set; }

        public DbSet<AgreementLandingView> AgreementLandingView { get; set; }
        public DbSet<AgreementLanding> AgreementLanding { get; set; }
        public DbSet<AgreementLandingDetails> AgreementLandingDetails { get; set; }
        public DbSet<SalesQuotationHeaderAggrigation> SalesQuotationHeaderAggrigation { get; set; }
        //combinesq
        public DbSet<CombineHeader> CombineHeader { get; set; }

        public DbSet<PackingRequestLandingHeader> PackingRequestLandingHeader { get; set; }

        public DbSet<AgreementType> AgreementType { get; set; }
        public DbSet<LCView> LCView { get; set; }
        public DbSet<OCFListView> OCFListView { get; set; }
        public DbSet<PriceReport> PriceReport { get; set; }


        public DbSet<PriceConfirm> PriceConfirm { get; set; }
        public DbSet<AgreementPriceConfirm> AgreementPriceConfirm { get; set; }
        public DbSet<PriceConfirmDetails> PriceConfirmDetails { get; set; }
        public DbSet<PriceConfirmQuotationDetails> PriceConfirmQuotationDetails { get; set; }
        public DbSet<PriceConfirmView> PriceConfirmView { get; set; }
        public DbSet<PriceConfirmApproval> PriceConfirmApproval { get; set; }
        public DbSet<ViewDocStatus> ViewDocStatus { get; set; }

        public DbSet<PackingRequestFromToShipment> PackingRequestFromToShipment { get; set; }


        public DbSet<PackingRequestLanding> PackingRequestLanding { get; set; }
        public DbSet<PackingRequestDelSummary> PackingRequestDelSummary { get; set; }
        public DbSet<PackingRequestAddSummery> PackingRequestAddSummery { get; set; }
        public DbSet<PackingRequestLandingDetails> PackingRequestLandingDetails { get; set; }
        public DbSet<PackingRequestLandingView> PackingRequestLandingView { get; set; }
        public DbSet<PackingRequestApproval> PackingRequestApproval { get; set; }

        public DbSet<ReportLandingView> ReportLandingView { get; set; }



        public DbSet<PickingPackingRequestLandingView> PickingPackingRequestLandingView { get; set; }
        public DbSet<PickingPackingRequestLanding> PickingPackingRequestLanding { get; set; }

        public DbSet<PickPackingMasterDetailsView> PickPackingMasterDetailsView { get; set; }

        public DbSet<PickPackLandingView> PickingPackingRequestLandingDelSummary { get; set; }
        public DbSet<PickingPackingRequestDelSummary> PickingPackingRequestDelSummary { get; set; }
        public DbSet<PackingRequestConfirmLandingDetails> PackingRequestConfirmLandingDetails { get; set; }
        public DbSet<PickingPackingConfirmApproval> PickingPackingConfirmApproval { get; set; }

        public DbSet<Account> Account { get; set; }
        public DbSet<Menus> Menu { get; set; }

        public DbSet<DocumentLandingModel> DocumentLandingModel { get; set; }
        public DbSet<DocumentLandingDetailsModel> DocumentLandingDetailsModel { get; set; }
        public DbSet<DocumentLandingViewModel> DocumentLandingViewModel { get; set; }
        public DbSet<DocumentListLoadView> DocumentListLoadView { get; set; }
        public DbSet<DocumentLandingView> DocumentLandingView { get; set; }

        public DbSet<ItemSpecification> ItemSpecification { get; set; }
        public DbSet<CombineEditView> CombineEditView { get; set; }
        public DbSet<AgreementMasterEditView> AgreementMasterEditView { get; set; }
        public DbSet<ExchangeRateModel> ExchangeRateModel { get; set; }
        public DbSet<SellerUnitModel> SellerUnitModel { get; set; }
        public DbSet<ItemEnlistmentModel> ItemEnlistmentModel { get; set; }
        public DbSet<ItemSellerUnitModel> ItemSellerUnitModel { get; set; }
        public DbSet<ItemTypeModel> ItemTypeModel { get; set; }
        public DbSet<FreightCostApprovalView> FreightCostApprovalView { get; set; }

        /*==============================FOR BIAX=============================*/
        public DbSet<PILandingView> PILandingView { get; set; }
        public DbSet<QuotationLandingView> QuotationLandingView { get; set; }
        public DbSet<SpotOrderView> SpotOrderView { get; set; }
        public DbSet<ConditionalApprovalView> ConditionalApprovalView { get; set; }
        public DbSet<ExcelUpload> ExcelUpload { get; set; }

        public DbSet<PIReportHeader> PIReportHeader { get; set; }
        public DbSet<PIReportLine> PIReportLine { get; set; }
        public DbSet<FreightCostLineDetails> FreightCostLineDetails { get; set; }
        public DbSet<FreightCostMaster> FreightCostMaster { get; set; }

        public DbSet<PriceConfirmQuotationApproval> GetPriceConfirmQuotationApprovals { get; set; }

        /*==============================END FOR BIAX=============================*/

        public DbSet<LCVSBILL> LCVSBILL { get; set; }
        public DbSet<LCVSBILLView> LCVSBILLView { get; set; }
        public DbSet<LCBankInfoModel> LCBankInfoModel { get; set; }
        public DbSet<LCBankInfoModelView> LCBankInfoModelView { get; set; }
        public DbSet<CustomerBankModel> CustomerBankModel { get; set; }
        public DbSet<MasterTypeModel> MasterTypeModel { get; set; }
        public DbSet<MasterTypeModelView> MasterTypeModelView { get; set; }

        public DbSet<CustomerModel> CustomerModel { get; set; }
    }
}
