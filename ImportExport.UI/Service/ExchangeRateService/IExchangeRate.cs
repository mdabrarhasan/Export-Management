using ImportExport.UI.Models.ExchangeRateModel;

namespace ImportExport.UI.Service.ExchangeRateService
{
    public interface IExchangeRate
    {
        IQueryable<SellerUnitModel> GetSellerUnits();
        IQueryable<ExchangeRateModel> GetAll();
        string Save(ExchangeRateModel exchange);
        string Delete(int id, int enroll);
    }
}