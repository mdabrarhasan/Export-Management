namespace ImportExport.UI.Models.PackingReqConfirmModel
{
    public class PickingPackingRequestDelSummary
    {
        public int ID { get; set; }
        public string UOM { get; set; }
        public int ITEMID { get; set; }
        public string ITEMNAME { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PACKINGREQQUANTITY { get; set; }
        public decimal REMAININGQTY { get; set; }

        public string TRUCKNO { get; set; }
        public decimal COUNT { get; set; }
        public decimal GROSSMEASURE { get; set; }
        public int CONTAINERSIZE { get; set; }
        public string CONTAINERNO { get; set; }
        public string CODE { get; set; }


        public string REMARKS { get; set; }

        public string DESCRIPTIONS {  get; set; }

    }


    public class PickingPackingRequestDelvery
    {
        public int ID { get; set; }
        public int ITEMID { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PACKINGREQQUANTITY { get; set; }
        public decimal REMAININGQTY { get; set; }

        public string TRUCKNO { get; set; }
        public decimal GROSSMEASURE { get; set; }
        public int CONTAINERSIZE { get; set; }
        public string CONTAINERNO { get; set; }
        public string REMARKS { get; set; }

        public string DESCRIPTIONS { get; set; }

    }
}
