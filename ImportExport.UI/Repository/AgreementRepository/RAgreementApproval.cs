using ImportExport.UI.Models.AgreementModel;
using ImportExport.UI.Models.SalesQuatationLandingModel;
using ImportExport.UI.Service.AgreementService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.AgreementRepository
{
    public class RAgreementApproval : IAgreementApproval
    {
        private Context _context;
        string Msg = "";

        public RAgreementApproval(Context context)
        {
            _context = context;
        }

        public IQueryable<AgreementLandingView> GetAgreementPending(int enroll, string modulecode,string aggcode, int unitid, string id)
        {
            SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
            SqlParameter Code = new SqlParameter("@Code", modulecode);
            SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter AggCode = new SqlParameter("@AGGCODE", aggcode);
            return _context.AgreementLandingView.FromSqlRaw("Exec GetAgreementInfoForApproval @Enroll,@UnitID,@Code,@ID,@AGGCODE", Enroll,UnitID,Code,ID,AggCode);
        }
        
        public IQueryable<AgreementLandingView> ViewByMasterID(int headerid)
        {
            int id = 0;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.AgreementLandingView.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
        }


        public IQueryable<AgreementLandingDetails> ViewByDetailsID(int headerid)
        {
            int id = 1;
            SqlParameter ID = new SqlParameter("@id", id);
            SqlParameter HeaderID = new SqlParameter("@headerid", headerid);

            return _context.AgreementLandingDetails.FromSqlRaw("Exec SPVIEWPISC @id,@headerid", ID, HeaderID);
        }
    }
}
