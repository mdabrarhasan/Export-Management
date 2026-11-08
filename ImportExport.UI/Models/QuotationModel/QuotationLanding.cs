using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.QuotationModel
{
    public class QuotationLanding
    {
        [Key]
        public int ID { get; set; }
        public int CUSTOMERID { get; set; }
        public int SALESTYPEID { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITDAYS { get; set; }

    }

    public class SQuatationLanding
    {
        [Key]
        public int ID { get; set; }
        public int UNITID { get; set; }
        public int ISEXCEL { get; set; }
        public string GLOBALID { get; set; }
        public string SQNUMBER { get; set; }
        public int CUSTOMERID { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int DOCUMENTSTATUSID { get; set; }
        public string TERMSCONDITION { get; set; }
        public int SQTYPEID { get; set; }
        public string EXPIREDATE { get; set; }
        public int QUOTATIONTYPEID { get; set; }

        public int SALESTYPEID { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITDAYS { get; set; }

        public int OCFID { get; set; }
        public string OCFNO { get; set; }
    }

    public class QuotationLandingView
    {
        public int HISTRYID { get; set; }
        [Key]
        public int ID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSNAME { get; set; }
        public string QUOTATIONNUMBER { get; set; }
        public string EXPIREDATE { get; set; }
        public int SQTYPEID { get; set; }
        public string SQTYPE { get; set; }
        public string CODE { get; set; }
        public string DOCSTATUS { get; set; }
        public string EMPNAME { get; set; }

        public int SALESTYPEID { get; set; }
        public string SALESTYPE { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITTYPE { get; set; }
        public string CREDITDAYS { get; set; }

        public int OCFID { get; set; }
        public string OCFNO { get; set; }
        public string TERMSCONDITION { get; set; }
    }

    public class PILanding
    {
        [Key]
        public int ID { get; set; }
        //public int SALESQUOTATIONHEADERID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public int CUSTOMERID { get; set; }
        public int PITYPEID { get; set; }
        public int ISEXCEL { get; set; }
        public string QUOTATIONNUMBER { get; set; }
        public string DATE { get; set; }
        public string EXPIREDATE { get; set; }
        public string SHIPMENTDATE { get; set; }
        public int SHIPMENTMODEID { get; set; }
        public int PAYMENTTERMID { get; set; }
        public int DELIVERYTERMID { get; set; }

        public string TERMSCONDITION { get; set; }
        public string ORDERREFNO { get; set; }
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
        public int BUYERBANKID { get; set; }
        public string BUYERCOUNTRYHSCODE { get; set; }
        public int TRANSHIPMENT { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string ORIGINOFCOUNTRY { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string OTHERSPAYTERM { get; set; }


        public int SALESTYPEID { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITDAYS { get; set; }
        public int OCFID { get; set; }
        public string OCFNO { get; set; }

        public string FREEINCOTERM { get; set; }
        public string FREEPAYMENTTERM { get; set; }
        public string DISCHARGEPLACE { get; set; }
        public int TOLARENCEID { get; set; }

        public int DELPOINTID { get; set; }

    }

    public class PILandingView
    {
        public int HISTRYID { get; set; }
        [Key]
        public int AGREEMENTID { get; set; }
        public int UNITID { get; set; }

        public int PITYPEID { get; set; }
        public string PINUMBER { get; set; }
        public int SALESQUOTATIONHEADERID { get; set; }
        public int LOADINGBYID { get; set; }
        public string LOADINGBY { get; set; }
        public string LOADINGPLACE { get; set; }
        public int AGREEMENTTYPEID { get; set; }
        public string AGREEMENTTYPE { get; set; }
        public int SHIPMENTMODEID { get; set; }
        public string HSCODE { get; set; }
        public string PITYPE { get; set; }
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
        public int DOCSTATUSID { get; set; }
        public string DOSSTATUS { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }

        public string CURRENCY { get; set; }
        public string DELIVERYTERM { get; set; }
        public int FLAG { get; set; }

        public string FREEINCOTERM { get; set; }
        public string FREEPAYMENTTERM { get; set; }
        public int TOLARENCEID { get; set; }

        public string BUYERBANKDETAILS { get; set; }
        public int SELLERBANKID { get; set; }
        public int BUYERBANKID { get; set; }

        public int DELPOINTID { get; set; }
        public string DELPOINTCONTRACTPERSON { get; set; }
        public string DELPOINTCONTRACTNO { get; set; }
        public string DELPOINTADDRESS { get; set; }
        public string DELPOINTNAME { get; set; }

        public string BUYERCOUNTRYHSCODE { get; set; }
        public int TRANSHIPMENT { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string ORIGINOFCOUNTRY { get; set; }
        public string BUYERORDERCONFIRMDATE { get; set; }
        public string NOTIFYPARTY { get; set; }
        public string OTHERSPAYTERM { get; set; }
        public Boolean ISPROCESSEDWITHAPPROVAL { get; set; }
        public int SALESTYPEID { get; set; }
        public string SALESTYPE { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITTYPE { get; set; }
        public string CREDITDAYS { get; set; }
        public int OCFID { get; set; }
        public string OCFNO { get; set; }
    }
    public class PILandingDetails
    {
        [Key]
        public int ID { get; set; }
        public int PISCHEADER { get; set; }
        public int UNITID { get; set; }
        public string BATCHID { get; set; }
        public int SERIALNO { get; set; }
        public int ITEMID { get; set; }
        public string HSCODE { get; set; }
        public string ITEMNAME { get; set; }
        public string UOM { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public decimal TOTALWT { get; set; }
        public decimal ROLLLENGTH { get; set; }
        public int DISCOUNTID { get; set; }
        public string vatname { get; set; }
 
        public decimal DISCOUNT { get; set; }
        public int VATID { get; set; }
        public string disname { get; set; }
        public decimal VATAMOUNT { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public int TOLERANCEID { get; set; }
        public string REMARKS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string FROMSHIPMENTSCHEDULEDATE { get; set; }
        public string TOSHIPMENTSCHEDULEDATE { get; set; }


        public int UOMID { get; set; }

        public decimal THIKNESS { get; set; }
        public decimal WIDTH { get; set; }
        public decimal LENGTH { get; set; }
        public string TREATMENTLEVEL { get; set; }

        public int TREATMENTDIRECTIONID { get; set; }
        public string TREATMENTDIRECTION { get; set; }

        public int COREID { get; set; }
        public string CORE { get; set; }

        public string REALOD { get; set; }
        public string DISEREDDATEOFDELIVERY { get; set; }
        public string TENTATIVEDATEOFDELIVERY { get; set; }
        public string OTHERSPAYTERM { get; set; }

        public string SHIPMENTMARK { get; set; }
    }

    public class OCFListView
    {
        public int ID { get; set; }
        public int HEADERID { get; set; }
        public Int64 ITEMID { get; set; }
        public string PRODUCTCODE { get; set; }
        public string ITEMNAME { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public int DISCOUNTID { get; set; }
        public string DISCOUNT { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public int UOMID { get; set; }
        public string UOM { get; set; }

        public decimal THIKNESS { get; set; }
        public decimal WIDTH { get; set; }
        public decimal LENGTH { get; set; }
        public string TREATMENTLEVEL { get; set; }
        public int TREATMENTDIRECTIONID { get; set; }
        public string TREATMENTDIRECTION { get; set; }
        public int COREID { get; set; }
        public string CORENAME { get; set; }
        public int TOLERANCEID { get; set; }
        public string TOLERANCE { get; set; }
        public string DISEREDDATEOFDELIVERY { get; set; }
        public string TENTATIVEDATEOFDELIVERY { get; set; }
        public string REMARKS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string REALOD { get; set; } 
        public string BUYERNAME { get; set; } 
        public int BUYERID { get; set; } 
    }

    public class SpotOrder
    {
        
        [Key]
        public int ID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public int CUSTOMERID { get; set; }
        public int ISEXCEL { get; set; }
        public string SPOTDATE { get; set; }
        public string LASTDATEOFDO { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }

        public int SALESTYPEID { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITDAYS { get; set; }

        public int OCFID { get; set; }
        public string OCFNO { get; set; }
    }

    public class SpotOrderView
    {
        public int HISTRYID { get; set; }
        [Key]
        public int ID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSNAME { get; set; }
        public string QUOTATIONNUMBER { get; set; }
        public string SPOTDATE { get; set; }
        public string LASTDATEOFDO { get; set; }
        public string CODE { get; set; }
        public string DOCSTATUS { get; set; }
        public string EMPNAME { get; set; }
        public int SALESTYPEID { get; set; }
        public string SALESTYPE { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITTYPE { get; set; }
        public string CREDITDAYS { get; set; }
        public int OCFID { get; set; }
        public string OCFNO { get; set; }
        public string TERMSCONDITION { get; set; }
    }
    public class ConditionalApproval
    {
        [Key]
        public int ID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public int WHID { get; set; }
        public int ISEXCEL { get; set; }
        public int CUSTOMERID { get; set; }
        public string CONAPPSTATRDATE { get; set; }
        public string CONAPPENDDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }
        public int SALESTYPEID { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITDAYS { get; set; }

        public int OCFID { get; set; }
        public string OCFNO { get; set; }
    }

    public class ConditionalApprovalView
    {
        [Key]
        public int ID { get; set; }
        public int HISTRYID { get; set; }
        public int QUOTATIONTYPEID { get; set; }
        public string QUOTATIONNUMBER { get; set; }
        public int WHID { get; set; }
        public string WHNAME { get; set; }
        public string CONAPPSTATRDATE { get; set; }

        public string CONAPPENDDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string CODE { get; set; }
        public string DOCSTATUS { get; set; }
        public string EMPNAME { get; set; }
        public int SALESTYPEID { get; set; }
        public string SALESTYPE { get; set; }
        public int CREDITTYPEID { get; set; }
        public string CREDITTYPE { get; set; }
        public string CREDITDAYS { get; set; }

        public int OCFID { get; set; }
        public string OCFNO { get; set; }
    }
    public class ExcelUpload
    {
        [Key]
        public int ID { get; set; }
        public string strOCFNo { get; set; }
        public string strProductCode { get; set; }
        public string strProductName { get; set; }
        public Int64 intProductID { get; set; }
        public decimal decThickness { get; set; }
        public decimal decWidth { get; set; }
        public decimal decLength { get; set; }
        public string strTreatmentLavel { get; set; }
        public string strTreatmentDirection { get; set; }
        public int intTreatmentDirectionID { get; set; }
        public string strCoreID { get; set; }
        public int intCoreID { get; set; }
        public string strRealOD { get; set; }

        public int intOrderQty { get; set; }
        public string dteDesiredDateofDelivery { get; set; }
        public string dteTentativeDateofDelivery { get; set; }
        public string strUOM { get; set; }
        public int intUOM { get; set; }
        public string strRemarks { get; set; }
       
    } 

    public class PIReportHeader
    {
        [Key]
        public int ID { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string CUSADDRESS { get; set; }
        public string TIN { get; set; }
        public string VATREGNO { get; set; }

        public string HSCODE { get; set; }

        public string ProductHScodeName { get; set; }

        public string TOTALAMOUNTINWORDS { get; set; }

        public string QUOTATIONNUMBER { get; set; }
        public decimal NETWEIGHT { get; set; }


        public string DATE { get; set; }
        public string EXPIREDATE { get; set; }
        public string SHIPPINGMODE { get; set; }
        public string MODEOFTRANSPORTATION { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
    }

    public class PIReportLine
    {
        [Key]
        public int ID { get; set; }
        public string PRODUCTCODE { get; set; }
        public string PRODUCTNAME { get; set; }
        public decimal THIKNESS { get; set; }
        public decimal WIDTH { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal BASCPRICE { get; set; }
        public decimal VAT { get; set; }
        public decimal UNITPRICE { get; set; }
        public decimal TOTALAMOUNT { get; set; }
    }
    public class Hscodes
    {
        [Key]
        public int ID { get; set; }
        public string HSCODE { get; set; }

    }
}
