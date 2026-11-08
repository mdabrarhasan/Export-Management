using System.ComponentModel.DataAnnotations;
namespace ImportExport.UI.Models.Combine
{
    public class CombineHeader
    {
        [Key]
        public int ID { get; set; }
        public int PISCHEADER { get; set; }
        public int SOURCESCID { get; set; }
        public int UNITID { get; set; }
        public int SERIALNO { get; set; }
        public int ITEMID { get; set; }
        public int ITEMTYPEID { get; set; }
        public int UOMID { get; set; }
        public string ITEMTYPENAME { get; set; }
        public string ITEMNAME { get; set; }
        public string SIZE { get; set; }
        public string CONSTRUCTION { get; set; }
        public string WEIGHT { get; set; }
        public string SLIT { get; set; }
        public string SCRIM { get; set; }
        public string QUALITY { get; set; }
        public string ITEMTITLE { get; set; }
        public string PACKINGDETAILS { get; set; }
        public string UOM { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public int DISCOUNTID { get; set; }
        public string vatname { get; set; }
        public decimal DISCOUNT { get; set; }
        public int VATID { get; set; }
        public string disname { get; set; }
        public decimal VATAMOUNT { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public string REMARKS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int SHIPMENTMODE { get; set; }
        public int FROMSHIPMENT { get; set; }
        public int TOSHIPMENT { get; set; }
        public int CURRENCY { get; set; }
        public int LOADINGPORT { get; set; }
        public string LOADINGPLACE { get; set; }
        public string INCOTERM { get; set; }
        public int PAYMENTTERMS { get; set; }
        public string SHIPPINGPERIOD { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
        public string TEXTPAYMENT { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }
        public string DESTINATIONPORT { get; set; }
    }
}