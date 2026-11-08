using ImportExport.UI.Models.AuthModel;
using ImportExport.UI.Models.CommonModel;
using ImportExport.UI.Service.Login;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Globalization;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ImportExport.UI.Controllers
{
    public class LoginController : Controller
    {

        private readonly ILogin obj;
        UserInfo userinfo = new UserInfo();
        public LoginController(ILogin sql)
        {
            obj = sql;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("Enroll");
            HttpContext.Session.Remove("UnitID");
            return RedirectToAction("Index", "Login");
        }

        [HttpPost]
        public JsonResult Login(string username, string password)
        {
            try
            {
                var li = obj.CheckLogin(username, password);
                if (li == null)
                {
                    return Json("");
                }
                else
                {
                    foreach (LoginModel login in li)
                    {
                        HttpContext.Session.SetInt32("Enroll", login.Enroll);
                        HttpContext.Session.SetInt32("UnitID", login.Unit);
                        HttpContext.Session.SetString("UserName", login.Name);
                        TempData["Enroll"] = login.Enroll;

                        TempData["Name"] = login.Name;
                        ViewBag.Name = login.Name;
                    }
                    
                    return Json(li);
                }
            }
            catch (Exception)
            {

            }
            return null;
        }
    }
}
