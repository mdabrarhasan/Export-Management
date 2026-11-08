namespace ImportExport.UI.Models.CommonModel
{
    public class FileModel
    {
        public int ID { get; set; }
        public string Code { get; set; }

        public int PROCESSID { get; set; }
        public int SUBMENUID { get; set; }
        public string PROCESSCODE { get; set; }
        public string PROCESSNAME { get; set; }
        public string FileName { get; set; }
        //public string UserID { get; set; }
        public string FILESIZE { get; set; }
        public string Extension { get; set; }
        public string FileUrl { get; set; }
        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int DOCUMENTUPDATEDBY { get; set; }
        //public string Others { get; set; }
    }
}
