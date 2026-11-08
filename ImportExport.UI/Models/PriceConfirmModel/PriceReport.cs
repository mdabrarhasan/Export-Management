using System.ComponentModel.DataAnnotations.Schema;

namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class PriceReport
    {
       
        public int Id { get; set; }

        [NotMapped]
        public Dictionary<string, object> Columns { get; set; } = new Dictionary<string, object>();



        //public int ID { get; set; } 
        //public string NAME { get; set; }
        //public decimal PRICE { get; set; }
    }
}
