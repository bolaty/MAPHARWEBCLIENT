using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
namespace HT_Assurance.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Connexion()
        {
            return View();
        }

        public ActionResult Mode()
        {
            return View();
        }
        
        public ActionResult Index()
        {
            return View("Index");
        }
        
        public ActionResult Gestion()
        {
            ViewBag.MODEGESTION = "01";
            clsDeclaration.MODEGESTION = ViewBag.MODEGESTION;
            return View("Index");
        }
        public ActionResult Assurance()
        {
            ViewBag.MODEGESTION = "02";
            clsDeclaration.MODEGESTION = ViewBag.MODEGESTION;
            return View("Index");
        }
        public ActionResult AssuranceGestion()
        {
            ViewBag.MODEGESTION = "03";
            clsDeclaration.MODEGESTION = ViewBag.MODEGESTION;
            return View("Index");
        }
        public ActionResult Grh()
        {
            ViewBag.MODEGESTION = "04";
            clsDeclaration.MODEGESTION = ViewBag.MODEGESTION;
            return View("Index");
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Logout()
        {
            Session.Remove("OP_CODEOPERATEUR");
            //return View("Home/Connexion");
            return RedirectToAction("Connexion");
        }

    }
}