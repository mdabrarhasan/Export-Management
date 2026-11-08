using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.CommonModel
{
    public class TBLWeight
    {
        [Key]
        public int ID { get; set; }
        public string Weight { get; set; }
        public Boolean IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
    }
}
