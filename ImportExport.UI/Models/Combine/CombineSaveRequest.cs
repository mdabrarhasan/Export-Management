using ImportExport.UI.Models.AgreementModel;

namespace ImportExport.UI.Models.Combine
{
    public class CombineSaveRequest
    {
        public int id { get; set; }
        public int scid { get; set; }
        public int sctypeid { get; set; }
        public int[] sourceScIds { get; set; }
        //public int[] sourceLineIds { get; set; }
        public MergeSourceLine[] mergeSourceLines { get; set; }
        public AgreementLanding al { get; set; }
        public AgreementLandingDetails[] ald { get; set; }
    }
}
