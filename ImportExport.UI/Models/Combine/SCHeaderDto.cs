namespace ImportExport.UI.Models.Combine
{
    public class SCHeaderDto
    {
        public int ID { get; set; }
        public int UNITID { get; set; }
        public int SHIPMENTMODE { get; set; }
        public int FROMSHIPMENT { get; set; }
        public int TOSHIPMENT { get; set; }
        public int CURRENCY { get; set; }
        public int LOADINGPORT { get; set; }
        public string LOADINGPLACE { get; set; }
        public string INCOTERM { get; set; }
        public int PAYMENTTERMS { get; set; }
        public string DESTINATIONPORT { get; set; }
        public string EXPIREDATE { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
        public string TEXTPAYMENT { get; set; }

        // NEW
        public string DATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string BUYERREGNO { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string BUYERBANKDETAILS { get; set; }
        public int SELLERBANKID { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public int TRANSHIPMENT { get; set; }
        public int DELIVERYBY { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int AGREEMENTTYPEID { get; set; }
    }
}