namespace ImportExport.UI.Models.SalesQuatationLandingModel
{

    public class SalesQuatationLanding
    {
        public int ID { get; set; }
        public int UnitID { get; set; }
        public string GLOBALID { get; set; }
        public string SQNUMBER { get; set; }
        public int CUSTOMERID { get; set; }
        public string QUANTITYSUMMARY { get; set; }
        public string PACKING { get; set; }
        public string PRICEREPORT { get; set; }
        public string MARKER { get; set; }
        public string DESCRIPTIONSPECIFICATION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int DOCUMENTSTATUSID { get; set; }
        public int SHIPMENTMODE { get; set; }
        public int FROMSHIPMENT { get; set; }
        public int TOSHIPMENT { get; set; }
        public int CURRENCY { get; set; }
        public int LOADINGPORT { get; set; }
        public int INCOTERM { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string LOADINGPLACE { get; set; }

      //  public string COUNTRYOFORIGIN { get; set; }
        public string PAYMENTTERMS { get; set; }
        public string PAYMENTTERMS_OTHERS { get; set; }
        public int PAYMENTTERMSID { get; set; }
        public string SHIPPINGPERIOD { get; set; }
        public int SQTYPEID { get; set; }
        public string EXPIREDATE { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }
        public string DESTINATIONPORT { get; set; }
    }
}
