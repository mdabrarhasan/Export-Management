using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.MasterTypeModel
{
    public class MasterTypeModel
    {
        [Key]
        public int ID { get; set; }
        public string MASTERTYPE { get; set; }
        public string VALUE { get; set; }
        public bool? ISACTIVE { get; set; }
        public int? CREATEDBY { get; set; }
        public DateTime? CREATEDDATE { get; set; }
        public int? UPDATEDBY { get; set; }
        public DateTime? UPDATEDDATE { get; set; }
    }

    public class MasterTypeModelView
    {
        [Key]
        public int ID { get; set; }
        public string MASTERTYPE { get; set; }
        public string VALUE { get; set; }
        public bool? ISACTIVE { get; set; }
        public int? CREATEDBY { get; set; }
        public DateTime? CREATEDDATE { get; set; }
        public int? UPDATEDBY { get; set; }
        public DateTime? UPDATEDDATE { get; set; }
    }
}
