using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class OutilsEtSecuritesController : Controller
    {
        public ActionResult ListeCreationJrneeTravail()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementCreationJrneeTravail()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementFermetureJrneeTravail()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeMotDePasse()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeProfils()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
    }
}