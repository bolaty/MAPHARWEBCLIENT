using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class CaisseController : Controller
    {
        // GET: Caisse
        public ActionResult Index()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult OperationsCaisse()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult OperationsTresorerieTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCommissions()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EditionTresorerie()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Reedition()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ListeVentes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult VenteSansAccessoire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult VenteSansAccessoireCliniqueOfficiel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementSinistresMultiRisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementSinistresHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementSinistresIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ReglementSinistresAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementSinistresSante()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementSinistresVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesMultiRisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesSante()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementCompagniesAssurancesVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Consultation()
        {

            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutConsultation()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AffichageAntecedants()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SaisieConstantes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutSaisieConstantes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SaisieOrdonnances()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutSaisieOrdonnances()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SaisieResultats()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutSaisieResultats()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SaisieRendezVous()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutSaisieRendezVous()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ConsultationSurRendezVous()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutConsultationSurRendezVous()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SaisieRedaction()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AjoutSaisieRedaction()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AffichagePreferences()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult RattacherFacture()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ListeReglementsFactureGroupeEspece()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ReglementsFactureGroupeEspece()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult AttributionChambre()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult VenteTresorerie()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

    }
}