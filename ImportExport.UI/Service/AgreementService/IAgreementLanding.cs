using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;

namespace ImportExport.UI.Service.AgreementService
{
    public interface IAgreementLanding
    {
        IQueryable<AgreementType> GetAgreementType();
        IQueryable<DropDownBind> GetSalesQuotation(int type,int enroll);
        IQueryable<AgreementLandingView> GetAgreementLandingAll(int enroll, string code, int unitid);

        string Save(AgreementLanding al, AgreementLandingDetails[] ald);

        string EditDetailsAdd(AgreementLandingDetails sqd, string agreementtypeid, int enroll, int unitid);

        IQueryable<AgreementMasterEditView> EditByMasterID(int id,int unitid,int enroll);
        IQueryable<AgreementLandingDetails> EditByDetailsID(int id);
        IQueryable<AgreementLandingDetails> GetSalesQuotationLine(int headerid,string alpha);
        public IQueryable<SalesQuotationHeaderAggrigation> GetSalesQuotationHeader(int headerid, string alpha);
        string Update(AgreementLanding agl);

        string DeletePIMasterByID(int id, int enroll, int unitid,string aggtypeid);

        string UpdatePIDetailsByID(AgreementLandingDetails sqd, string agreementtypeid, int unitid, int enroll);
        string DeletePIDetailsByID(int id,string aggtypeid, int enroll, int unitid);
        IQueryable<AgreementLandingDetails> EditByDetailsPI(int headerid);

    }
}
