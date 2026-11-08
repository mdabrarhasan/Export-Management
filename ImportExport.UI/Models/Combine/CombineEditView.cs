//using System.ComponentModel.DataAnnotations;

//namespace ImportExport.UI.Models.Combine
//{
//    public class CombineEditView
//    {
//        public int? HISTRYID { get; set; }
//        [Key]
//        public int AGREEMENTID { get; set; }
//        public int? UNITID { get; set; }
//        public string PINUMBER { get; set; }
//        public int? SALESQUOTATIONHEADERID { get; set; }
//        public string AGREEMENTTYPEID { get; set; }
//        public string AGREEMENTTYPE { get; set; }
//        public int? SHIPMENTMODEID { get; set; }
//        public string HSCODE { get; set; }
//        public string BUYERREGNO { get; set; }
//        public string PIDATE { get; set; }
//        public string PIEXPIREDATE { get; set; }
//        public string SHIPMENTDATE { get; set; }
//        public string CUSTOMERNAME { get; set; }
//        public string SQNUMBER { get; set; }
//        public int? SHIPMENTID { get; set; }
//        public string SHIPMENT { get; set; }
//        public int? PAYMENTTERMID { get; set; }
//        public string PAYMENTTERM { get; set; }
//        public int? DELIVERYTERMID { get; set; }
//        public int? TOSHIPMENTCOUNTRYID { get; set; }
//        public string TOSHIPMENTCOUNTRY { get; set; }
//        public int FROMSHIPMENTCOUNTRYID { get; set; }
//        public string FROMSHIPMENTCOUNTRY { get; set; }
//        public int FROMSHIPMENTPORTID { get; set; }
//        public string FROMSHIPMENTPORT { get; set; }
//        public int TOSHIPMENTPORTID { get; set; }
//        public string TOSHIPMENTPORT { get; set; }
//        public string TARRIFCODE { get; set; }
//        public int INCOID { get; set; }
//        public string INTOTERM { get; set; }
//        public int CURRENCYID { get; set; }
//        public string CODE { get; set; }
//        public string DOSSTATUS { get; set; }
//        public string DOCUMENTCREATEDDATE { get; set; }
//        public string TERMSCONDITION { get; set; }
//        public string DESCRIPTIONS { get; set; }
//        public string CURRENCY { get; set; }
//        public string DELIVERYTERM { get; set; }
//        public int FLAG { get; set; }
//        public string BUYERBANKDETAILS { get; set; }
//        public int SELLERBANKID { get; set; }
//        public string BUYERCOUNTRYHSCODE { get; set; }
//        public int TRANSHIPMENT { get; set; }
//        public int PARTIALSHIPMENT { get; set; }
//        public string ORIGINOFCOUNTRY { get; set; }
//        public string BUYERORDERCONFIRMDATE { get; set; }
//        public string NOTIFYPARTY { get; set; }
//        public string OTHERSPAYTERM { get; set; }
//        public string DESTINATIONPORT { get; set; }
//        public string TEXTPAYMENT { get; set; }
//        public string TEXTFROMSHIPMENT { get; set; }
//        public bool ISPROCESSEDWITHAPPROVAL { get; set; }

//        // Edit-mode-specific properties — exclusive to GETMERGEAGREEMENTINFOMASTERDETAILSBYID
//        public string SOURCESCS { get; set; }
//        public string LOADINGPLACE { get; set; }
//        public int DELIVERYBY { get; set; }
//        public string TEXTDESTINATIONPORT { get; set; }
//        public string AGREEMENTTYPEID_INT { get; set; }
//    }
//}

using System.ComponentModel.DataAnnotations;
namespace ImportExport.UI.Models.Combine
{
    public class CombineEditView
    {
        public int? HISTRYID { get; set; }            // was int
        [Key]
        public int AGREEMENTID { get; set; }          // key — stays non-nullable
        public int? UNITID { get; set; }              // was int
        public string PINUMBER { get; set; }
        public int? SALESQUOTATIONHEADERID { get; set; }  // was int
        public string AGREEMENTTYPEID { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public int? SHIPMENTMODEID { get; set; }      // was int
        public string HSCODE { get; set; }
        public string BUYERREGNO { get; set; }
        public string PIDATE { get; set; }
        public string PIEXPIREDATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string SQNUMBER { get; set; }
        public int? SHIPMENTID { get; set; }          // was int
        public string SHIPMENT { get; set; }
        public int? PAYMENTTERMID { get; set; }       // was int
        public string PAYMENTTERM { get; set; }
        public int? DELIVERYTERMID { get; set; }      // was int
        public int? TOSHIPMENTCOUNTRYID { get; set; } // was int
        public string TOSHIPMENTCOUNTRY { get; set; }
        public int? FROMSHIPMENTCOUNTRYID { get; set; } // was int
        public string FROMSHIPMENTCOUNTRY { get; set; }
        public int? FROMSHIPMENTPORTID { get; set; }  // was int
        public string FROMSHIPMENTPORT { get; set; }
        public int? TOSHIPMENTPORTID { get; set; }    // was int
        public string TOSHIPMENTPORT { get; set; }
        public string TARRIFCODE { get; set; }
        public int? INCOID { get; set; }              // was int
        public string INTOTERM { get; set; }
        public int? CURRENCYID { get; set; }          // was int
        public string CODE { get; set; }
        public string DOSSTATUS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string CURRENCY { get; set; }
        public string DELIVERYTERM { get; set; }
        public int? FLAG { get; set; }                // was int
        public string BUYERBANKDETAILS { get; set; }
        public int? SELLERBANKID { get; set; }        // was int
        public string BUYERCOUNTRYHSCODE { get; set; }
        public int? TRANSHIPMENT { get; set; }        // was int
        public int? PARTIALSHIPMENT { get; set; }     // was int
        public string ORIGINOFCOUNTRY { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string OTHERSPAYTERM { get; set; }
        public string DESTINATIONPORT { get; set; }
        public string TEXTPAYMENT { get; set; }
        public string TEXTFROMSHIPMENT { get; set; }
        public bool? ISPROCESSEDWITHAPPROVAL { get; set; }  // was bool — see note
        // Edit-mode-specific properties — exclusive to GETMERGEAGREEMENTINFOMASTERDETAILSBYID
        public string SOURCESCS { get; set; }
        public string LOADINGPLACE { get; set; }
        public int? DELIVERYBY { get; set; }          // was int
        public string TEXTDESTINATIONPORT { get; set; }
        public string AGREEMENTTYPEID_INT { get; set; }
    }
}