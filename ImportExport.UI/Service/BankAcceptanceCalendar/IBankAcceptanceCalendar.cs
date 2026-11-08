using ImportExport.UI.Models.BankAcceptanceCalendarModel;

namespace ImportExport.UI.Repository.BankAcceptanceCalendarRepository
{
    public interface IBankAcceptanceCalendar
    {
        Task<List<BankAcceptanceCalendarModel>> GetCalendarData();
    }
}