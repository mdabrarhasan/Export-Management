namespace ImportExport.UI.Models.DocumentModel
{
    public class DocumentLandingViewModel
    {
        public int ID { get; set; }
        public string DOCNUMBER { get; set; }
        public int DOCHEADERID { get; set; }
        public int PICKINGPACKINGHEADERID { get; set; }
        public string PICKPACKNUMBER { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSNAME { get; set; }
        public string DOCDATE { get; set; }
        public string DOCSTATUSNAME { get; set; }
        public string CODE { get; set; }
        public int DOCSETUPHEADERID { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
    }
}
