using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.CommonModel
{
    public class Account
    {
        [Key]
        public string userid { get; set; } 
        public string password { get; set; }
        public string devicedetails { get; set; }
        public string channel { get; set; }
    }
}
