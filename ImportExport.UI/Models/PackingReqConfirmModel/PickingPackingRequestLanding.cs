namespace ImportExport.UI.Models.PackingReqConfirmModel
{
    public class PickingPackingRequestLanding
    {
        public int ID { get; set; }
        public string PICKPACKDATE { get; set; }
        public string TERMSCONDITION { get; set; }
        public string DESCRIPTIONS { get; set; }
        public int DOCUMENTCREATEDBY { get; set; }
        public int UNITID { get; set; }

        public string VEHICALNO { get; set; }
        public string DRIVERNAME { get; set; }
        public string  DRIVERPHONE { get; set; }
        public string CUSTOMERDETAILS { get; set; }
        public string GATENO { get; set; }
        public string GATEPERSON { get; set; }
        public decimal? EXCHANGERATE { get; set; }
        public int TRANSPORTAGENCYID { get; set; }

    }
}

