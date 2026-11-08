using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Models.CustomerModel;

namespace ImportExport.UI.Service.CustomerService
{
    public interface ICustomer
    {
        string Create(CustomerModel customer);
        string Update(CustomerModel customer);
        string Delete(int id, int updatedBy);

        IQueryable<CustomerModel> GetCustomerAll();
        IQueryable<DropDownBind> GetCustomerDropdown(string prefix);
    }
}
