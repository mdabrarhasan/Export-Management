namespace ImportExport.UI.Models.PackingReqConfirmModel
{
    public class PickPackingEditMaster
    {
        public int ID { get; set; }
        public string VEHICALNO { get; set; }

        public string DRIVERNAME { get; set; }

        public string DRIVERPHONE { get; set; }

        public string CUSTOMERDETAILS { get; set; }

        public string GATENO { get; set; }

        public string GATEPERSON { get; set; }
        public decimal? EXCHANGERATE { get; set; }

        public int? TRANSPORTAGENCYID { get; set; }

        public string TERMSCONDITION { get; set; }

        public string DESCRIPTIONS { get; set; }
    }
}
