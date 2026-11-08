namespace ImportExport.UI.Models.LCModel
{
    public class LCView
    {
        public int ID { get; set; }
        public int HISTRYID { get; set; }
        public int PISCHEADERID { get; set; }
        public string LCNUMBER { get; set; }
        public string LCISSUEDATE { get; set; }
        public string LCEXPIREDATE { get; set; }
        //public string LCCREATEDPLACE { get; set; }
        public decimal TOELRANCECRAMTPERCENTAGE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSNAME { get; set; }
        public int SHIPMENTMODEID { get; set; }

        public string SHIPMENTMODE { get; set; }
        public string HSCODE { get; set; }

        public int PAYMENTTERMID { get; set; }
        public string PAYMENTTERM { get; set; }
        public int DOCUMENTSTATUSID { get; set; }
       
        public string DOCSTATUS { get; set; }
        public int AGREEMENTTYPEID { get; set; }

        public string AGREEMENTTYPE { get; set; }
        public string TODISCHARGEPORT { get; set; }

        public string CODE { get; set; }

        public string LOADINGPORTNAME { get; set; }

        public string PRESENTATIONINDATE { get; set; }

        public int TRANSHIPMENTID { get; set; }
        public string TRANSSHIPMENT { get; set; }
        public string NOTIFIEDPARTYDETAILS { get; set; }
        ////heloo
        public int PARTIALSHIPMENTID { get; set; }
        public string PARTIALSHIPMENT { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }

        public string BUYERADDITIONALCONDITION { get; set; }
        public string BUYERDOCUMENTREQUIRED { get; set; }
        public string BUYERBANK { get; set; }
        public string PISC { get; set;}
        public int FLAG { get; set; }

        public string LCEXPIREDPLACE { get; set; }
        public string LCTENORPERIOD { get; set; }

        public int CURRENCYID { get; set; }
        public string CURRENCY { get; set; }
        public string SHIPMENTLATESTDATE { get; set; }
        public string INVOICENO { get; set; }
        public string DOCUMENTREQUIRE { get; set; }
        public int BUYERBANKID { get; set; }
        public string BILLNO { get; set; }
        public int TYPE { get; set; }
    }
}
