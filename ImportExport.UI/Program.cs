using ImportExport.UI;
using ImportExport.UI.Repository.AgreementRepository;
using ImportExport.UI.Repository.BankAcceptanceCalendarRepository;
using ImportExport.UI.Repository.CommonRepository;
using ImportExport.UI.Repository.CustomerInfoRepository;
using ImportExport.UI.Repository.CustomerRepository;
using ImportExport.UI.Repository.Dashboard;
using ImportExport.UI.Repository.DocumentRepository;
using ImportExport.UI.Repository.ExchangeRateRepository;
using ImportExport.UI.Repository.ItemEnlistmentRepository;
using ImportExport.UI.Repository.LCBankInfoRepository;
using ImportExport.UI.Repository.LCRepository;
using ImportExport.UI.Repository.LCVSBILLRepository;
using ImportExport.UI.Repository.LoginRepository;
using ImportExport.UI.Repository.MasterTypeRepository;
using ImportExport.UI.Repository.MenuRepository;
using ImportExport.UI.Repository.PackingrequestConfirmRepository;
using ImportExport.UI.Repository.PackingRequestRepository;
using ImportExport.UI.Repository.PriceConfirmRepository;
using ImportExport.UI.Repository.QuotationRepository;
using ImportExport.UI.Repository.RCombineSQ;
using ImportExport.UI.Repository.ReportRepository;
using ImportExport.UI.Repository.RFreightCost;
using ImportExport.UI.Repository.SalesQuatationRepository;
using ImportExport.UI.Service.AgreementService;
using ImportExport.UI.Service.CombineSQServise;
using ImportExport.UI.Service.CommonService;
using ImportExport.UI.Service.CustomerInfoService;
using ImportExport.UI.Service.CustomerService;
using ImportExport.UI.Service.Dashboard;
using ImportExport.UI.Service.DocumentService;
using ImportExport.UI.Service.ExchangeRateService;
using ImportExport.UI.Service.FileUploadService;
using ImportExport.UI.Service.FreightCostService;
using ImportExport.UI.Service.ItemEnlistmentService;
using ImportExport.UI.Service.LCBankInfoService;
using ImportExport.UI.Service.LCService;
using ImportExport.UI.Service.LCVSBILLService;
using ImportExport.UI.Service.Login;
using ImportExport.UI.Service.MasterTypeService;
using ImportExport.UI.Service.MenuService;
using ImportExport.UI.Service.PackingRequestConfirmService;
using ImportExport.UI.Service.PackingRequestService;
using ImportExport.UI.Service.PriceConfirmService;
using ImportExport.UI.Service.QuotationService;
using ImportExport.UI.Service.ReportService;
using ImportExport.UI.Service.SalesQuatationService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Context>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddTransient<IAgreementLanding, RAgreementLanding>();


builder.Services.AddTransient<IBankAcceptanceCalendar, RBankAcceptanceCalendar>();

builder.Services.AddTransient<ISalesQuatationLanding, RSalesQuatationLanding>();
builder.Services.AddTransient<IQuotationLanding, RQuotationLanding>();
builder.Services.AddTransient<ISalesQuatationApproval, RSalesQuatationApproval>();
builder.Services.AddTransient<IFileUpload, RSalesQuatationLanding>();

builder.Services.AddTransient<IAgreementApproval, RAgreementApproval>();
builder.Services.AddTransient<IAgreementLanding, RAgreementLanding>();

builder.Services.AddTransient<IBiaxDashboard, RBiaxDashboard>();

builder.Services.AddTransient<ILC, RLC>();
builder.Services.AddTransient<ILCApproval, RLCApproval>();


builder.Services.AddTransient<IPriceConfirm, RPriceConfirm>();
builder.Services.AddTransient<IPriceConfirmApproval, RPriceApproval>();
builder.Services.AddTransient<IReportService, RReportLanding>();

builder.Services.AddTransient<IPackingRequest, RPackingRequest>();
builder.Services.AddTransient<IPackingRequestApproval, RPackingRequestApproval>();

builder.Services.AddTransient<IPickingPackingConfirmRequest, RPickingPackingRequestConfirm>();
builder.Services.AddTransient<IIPickingPackingRequestConfrimApproval, RPickingPackingRequestConfirmApproval>();
builder.Services.AddTransient<ILCVSBILL, RLCVSBILL>();
builder.Services.AddTransient<ILCBankInfo, RLCBankInfo>();
builder.Services.AddTransient<ICustomerInfo, RCustomerInfo>();
builder.Services.AddTransient<ICustomer, RCustomer>();
builder.Services.AddTransient<IMasterType, RMasterType>();


builder.Services.AddTransient<IDocumentLanding, RDocumentLanding>();
builder.Services.AddTransient<IDocumentApproval, RDocumentApproval>();
builder.Services.AddTransient<IDashboard, RDashboard>();
builder.Services.AddTransient<ICommon, RCommon>();
builder.Services.AddTransient<ILogin, RLogin>();
builder.Services.AddTransient<IMenu, RMenu>();
builder.Services.AddTransient<IExchangeRate, RExchangeRate>();
builder.Services.AddTransient<IItemEnlistment, RItemEnlistment>();
//Combine sq
builder.Services.AddTransient<ICombineSQ, RCombineSQ>();
builder.Services.AddTransient<IFreightCost, RFreightCost>();
builder.Services.AddTransient<IFreightCostApproval, RFreightCostApproval>();
builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();


//builder.Services.AddTransient<IHttpContextAccessor, HttpContextAccessor>();   //pass data controller to view using session
//builder.Services.AddHttpClient();
//builder.Services.AddControllersWithViews();

//builder.Services.AddDistributedMemoryCache();
builder.Services.AddHttpClient();
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.NumberHandling =
            System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString;
    });

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(1);
    options.Cookie.Name = "Enroll";
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
    });


var app = builder.Build();
//app.Use(async (context, next) =>
//{
//    context.Response.Headers.Remove("X-Frame-Options");
//    await next();
//});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();
app.UseRouting();
app.UseSession();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Login}/{action=Index}/{id?}");
app.Run();
