namespace ImportExport.UI.Models.PackingRequestModel
{
    public class PackingRequestDelSummary
    {
        public int ID { get; set; }
        public string UOM { get; set; }
        public int ITEMID { get; set; }
        public string ITEMNAME { get; set; }
        public decimal QUANTITY { get; set; }
        public decimal PACKINGREQQUANTITY { get; set; }
        public decimal REMAININGQTY { get; set; }
        public int PACKINGREQUESTHEADERID { get; set; }


        public int SERIALNO { get; set; }
        public string EXPPRODUCTIONORDERDATE { get; set; }
        public string CountNo { get; set; }
        public int TotalPallet { get; set; }

        public int TotalCartoon { get; set; }
        public int TotalBale { get; set; }
        public int TotalTare { get; set; }

        public decimal AddWeight { get; set; }

        public decimal GrossWeight { get; set; }

        public string SINo { get; set; }

        public int TotalSpool { get; set; }

        public string MarkInk { get; set; }

        public string SpoolOrPalat { get; set; }

        public string MILLNAME { get; set; }

        public string REMARKS { get; set; }
        public string DESCRIPTIONS { get; set; }

    }
}
