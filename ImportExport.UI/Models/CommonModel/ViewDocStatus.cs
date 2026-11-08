using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.CommonModel
{
    public class ViewDocStatus
    {
        public int ID { get; set; }
        public string PROCESSCODE { get; set; }
        public string VINITIATOR { get; set; }
        public string APPROVAR { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public string DOCSTATUS { get; set; }
        public string DESCRIPTIONS { get; set; }
    }
}
