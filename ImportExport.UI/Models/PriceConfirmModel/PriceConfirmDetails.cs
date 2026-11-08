using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class PriceConfirmDetails
    {
       [Key]
        public int ID { get; set; }
        public int PRICECONFIRMHEADERID { get; set; }
        public int ITEMID { get; set; }
        public string strUoM { get; set; }
        public string ITEMNAME { get; set; }

        public decimal QUANTITY { get; set; }
        public decimal PRICE { get; set; }
        public decimal OFFERPRICE { get; set; }
        public decimal CONFIRMPRICE { get; set; }

        public decimal TOTALAMOUNT { get; set; }
        public string CURRENCYCODE { get; set; }
    }

    
}
