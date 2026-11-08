using ImportExport.UI.Models.MasterTypeModel;

namespace ImportExport.UI.Service.MasterTypeService
{
    public interface IMasterType
    {
        IQueryable<MasterTypeModelView> GetAll(string masterType);
        string Save(MasterTypeModel master);
        string Delete(int id, string masterType, int updatedBy);
    }
}
