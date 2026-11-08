using ImportExport.UI.Models.AuthModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.Login;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ImportExport.UI.Repository.LoginRepository
{
    public class RLogin : ILogin
    {
        string strMsg = "";
        private Context _context;
        private FileServerModel server = new FileServerModel();
        private UserInfo info = new UserInfo();
        private ICommon _common;

        public RLogin(Context context)
        {
            _context = context;
        }

        public IQueryable<LoginModel> CheckLogin(string username,string password)
        {
            SqlParameter Type = new SqlParameter("@Type", 2);
            SqlParameter UserName = new SqlParameter("@UserName", username == null ? "" : username);
            SqlParameter Password = new SqlParameter("@Password", password==null? "" : password);

             return _context.Login.FromSqlRaw("Exec SPLogin @Type,@UserName,@Password", Type,UserName, Password);

           
        }

       
    }
}
