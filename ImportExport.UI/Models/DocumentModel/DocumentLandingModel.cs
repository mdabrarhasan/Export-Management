namespace ImportExport.UI.Models.DocumentModel
{
    public class DocumentLandingModel
    {
        public int ID { get; set; }
        public int PICKINGPACKINGHEADERID { get; set; }
        public int DOCUMENTSETUPHEADERID { get; set; }
        public string DOCDATE { get; set; }
        public int CUSTOMERID { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int UNITID { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
    }
}
