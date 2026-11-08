namespace ImportExport.UI.Models.FreightCost
{
    public class FreightCostUpdate
    {
        public int DELID { get; set; }
        public int FCID { get; set; }
        public int FCLID { get; set; }
        public int LCMTYPEID { get; set; }
        public int ITEMCOSTID { get; set; }
        public decimal COST { get; set; }
        public string REMARKS { get; set; }
    }
}
