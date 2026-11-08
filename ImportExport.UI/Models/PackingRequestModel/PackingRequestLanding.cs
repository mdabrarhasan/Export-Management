using Microsoft.Data.SqlClient;

namespace ImportExport.UI.Models.PackingRequestModel
{
    public class PackingRequestLanding
    {
        public int ID { get; set; }
        public string PACKREQNUMBER { get; set; }
        public string PACKREQDATE { get; set; }
        public string SHIPMENTPERIOD { get; set; }
        public int CUSTOMERID { get; set; }

        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }

        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }
        public string PISCNUMBER { get; set; }
        public int PACKINGMODE { get; set; }
        public int CUSTOMERCATEGORY { get; set; }
        public int SHIPPOINT { get; set; }
        public string BIAXPROTYPE { get; set; }


        public string INVOICENUMBER { get; set; }
        public string INVOICEDATE { get; set; }
        public string INVOICETO { get; set; }
        public string CONTRACTNO { get; set; }
        public string SHIPPEDPER { get; set; }


        public string SHIPPEDFROM { get; set; }
        public string SHIPPEDTO { get; set; }

        public string PURCHASEORDERNO { get; set; }
        public DateTime PURCHASEORDERDATED { get; set; }

    }
}
