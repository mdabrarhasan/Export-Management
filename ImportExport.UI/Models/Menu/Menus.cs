using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.Menu
{
    public class Menus
    {
        [Key]
        public int ID { get; set; }
        public int MENUID { get; set; }
        public string SUBMENU { get; set; }
        public string ICON { get; set; }
        public int SUBMENUID { get; set; }
        public string SUBMENUNAME { get; set; }
        public string CONTROLLERNAME { get; set; }
        public string VIEWNAME { get; set; }
        
        public int CANINSERT { get; set; }
        public int CANUPDATE { get; set; }
        public int CANDELETE { get; set; }
        public int CANVIEW { get; set; }
        public int CANPRINT { get; set; }
        public int UNITID { get; set; }
    }
}
