namespace ImportExport.UI.Models.PriceConfirmModel
{
    public class AgreementPriceConfirm
    {
            public int ID { get; set; }
            public int ITEMTYPEID { get; set; }
            public int PRODUCTCODE { get; set; }
            public string ITEMNAME { get; set; }
            public string QUALITY { get; set; }
            public string WEIGHT { get; set; }
            public string CONSTRUCTION { get; set; }
            public string ITEMTITLE { get; set; }
            public string PACKINGDETAILS { get; set; }


            public int UOMID { get; set; }
            public string strUOM { get; set; }
            public decimal QUANTITY { get; set; }
            public decimal PRICE { get; set; }
            public int DISCOUNTID { get; set; }
            public decimal DISCOUNT { get; set; }
            public decimal TOTALAMOUNT { get; set; }
            public string DESCRIPTIONS { get; set; }
            public string REMARKS { get; set; }
            public string DISNAME { get; set; }
            public string CURRENCYCODE { get; set; }


            public string SIZE { get; set; }
            public string SLIT { get; set; }
            public string SCRIM { get; set; }
    }
}
