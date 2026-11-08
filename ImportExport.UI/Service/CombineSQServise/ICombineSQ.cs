using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.Combine;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.QuotationModel;

namespace ImportExport.UI.Service.CombineSQServise
{
    public interface ICombineSQ
    {
        IQueryable<AgreementLandingView> GetAgreementLandingAll(int enroll, string code, int unitid);
        string UpdatePIDetailsByID(AgreementLandingDetails sqd, string agreementtypeid, int unitid, int enroll);
        //IQueryable<AgreementLandingView> EditByMasterID(int id, int unitid, int enroll);
        IQueryable<CombineEditView> EditByMasterID(int id, int unitid, int enroll);
        IQueryable<AgreementLandingDetails> EditByDetailsID(int id);
        //IQueryable<AgreementLandingView> ViewByMasterID(int headerid);
        IQueryable<CombineEditView> ViewByMasterID(int headerid);
        public IQueryable<DropDownBind> GetSQ(string prefix);
        public IQueryable<DropDownBind> GetSC(string prefix, string sqIds);
        public IQueryable<DropDownBind> GetSCList(string prefix);
        public IQueryable<DropDownBind> GetSCExisting(string prefix, string excludeIds);
        public SCMatchResult ValidateSCMatch(int baselineId, int candidateId);
        public SCHeaderDto GetSCHeader(int scId);
        public string GetSQItem(AgreementLanding al,Hscodes[] HS);
        public IQueryable<CombineHeader> GetCombineSQitem(Hscodes[] HS);

        string DeletePIDetailsByID(int id, string aggtypeid, int enroll, int unitid);

        //public string Save(int id, int scid, int sctypeid, AgreementLanding al, AgreementLandingDetails[] ald);
        //public string Save(int id, int scid, int sctypeid, string sourceScIds, string sourceLineIds, AgreementLanding al, AgreementLandingDetails[] ald);
        public string Save(int id, int scid, int sctypeid, string sourceScIds, MergeSourceLine[] mergeSourceLines, AgreementLanding al, AgreementLandingDetails[] ald);
    }
}
