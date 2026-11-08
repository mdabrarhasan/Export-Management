using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.AgreementModel
{
    public class AgreementLanding
    {
        [Key]
        public int ID { get; set; }
        public int SALESQUOTATIONHEADERID { get; set; }
        public string AGREEMENTTYPEID { get; set; }
        public string NUMBER { get; set; }
        public string DATE { get; set; }
        public string EXPIREDATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public int SHIPMENTMODEID { get; set; }
        public int PAYMENTTERMID { get; set; }
        public int DELIVERYTERMID { get; set; }
        
        public string TERMSCONDITION { get; set; }
        public string LOADINGPLACE { get; set; }
        public int DELIVERYBY { get; set; }
        public int TOSHIPMENTCOUNTRYID { get; set; }
        public int FROMSHIPMENTCOUNTRYID { get; set; }
        
        public int FROMSHIPMENTPORTID { get; set; }
        public string TODISCHARGEPORT { get; set; }

        public string TARRIFCODE { get; set; }
        public string BUYERREGNO { get; set; }
        public string HSCODE { get; set; }
        public int INCOID { get; set; }
        public string INTOTERM { get; set; }
        public int CURRENCYID { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }



        public string BUYERBANKDETAILS { get; set; }
        public int SELLERBANKID { get; set; }
        public string BUYERCOUNTRYHSCODE { get; set; }
        public int TRANSHIPMENT { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string ORIGINOFCOUNTRY { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string OTHERSPAYTERM { get; set; }
        public string  TEXTPAYMENT { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }

        public string TEXTDESTINATIONPORT { get; set; }

    }
}
