using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.LCModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.LCService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.LCRepository
{
    public class RLCApproval : ILCApproval
    {
        private Context _context;
        public RLCApproval(Context context)
        {
            _context = context;
        }

        public IQueryable<LCView> ViewLCData(int id)
        {
            int type = 1;
            SqlParameter TYPE = new SqlParameter("@type", type);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", id);

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATA @TYPE,@ENROLL", TYPE, ENROLL);
        }

        public IQueryable<LCView> ViewLCDataBiax(int id)
        {
            int type = 2;
            SqlParameter TYPE = new SqlParameter("@type", type);
            SqlParameter ID = new SqlParameter("@ID", id);
            SqlParameter ENROLL = new SqlParameter("@ENROLL", id);

            return _context.LCView.FromSqlRaw("Exec SPGETLCDATABIAX @TYPE,@ID,@ENROLL", TYPE,ID,ENROLL);
        }


        public IQueryable<LCView> GetLCPending(int enroll,int unitid, string id)
        {
            SqlParameter UnitID = new SqlParameter("@UnitID", unitid);
            SqlParameter Code = new SqlParameter("@Code", enumSubMenu.LC00001.ToString());
            SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
            SqlParameter ID = new SqlParameter("@ID", id);
            return _context.LCView.FromSqlRaw("Exec SPGETLCDATAFORAPPROVAL @Enroll,@UnitID,@Code,@ID", UnitID, Code, Enroll, ID);
        }

        public IQueryable<LCView> ViewByMasterID(int headerid)
        {
            throw new NotImplementedException();
        }
    }
}
