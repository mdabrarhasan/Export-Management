using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImportExport.UI.Models.BankAcceptanceCalendarModel
{
    public class BankAcceptanceCalendarModel
    {
        public int ID { get; set; }

        public string EVENTTYPE { get; set; }
        public string EVENTDATE { get; set; }

        public string ACCEPTANCEDATE { get; set; }

        public int LCID { get; set; }
        public string LCNUMBER { get; set; }

        public string INVOICENO { get; set; }
        public string IDPBIDBCNO { get; set; }
        public string CODE { get; set; }
        public decimal? TOTAL { get; set; }

        public int CUSTOMERID { get; set; }
        public string CUSTOMERNAME { get; set; }

        public string MATURITYDATE { get; set; }

        public string STATUS { get; set; }

        public decimal? EXCHANGE_RATE { get; set; }
        public decimal? FINANCIALCOSTRATE { get; set; }

        public string DOCNEGOTIATEDATE { get; set; }
        public string PAYMENTRECEIVEDATE { get; set; }

        public string LCISSUEDATE { get; set; }
        public string LCEXPIREDATE { get; set; }
    }
}