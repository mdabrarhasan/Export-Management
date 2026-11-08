namespace ImportExport.UI.Models.DocumentModel
{
    public class DocumentListLoadView
    {
        public int ID { get; set; }
        public int DOCHEADERID { get; set; }
        public int PICKINGPACKINGHEADERID { get; set; }
        public int DOCUMENTSETUPHEADERID { get; set; }
        public string ROOTDOCNAME { get; set; }
        public string CHILDDOCNAME { get; set; }
        public string TYPE { get; set; }
        public string DOCNUMBER { get; set; }
        public string DOCDATE { get; set; }
        public int CUSTOMERID { get; set; }
        public string CUSTOMERNAME { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public bool ISMANDATORY { get; set; }
        public string MANDATORYLABEL { get; set; }
    }
}
