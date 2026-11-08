using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class PriceConfirmView
    {
        public int ID { get; set; }
        public int HISTRYID { get; set; }
        public int BUSINESSUNITID { get; set; }
        public int SALESQUOTATIONHEADERID { get; set; }
        public int CUSTOMERID { get; set; }
        public int UNITID { get; set; }
        public string PCNUMBER { get; set; }
        public string SQNUMBER { get; set; }
        public int PROFORMAINVOICEHEADERID { get; set; }
        public string NUMBER { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string SELLERNAME { get; set; }
        public string CUSNAME { get; set; }
        public string CURRENCY { get; set; }
        public string DOCSTATUS { get; set; }
        public string CODE { get; set; }

        public int FLAG { get; set; }

    }
}
