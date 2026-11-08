using ImportExport.UI.Models.AuthModel;
using ImportExport.UI.Models.CommonModel;

namespace ImportExport.UI.Service.Login
{
    public interface ILogin
    {
        IQueryable<LoginModel> CheckLogin(string username,string password);
    }
}
