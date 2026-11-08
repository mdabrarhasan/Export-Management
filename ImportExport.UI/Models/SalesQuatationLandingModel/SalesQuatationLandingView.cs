namespace ImportExport.UI.Models.SalesQuatationLandingModel
{
    public class SalesQuatationLandingView
    {
        public int HISTRYID { get; set; }
        public int ID { get; set; }
        public int UNITID { get; set; }
        public string UNITNAME { get; set; }
        public string UNITDESCRIPTION { get; set; }
        public string GLOBALID { get; set; }
        public string SQNUMBER { get; set; }
        public int CUSID { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string CUSPHONE { get; set; }
        public string CUSEMAIL { get; set; }
        public string CUSADDRESS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DESCRIPTIONSPECIFICATION { get; set; }
        public string QUANTITYSUMMARY { get; set; }
        public string PACKING { get; set; }
        public string PRICEREPORT { get; set; }
        public string MARKER { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public string DOCSTATUS { get; set; }
        public int DOCUMENTSTATUSID { get; set; }
        public int SHIPMENTMODE { get; set; }
        public int FROMSHIPMENT { get; set; }
        public int TOSHIPMENT { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }
        public string DESTINATIONPORT { get; set; }
        public int CURRENCY { get; set; }
        public int LOADINGPORT { get; set; }
        public string LOADINGPLACE { get; set; }
        public int INCOTERM { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
        public string PAYMENTTERMS { get; set; }
        public int PAYMENTTERMSID { get; set; }
        public string PAYMENTTERMSOTHERS { get; set; }
        public string SHIPPINGPERIOD { get; set; }
        public int SQTYPEID { get; set; }
        public string SQTYPENAME { get; set; }
        public string EXPIREDATE { get; set; }
        public string CODE { get; set; }
        public int FLAG { get; set; }
        public bool ISPROCESSEDWITHAPPROVAL { get; set; }

        // Seller info
        public string SELLEREMAIL { get; set; }
        public string SELLERPHONE { get; set; }
        public string SELLERTIN { get; set; }
    }
}
