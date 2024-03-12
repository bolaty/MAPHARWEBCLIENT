using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;

namespace HT_Assurance.Controllers
{
    public class AssuranceController : Controller
    {
        // GET: Assurance
        public ActionResult Index()
        {
           ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }


        //Modele
        public ActionResult ModeleDesListes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModeleDesEnregistrements()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        //MultirisqueProfessionnel
            //enregistrement
        public ActionResult EnregistrementMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //operation
        public ActionResult EnregistrementOuvertureDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementTransmissionDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementSuiviDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementSuspensionContrat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementResiliationContrat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementSaisieEcheancier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeReleveClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeReleveCompagnieAssurance()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementSuiviClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationSuiviClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationOuvertureDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult TransmettreDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DocumentOuvertureDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DocumentTransmissionDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DocumentValidationDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementSaisieRDVClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationSaisieRDVClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeOuvertureDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeTransmissionDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeValidationDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeSuiviDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeClotureDossier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeConsultationReglements()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeReleveCommission()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeSuiviClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeSaisieRDVClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeConsultationRDVClient()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeDesCheques()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ConsultationsQuestionnaires()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //validation
        public ActionResult ValidationMultirisqueProfessionnel()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }        
        


        //Habitat
            //enregistrement
        public ActionResult EnregistrementHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
           //validation
        public ActionResult ValidationHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationHabitat()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }



        //IndividuelAccident
            //enregistrement
        public ActionResult EnregistrementIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
           //validation
        public ActionResult ValidationIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationIndividuelAccident()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        //Auto
            //enregistrement
        public ActionResult EnregistrementAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
           //validation
        public ActionResult ValidationAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationAuto()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }



        //Voyage
            //enregistrement
        public ActionResult EnregistrementVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
           //validation
        public ActionResult ValidationVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationVoyage()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        //responsabilité civile
        public ActionResult EnregistrementResponsabiliteCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeResponsabiliteCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationResponsabiliteCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult TransmissionResponsabiliteCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ValidationResponsabiliteCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationRespoCivile()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        // Transport et Marchandise
        public ActionResult EnregistrementTransportetMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //liste
        public ActionResult ListeTransportetMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //modification
        public ActionResult ModificationTransportetMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //document chèque
        public ActionResult documentCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //transmission
        public ActionResult TransmissionTransportEtMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //validation
        public ActionResult ValidationTransportEtMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationTransportMarchandise()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        //Assurance GESA(enregistrement)
        public ActionResult EnregistrementGESA()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //liste
        public ActionResult ListeGESA()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //modification
        public ActionResult ModificationGESA()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //transmission
        public ActionResult TransmissionGESA()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //validation
        public ActionResult ValidationGESA()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationGesa()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        
        
        
        //Sante Pharmacien
            //enregistrement
        public ActionResult EnregistrementSantePharmacien()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //liste
        public ActionResult ListeSantePharmacien()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //modification
        public ActionResult ModificationSantePharmacien()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
            //transmission
        public ActionResult TransmissionSantePharmacien()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
           //validation
        public ActionResult ValidationSantePharmacien()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementOuvertureDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementTransmissionDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult EnregistrementSuiviDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationsuiviDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeOuvertureDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeTransmissionDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeValidationDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeSuiviDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeClotureDossierSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeConsultationReglementsSP()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }  
        public ActionResult OperationPharmacie()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }



        //Sante Auxiliaire
        //enregistrement
        public ActionResult EnregistrementSanteAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //liste
        public ActionResult ListeSanteAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //modification
        public ActionResult ModificationSanteAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //transmission
        public ActionResult TransmissionSanteAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //validation
        public ActionResult ValidationSanteAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult OperationAuxiliaire()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult RemiseDeCheque()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
    }
}