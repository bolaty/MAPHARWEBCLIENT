using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class ComptabiliteController : Controller
    {
        // GET: Comptabilite
        public ActionResult Index()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult SaisieEcritureComptable()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EcrituresAutomatiques()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EcrituresAutomatiquesDesTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EcrituresComptablesEnAttente()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationDecrituresComptables()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult SuppressionDecrituresComptables()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ValidationDecrituresComptables()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Lettrage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ReglementFactureGroupeParCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Extourne()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ClotureDexercice()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationdeReferencePiece()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult RecherchedePieceComptable()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult Edition()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListedesRepartitions()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListedesReglementsFactureGroupeparCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
    }
}