namespace ImportExport.UI.Models.PackingRequestModel
{
    public class PackingRequestLandingHeader
    {
        public int ID { get; set; }
        public string INVOICENUMBER { get; set; }
        public string INVOICEDATE { get; set; }

        public string INVOICETO { get; set; }

        public string SHIPPEDFROM { get; set; }

        public string SHIPPEDTO { get; set; }

        public string SHIPPEDPER { get; set; }

        public string CONTRACTNO { get; set; }

        public DateTime PACKREQDATE { get; set; }

        public DateTime SHIPMENTPERIOD { get; set; }

        public string PURCHASEORDERNO { get; set; }

        public DateTime PURCHASEORDERDATED { get; set; }

        public string PACKREQNUMBER { get; set; }
        public int PISCNUMBER { get; set; }

    }
}
