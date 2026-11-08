namespace ImportExport.UI.Models.FreightCost
{
    public class FreightCostLine
    {
        public int ID { get; set; }  //TBL FREIGHTCOSTLINE ID
        public int LCMTYPEID { get; set; }
        public int ITEMCOSTID { get; set; }
        public decimal COST { get; set; }
        public decimal CCRATE { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public string REMARKS { get; set; }

    }
}
