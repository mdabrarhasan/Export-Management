using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.FreightCost;

namespace ImportExport.UI.Service.FreightCostService
{
    public interface IFreightCost
    {
        public IQueryable<FreightCostLineDetails> GetPIDetailsData(int id);
        public IQueryable<FreightCostMaster> Getdata(int id);
        public IQueryable<DropDownBind> GetPackingData(int id);
        public IQueryable<FreightCostMaster> ViewCData(int id);
        public IQueryable<DropDownBind> GetCostItemList();  //[TBLCOSTTYPE]
        public IQueryable<DropDownBind> GetItemListByShipNo(int id); //[TBLCOSTITEM]
        public string Save(FreightCostMaster master, FreightCostLine[] fcl);
        public string Update(FreightCostUpdate master);
        public string DeleteMaster(FreightCostUpdate del);
        public string DeleteLine(FreightCostUpdate del);
        public IQueryable<DropDownBind> GetPISCWithPacking(string prefix);
        public IQueryable<DropDownBind> GetSupplierByUnit(int unitid, string prefix);
    }
}
