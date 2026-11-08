namespace ImportExport.UI.Models.PackingRequestModel
{
    public class PickPackingRequestDetails
    {
        public int ITEMID { get; set; }

        public decimal QUANTITY { get; set; }

        public decimal PACKINGREQQUANTITY { get; set; }

        public decimal GROSSMEASURE { get; set; }

        public string TRUCKNO { get; set; }

        public int CONTAINERSIZE { get; set; }

        public string CONTAINERNO { get; set; }

        public string REMARKS { get; set; }

        public string DESCRIPTIONS { get; set; }
    }
}
