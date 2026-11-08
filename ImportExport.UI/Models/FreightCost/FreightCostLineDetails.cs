namespace ImportExport.UI.Models.FreightCost
{
    public class FreightCostLineDetails
    {
        public int ID { get; set; }   //TBL FREIGHTCOSTLINEID
        public int LCMTYPEID { get; set; }
        public int ITEMCOSTID { get; set; }
        public string COSTTYPENAME { get; set; }
        public string COSTNAME { get; set; }
        public decimal COST { get; set; }
        public decimal TOTALAMOUNT { get; set; }
        public string REMARKS { get; set; }

    }
}
