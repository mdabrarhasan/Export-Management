namespace ImportExport.UI.Models.PackingReqConfirmModel
{
    public class PickingPackingRequestLandingView
    {
        public int ID { get; set; }
        public string PICKPACKNUMBER { get; set; }
        public int PACKINGREQUESTHEADERID { get; set; }
        public string PICKPACKDATE { get; set; }
        public string PACKREQNUMBER { get; set; }
        public string PACKREQDATE { get; set; }
        public string TERMSCONDITION { get; set; }

        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string CUSTOMERNAME { get; set; }

        public string CURRENCY { get; set; }
        public string PISCNUMBER { get; set; }
        public string CODE { get; set; }
        public string DOCSTATUS { get; set; }


        public int AGREEMENTTYPEID { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public int SHIPMENTMODEID { get; set; }

        public string SHIPMENTMODE { get; set; }
        public int PAYMENTTERMID { get; set; }
        public string PAYMENTTERM { get; set; }
        public int TOSHIPMENTCOUNTRYID { get; set; }

        public string TOSHIPMENTCOUNTRY { get; set; }

        public string TODISCHARGEPORT { get; set; }
        public string DISCHARGEPORT { get; set; }

        public int TRANSHIPMENT { get; set; }
        public string TRANSHIPMENTNAME { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string PARTIALSHIPMENTNAME { get; set; }

        public string NOTIFYPARTY { get; set; }
        public string SHIPMENTPERIOD { get; set; }

        public int FLAG { get; set; }

        public string INVOICENO { get; set; }
    }
}
