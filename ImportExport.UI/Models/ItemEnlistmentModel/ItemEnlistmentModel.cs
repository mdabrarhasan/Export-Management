using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Models.ItemEnlistmentModel
{
    [Keyless]
    public class ItemEnlistmentModel
    {
        public long ID { get; set; }
        public int UNITID { get; set; }
        public string unitname { get; set; }
        public long LEVELONEID { get; set; }        // = intLevelOneID (dropdown value)
        public string itemtypename { get; set; }    // grid label: Yarn/Weaving/Non-Weaven
        public string productname { get; set; }

        // category (Weaving only)
        public int? categorycode { get; set; }    // = TBLPRODUCTCATEGORY.CODE / PRODUCTCATEGORYID; nullable
        public string categoryname { get; set; }  // grid/edit label
        public int CREATEDBY { get; set; }
        public int UPDATEDBY { get; set; }
    }

    [Keyless]
    public class ItemSellerUnitModel
    {
        public string value { get; set; }
        public string text { get; set; }
    }

    [Keyless]
    public class ItemTypeModel
    {
        public string value { get; set; }   // = intLevelOneID
        public string text { get; set; }     // label
    }
}