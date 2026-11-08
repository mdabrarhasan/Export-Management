namespace ImportExport.UI.Models.AgreementModel
{
    public class SalesQuotationHeaderAggrigation
    {
        public int ID { get; set; }
        public int UNITID { get; set; }
        public int CURRENCY { get; set; }
        public int SHIPMENTMODE { get; set; }
        public int FROMSHIPMENT { get; set; }
        public int TOSHIPMENT { get; set; }
        public int LOADINGPORT { get; set; }
        public string DESTINATIONPORT { get; set; }
        public string LOADINGPLACE { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
        public string PAYMENTTERMS { get; set; }
        public int PAYMENTTERMID { get; set; }
        public string TOSHIPMENTNAME { get; set; }
        public int INCOTERM { get; set; }
    }
}
