using ImportExport.UI.Models.CustomerInfoModel;

namespace ImportExport.UI.Service.CustomerInfoService
{
    public interface ICustomerInfo
    {
        IQueryable<CustomerBankModel> GetCustomerBankAll();
        CustomerBankModel GetCustomerBankById(int id);
        string Create(CustomerBankModel customerBank);
        string Update(CustomerBankModel customerBank);
        string Delete(int id, int updatedBy);
    }
}
