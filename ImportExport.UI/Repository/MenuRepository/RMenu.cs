using ImportExport.UI.Models.Menu;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.MenuService;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.MenuRepository
{
    public class RMenu : IMenu
    {
        private Context _context;
        public RMenu(Context context)
        {
            _context = context;
        }
        public IQueryable<Menus> GetMenuList(int enroll)
        {
            try
            {
                SqlParameter Enroll = new SqlParameter("@Enroll", enroll);
                return _context.Menu.FromSqlRaw("Exec SPGETMENULIST @Enroll", Enroll);
            }
            catch (Exception) { 
            
            }
            finally
            { }
            return null;
        }
    }
}
