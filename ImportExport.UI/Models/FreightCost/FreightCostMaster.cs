using System.ComponentModel.DataAnnotations.Schema;

namespace ImportExport.UI.Models.FreightCost
{

    public class FreightCostMaster
    {
        public int ID { get; set; }  //TBL FREIGHTCOST ID
        public int SCID { get; set; }
        public int PRID { get; set; }
        public int UNIT { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        
        public DateTime? DOCUMENTCREATEDDATE { get; set; }
        public string PRNAME { get; set; }
        public string SCNAME { get; set; }
        public string DOCUMENTSTATUSCODE { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string SUPPLIERNAME { get; set; }
        public decimal AMOUNT { get; set; }
        public int FLAG { get; set; }
        public int? ERPPOID { get; set; }
        [NotMapped]
        public int? SUPPLIERID { get; set; }
    }
}

