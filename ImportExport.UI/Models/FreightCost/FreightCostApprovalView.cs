using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.FreightCost
{
    public class FreightCostApprovalView
    {
        [Key]
        public int ID { get; set; }                 // TBLAPPROVERMATRIXHISTORY.ID
        public int FCID { get; set; }               // TBLFREIGHTCOST.ID
        public string SCNAME { get; set; }
        public string PRNAME { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string SUPPLIERNAME { get; set; }
        public decimal AMOUNT { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string CODE { get; set; }
        public string DOCSTATUS { get; set; }
        public int FLAG { get; set; }
        public int? ERPPOID { get; set; }
    }
}