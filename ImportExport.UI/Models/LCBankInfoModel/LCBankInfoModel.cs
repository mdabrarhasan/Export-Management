using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.LCBankInfoModel
{
    public class LCBankInfoModel // Save/Update
    {
        [Key]
        public int ID { get; set; }
        public int LCID { get; set; }
        public int INVOICEID { get; set; }
        public string DOCNEGOTIATEDATE { get; set; }
        public decimal BENEFICIARYBANKCOST { get; set; }
        public decimal CROSSBANKCHARGE { get; set; }
        public string PAYMENTRECEIVEDATE { get; set; }
        public string IDPBIDBCNO { get; set; }

        public int CREATEDBY { get; set; }
        public int UPDATEDBY { get; set; }
        public string CREATEDDATE { get; set; }
        public string UPDATEDDATE { get; set; }
        public bool ISACTIVE { get; set; }
        public string BANKACCEPTANCE { get; set; }
        public decimal EXCHANGERATE { get; set; }

        public decimal FINANCIALCOSTRATE { get; set; }
        public string STATUS { get; set; }
    }

    public class LCBankInfoModelView
    {
        [Key]
        public int ID { get; set; }
        public int LCID { get; set; }
        public int INVOICEID { get; set; }
        public string INVOICENO { get; set; }
        public string LCNUMBER { get; set; }
        public string DOCNEGOTIATEDATE { get; set; }
        public decimal BENEFICIARYBANKCOST { get; set; }
        public decimal CROSSBANKCHARGE { get; set; }
        public string PAYMENTRECEIVEDATE { get; set; }
        public string IDPBIDBCNO { get; set; }
        public string BANKACCEPTANCE { get; set; }
        public decimal EXCHANGERATE { get; set; }

        public decimal FINANCIALCOSTRATE { get; set; }
        public string STATUS { get; set; }

    }
}
