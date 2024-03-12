using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class ArticleEtPrestationController : Controller
    {
        // GET: ArticleEtPrestation
        public ActionResult Index()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Fabricants()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Marques()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Modeles()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Formes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult TypesdArticlesetPrestations()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ConfigurationdesComptes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ArticlesEtPrestations()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ArticlesetPrestationsAjout()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult PrixdAchat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult PrixdeVente()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult PrixdeVenteCliniqueOfficiel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Promotions()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult SituationArticleEtPrestation()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Edition()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
    }
}