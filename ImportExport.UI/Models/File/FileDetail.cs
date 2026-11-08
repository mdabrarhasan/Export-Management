using System.ComponentModel.DataAnnotations;

namespace ImportExport.UI.Models.File
{
    public class FileDetail
    {
        [Key]
        public int ID { get; set; }
        public string CODE { get; set; }
            public int PROCESSID { get; set; }
            public string PROCESSCODE { get; set; }
            public string PROCESSNAME { get; set; }
            public string FILENAME { get; set; }
            public string FILESIZE { get; set; }
            public string FILETYPE { get; set; }
            public string FILEURL { get; set; }
            public int UNITID { get; set; }
            public DateTime DOCUMENTCREATEDDATE { get; set; }
            public int DOCUMENTCREATEDBY { get; set; }

            public int DOCUMENTUPDATEDBY { get; set; }
    } 
}

		
