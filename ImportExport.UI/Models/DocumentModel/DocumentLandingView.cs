namespace ImportExport.UI.Models.DocumentModel
{
    public class DocumentLandingView
    {
        public int ID { get; set; }
        public string ROOTDOCNAME { get; set; }
        public string CHILDDOCNAME { get; set; }
        public string TYPE { get; set; }
        public string MANDATORYLABEL { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public string ROOTDOCCODE { get; set; }
        public int DOCHEADER { get; set; }
        public string DOCSTATUS { get; set; }
        public string FILENAME { get; set; }
        public int DOCHEADERID { get; set; }
        //MAHAMUD
        public string ROOTURL { get; set; }
        public string ENDURL { get; set; }
    }
}

