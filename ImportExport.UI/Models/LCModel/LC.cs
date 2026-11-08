namespace ImportExport.UI.Models.LCModel
{
    public class LC
    {
        public int ID { get; set; }
        public int BUSINESSUNIT { get; set; }
        
        public int PISCHEADERID { get; set; }
        public int PROFORMAINVOICEHEADERID { get; set; }
        public string LCNUMBER { get; set; }
        public string LCISSUEDATE { get; set; }
        public string LCEXPIREDATE { get; set; }
        public string LCCREATEDPLACE { get; set; }
        public int CUSTOMERID { get; set; }
        public decimal TOELRANCECRAMTPERCENTAGE { get; set; }
        public string PRESENTATIONINDATE { get; set; }
        public int PARTIALSHIPMENT { get; set; }
        public string BUYERDOCUMENTREQUIRED { get; set; }
        public string BUYERADDITIONALCONDITION { get; set; }
        public int TRANSSHIPMENT { get; set; }
        public string NOTIFIEDPARTYDETAILS { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }
        public string BUYERBANK { get; set; }

        public string LCEXPIREDPLACE { get; set; }
        public string LCTENORPERIOD { get; set; }
        public string SHIPMENTLATESTDATE { get; set; }
        public string INVOICENO { get; set; }
        public string DOCUMENTREQUIRE { get; set; }
        public int BUYERBANKID { get; set; }
        public int BILLNOID { get; set; }
        public int TYPE { get; set; }
    }
}
