using Microsoft.AspNetCore.Mvc;
using ImportExport.UI.Repository.BankAcceptanceCalendarRepository;

namespace ImportExport.UI.Controllers
{
    public class BankAcceptanceCalendarController : Controller
    {

        private readonly IBankAcceptanceCalendar _obj;
        public BankAcceptanceCalendarController(IBankAcceptanceCalendar obj)
        {
            _obj = obj;
        }

        public IActionResult Index()
        {
            return View();
        }



        [HttpGet]
        public async Task<IActionResult> GetCalendarData()
        {
            var li = await _obj.GetCalendarData();
            return Ok(li);
        }






    }
}
