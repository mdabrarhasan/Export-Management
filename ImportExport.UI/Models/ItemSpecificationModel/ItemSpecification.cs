namespace ImportExport.UI.Models.ItemSpecificationModel
{
    public class ItemSpecification
    {
        public int ID { get; set; }
        public int PROCESSID { get; set; }
        public string PROCESSCODE { get; set; }
        public int PROCESSLINEID { get; set; }
        public string PROCESSLINECODE { get; set; }
        public int ITEMID { get; set; }
        public string LENGTH { get; set; }
        public string WIDTH { get; set; }
        public string HEIGHT { get; set; }
        public string THICKNESS { get; set; }
        public string WEIGHT { get; set; }

        public string COLOR { get; set; }
        public string SIZE { get; set; }
        public string DESIGN { get; set; }

        public string PACKAGING { get; set; }
        public string MATERIAL { get; set; }
        public string CONSTRUCTION { get; set; }

        public string PLY { get; set; }
        public string CORE { get; set; }
        public string TREATMENTDIRECTION { get; set; }

        public string OTHERS { get; set; }
        public string REMARK { get; set; }
        public string SESSIONID { get; set; }

        public string DOCUMENTCREATEDDATE { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
    }
}


