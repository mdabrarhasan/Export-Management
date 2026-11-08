namespace ImportExport.UI.Models.CustomerModel
{
    public class CustomerModel
    {
        public int ID { get; set; }
        public int? CUSTOMERID { get; set; }
        
        public string? CUSNAME { get; set; }
        public string? TIN { get; set; }
        public string? BIN { get; set; }
        public string? IRC { get; set; }
        public bool ISACTIVE { get; set; }
    }
}