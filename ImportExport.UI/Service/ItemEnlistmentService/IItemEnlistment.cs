using ImportExport.UI.Models.ItemEnlistmentModel;

namespace ImportExport.UI.Service.ItemEnlistmentService
{
    public interface IItemEnlistment
    {
        IQueryable<ItemSellerUnitModel> GetSellerUnits();
        IQueryable<ItemTypeModel> GetItemTypesByUnit(int unitId);
        IQueryable<ItemTypeModel> GetProductCategories();
        IQueryable<ItemEnlistmentModel> GetAll();
        string Save(ItemEnlistmentModel item);
        string Delete(long id, int enroll);
    }
}