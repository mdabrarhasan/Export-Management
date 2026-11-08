using ImportExport.UI.Models.BankAcceptanceCalendarModel;
using Microsoft.EntityFrameworkCore;

namespace ImportExport.UI.Repository.BankAcceptanceCalendarRepository
{
    public class RBankAcceptanceCalendar : IBankAcceptanceCalendar
    {
        private readonly Context _context;

        public RBankAcceptanceCalendar(Context context)
        {
            _context = context;
        }

        public async Task<List<BankAcceptanceCalendarModel>> GetCalendarData()
        {
            try
            {
                var li = await _context.BankAcceptanceCalendarModel
                    .FromSqlRaw("EXEC SPGETBANKACCEPTANCECALENDAR")
                    .ToListAsync();

                return li;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}