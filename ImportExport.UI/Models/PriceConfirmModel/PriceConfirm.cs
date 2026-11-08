using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class PriceConfirm
    {

        [Key]
        public int ID { get; set; }
        public int SALESQUOTATIONHEADERID { get; set; }
        public int PROFORMAINVOICEHEADERID { get; set; }
        public int PCNUMBER { get; set; }

        public int SELLERID { get; set; }
        public int CUSTOMERID { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string PRICEEXDATE { get; set; }
        public int UNITID { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
    }

    public class PriceConfirmQuotationDetails
    {

        public int ID { get; set; }
        public int HEADERID { get; set; }
        public Int64 ITEMID { get; set; }
        public string PRODUCTCODE { get; set; }
        public string ITEMNAME { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public decimal OFFERPRICE { get; set; }
        public decimal CONFIRMPRICE { get; set; }
        public int DISCOUNTID { get; set; }
        public string DISCOUNT { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public int UOMID { get; set; }
        public string UOM { get; set; }

        public decimal THIKNESS { get; set; }
        public decimal WIDTH { get; set; }
        public decimal LENGTH { get; set; }
        public string TREATMENTLEVEL { get; set; }
        public int TREATMENTDIRECTIONID { get; set; }
        public string TREATMENTDIRECTION { get; set; }
        public int COREID { get; set; }
        public string CORENAME { get; set; }

        public string DISEREDDATEOFDELIVERY { get; set; }
        public string TENTATIVEDATEOFDELIVERY { get; set; }
        public string REMARKS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string REALOD { get; set; }
    }
}
