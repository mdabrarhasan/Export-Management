using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Models.ExchangeRateModel
{
    [Keyless]
    public class ExchangeRateModel
    {
        public int ID { get; set; }
        public int UNITID { get; set; }
        public string unitname { get; set; }        
        public decimal? EXCHANGERATE { get; set; }  
        public DateTime? RATEDATE { get; set; }
        public int CREATEDBY { get; set; }
        public int UPDATEDBY { get; set; }
    }

    [Keyless]
    public class SellerUnitModel
    {
        public string value { get; set; }
        public string text { get; set; }
    }
}