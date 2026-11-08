using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.AgreementModel
{
    public class AgreementMasterEditView
    {
        public int HISTRYID { get; set; }
        [Key]
        public int AGREEMENTID { get; set; }
        public int UNITID { get; set; }
        public string PINUMBER { get; set; }
        public int SALESQUOTATIONHEADERID { get; set; }
        public string AGREEMENTTYPEID { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public int SHIPMENTMODEID { get; set; }
        public string HSCODE { get; set; }
        public string BUYERREGNO { get; set; }
        public string PIDATE { get; set; }
        public string PIEXPIREDATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string SQNUMBER { get; set; }
        public int SHIPMENTID { get; set; }
        public string SHIPMENT { get; set; }
        public int PAYMENTTERMID { get; set; }
        public string PAYMENTTERM { get; set; }
        public int DELIVERYTERMID { get; set; }
        public int TOSHIPMENTCOUNTRYID { get; set; }
        public string TOSHIPMENTCOUNTRY { get; set; }
        public int FROMSHIPMENTCOUNTRYID { get; set; }
        public string FROMSHIPMENTCOUNTRY { get; set; }
        public int FROMSHIPMENTPORTID { get; set; }
        public string FROMSHIPMENTPORT { get; set; }
        public int TOSHIPMENTPORTID { get; set; }
        public string TOSHIPMENTPORT { get; set; }
        public string TARRIFCODE { get; set; }
        public int INCOID { get; set; }
        public string INTOTERM { get; set; }
        public int CURRENCYID { get; set; }
        public string CODE { get; set; }
        public string DOSSTATUS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string CURRENCY { get; set; }
        public string DELIVERYTERM { get; set; }
        public int FLAG { get; set; }
        public string BUYERBANKDETAILS { get; set; }
        public int SELLERBANKID { get; set; }
        public string BUYERCOUNTRYHSCODE { get; set; }
        public int TRANSHIPMENT { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string ORIGINOFCOUNTRY { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string OTHERSPAYTERM { get; set; }
        public string DESTINATIONPORT { get; set; }
        public string TEXTPAYMENT { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }
        public Boolean ISPROCESSEDWITHAPPROVAL { get; set; }

        // NEW — surfaced only for the EditByMasterID screen
        public string LOADINGPLACE { get; set; }
        public int LOADINGBYID { get; set; }
        public int TRANSPORTATIONMODE { get; set; }
    }
}