using ImportExport.UI.Models.Menu;


namespace ImportExport.UI.Service.MenuService
{
    public interface IMenu 
    {
        public IQueryable<Menus> GetMenuList(int enroll);
    }
}
