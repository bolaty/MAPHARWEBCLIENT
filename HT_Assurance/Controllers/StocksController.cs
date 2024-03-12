using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class StocksController : Controller
    {
        // GET: Stocks
        public ActionResult Index()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ListeApprovisionnements()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ApprovisionnementSansAccessoire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementFacture()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ModificationDatePeremptionArticles()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Production()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Transfert()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ListeTransactions()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult InventaireStock()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult InventaireStockExceptionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult InventaireStockExceptionnelAnnulation()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SortieArticlesHorsUsage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ListeArticlesHorsUsage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EditionStock()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
    }
}