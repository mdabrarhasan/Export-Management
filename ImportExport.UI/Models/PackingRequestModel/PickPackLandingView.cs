namespace ImportExport.UI.Models.PackingRequestModel
{
    public class PickPackLandingView
    {

        public int ID { get; set; }
        public string UOM { get; set; }
        public int ITEMID { get; set; }
        public string ITEMNAME { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PACKINGREQQUANTITY { get; set; }
        public decimal REMAININGQTY { get; set; }

        public int PACKINGREQUESTHEADERID { get; set; }
    }
}
