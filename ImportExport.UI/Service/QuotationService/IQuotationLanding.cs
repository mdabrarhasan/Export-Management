using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.QuotationModel;
using System.Data;

namespace ImportExport.UI.Service.QuotationService
{
    public interface IQuotationLanding
    {
        IQueryable<OCFListView> GetOCFList(int type);
        IQueryable<DropDownBind> GetQuotationList();
        string UploadExcel(DataTable dt);
        public IQueryable<OCFListView> GetOCFItems(int id);
        public IQueryable<OCFListView> GetExcelData();

        IQueryable<CustomerInfo> GetCustomerInfo(string prefix, int unitid);
        public IQueryable<PIReportHeader> GetHeaderPrint(int id, int typeid);
        public IQueryable<PIReportLine> GetLinePrint(int id);

        //IQueryable<SpotOrderView> GetCommonOCF(int typeid, int id, int enroll);
        /*==========================LANDING===============================*/
        IQueryable<PILandingView> GetProformaInvoice(int typeid, int enroll);
        IQueryable<QuotationLandingView> GetSalesQuotation(int typeid, int enroll);
        IQueryable<SpotOrderView> GetSpotOrder(int typeid, int enroll);
        IQueryable<ConditionalApprovalView> GetConditionalApproval(int typeid, int enroll);
        /*==========================END LANDING===============================*/



        /*==========================LANDING===============================*/
        IQueryable<PILandingView> GetProformaInvoiceView(int typeid,int id, int enroll);
        IQueryable<QuotationLandingView> GetSalesQuotationView(int typeid, int id, int enroll);
        IQueryable<SpotOrderView> GetSpotOrderView(int typeid, int id, int enroll);
        IQueryable<ConditionalApprovalView> GetConditionalApprovalView(int typeid, int id, int enroll);
        /*==========================LANDING===============================*/



        /*==========================OCF VIEW ===============================*/
        IQueryable<PILandingView> GetProformaInvoiceViewOCF(int typeid, int id, int enroll);
        IQueryable<QuotationLandingView> GetSalesQuotationViewOCF(int typeid, int id, int enroll);
        IQueryable<SpotOrderView> GetSpotOrderViewOCF(int typeid, int id, int enroll);
        IQueryable<ConditionalApprovalView> GetConditionalApprovalViewOCF(int typeid, int id, int enroll);
        /*==========================OCF VIEW ===============================*/


        /*==========================INSERT===============================*/
        string SavePI(PILanding PI, PILandingDetails[] PID, Hscodes[] HS);
        string SaveSQ(SQuatationLanding SQ, PILandingDetails[] SQD);
        string SaveConApp(ConditionalApproval SQ, PILandingDetails[] SQD);
        string SaveSpot(SpotOrder SQ, PILandingDetails[] SQD);
        /*==========================END INSERT===============================*/


        /*==========================UPDATE===============================*/
        string UpdatePI(PILanding PI);
        string UpdateSQ(SQuatationLanding SQ);
        string UpdateConApp(ConditionalApproval SQ);
        string UpdateSpot(SpotOrder SQ);
        /*==========================UPDATE===============================*/



        string ESaveLine(PILandingDetails[] PID,int ID,int unitid,int enroll);
        string UpdateLine(PILandingDetails[] PID,int ID,int unitid, int enroll);

        string DeletePIMasterByID(int id, int enroll, int unitid, string aggtypeid);
        string DeleteDetailsByID(int id, int enroll, int unitid);
    }
}
