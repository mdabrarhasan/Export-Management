using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ImportExport.UI.Models.CustomerInfoModel
{
    [Table("TBLCUSTOMERBANK")]
    public class CustomerBankModel
    {
        [Key]
        public int ID { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string CUSTOMERBANKBRANCHNAME { get; set; }
        public string CUSTOMERBANKNAME { get; set; }
        public string CUSTOMERBANKADDRESSLINEONE { get; set; }
        public string CUSTOMERBANKADDRESSLINETWO { get; set; }
        public string CUSTOMERBANKADDRESSLINETHREE { get; set; }
        public string CUSTOMERBANKBINNO { get; set; }
        public int? ISACTIVE { get; set; }
        public int? CREATEDBY { get; set; }
        public DateTime? CREATEDDATE { get; set; }
        public int? UPDATEDBY { get; set; }
        public DateTime? UPDATEDDATE { get; set; }
    }
}
