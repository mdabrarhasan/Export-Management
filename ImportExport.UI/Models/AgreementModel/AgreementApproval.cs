using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.AgreementModel
{
    public class AgreementApproval
    {
        [Key]
        public int ID { get; set; }
        public string PINUMBER { get; set; }
        public string PIDATE { get; set; }
        public string PIEXPIREDATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string SQNUMBER { get; set; }
        public string SHIPMENT { get; set; }
        public string PAYMENTTERM { get; set; }
        public string TOSHIPMENTCOUNTRY { get; set; }
        public string FROMSHIPMENTCOUNTRY { get; set; }
        public string FROMSHIPMENTPORT { get; set; }
        public string TOSHIPMENTPORT { get; set; }
        public string TARRIFCODE { get; set; }
        public string INTOTERM { get; set; }
        public string CODE { get; set; }
        public string DOSSTATUS { get; set; }
        public string TEXTDESTINATIONPORT { get; set; }
    }
}
