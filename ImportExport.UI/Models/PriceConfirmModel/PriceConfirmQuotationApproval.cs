namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class PriceConfirmQuotationApproval
    {
        public int ID { get; set; }

        public string PRODUCTCODE { get; set; }

        public string PRODUCTNAME { get; set; }

        public string CUSTOMERTNAME { get; set; }

        public string TERMSCONDITION { get; set; }

        public string REFERENCENUMBER { get; set; }

        public decimal THIKNESS { get; set; }

        public string UOM { get; set; }

        public decimal WIDTH { get; set; }
        public decimal QUANTITY { get; set; }

        public decimal PREVIOUSBASEDPRICE { get; set; }

        public decimal PROPOSEDBASEPRICE { get; set; }

        public string SALESTYPENAME { get; set; }

        public string ProductHScodeName { get; set; }
        public string HSCODE { get; set; }
        public string STARTDATE { get; set; }
        public string ENDDATE { get; set; }
    }
}
