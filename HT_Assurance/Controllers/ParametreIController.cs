using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using System.Text;

namespace HT_Assurance.Controllers
{
    public class ParametreIController : Controller
    {
        // GET: ParametreI
        public ActionResult Index()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Societe()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Succursales()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementSuccursales()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Entrepots()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementEntrepots()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Exercice()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementExercice()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult SelectionExerciceTravail()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ConfigurationPaysParDefaut()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ConfigurationVilleParDefaut()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Communes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementCommunes()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Parametres()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementParametres()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Services()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementServices()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Quartier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementQuartier()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult NumeroLot()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementNumeroLot()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult DateExpiration()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementDateExpiration()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult DateFabrication()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementDateFabrication()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult FiltreStock2()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementFiltreStock2()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult NatureTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementNatureTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Rayons()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementRayons()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Tableaux()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementTableaux()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Unites()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementUnites()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult Activite()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementActivite()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult VehiculesLivraison()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementVehiculesLivraison()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EditionParametre()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult EnregistrementEditionParametre()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }

        public ActionResult ParametresProduction()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }


        public JsonResult ListeParametreI(List<HT_Stock.BOJ.clsParametre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsParametre clsParametre = new HT_Stock.BOJ.clsParametre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsParametre ObjetRetour = new HT_Stock.BOJ.clsParametre(); //Conteneur de la réponse de l'appel du service web
            clsParametre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsParametre> clsParametres = new List<HT_Stock.BOJ.clsParametre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsParametres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametreI.URL_SELECT_PARAMETREI, Tokken).ToList();
                    if ((clsParametres == null) || (clsParametres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsParametre.clsObjetRetour = clsObjetRetour;
                        clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsParametre.clsObjetRetour = clsObjetRetour;
                    clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsParametre.clsObjetRetour = clsObjetRetour;
                clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametreIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsParametre.clsObjetRetour = clsObjetRetour;
                clsParametres.Add(clsParametre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametreIController :" + ex.Message);
            }
            return Json(clsParametres, JsonRequestBehavior.AllowGet);
        }


        public JsonResult UpdateParametreI(List<HT_Stock.BOJ.clsParametre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsParametre clsParametre = new HT_Stock.BOJ.clsParametre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsParametre ObjetRetour = new HT_Stock.BOJ.clsParametre(); //Conteneur de la réponse de l'appel du service web
            clsParametre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsParametre> clsParametres = new List<HT_Stock.BOJ.clsParametre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                 for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    //if(string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                    //    ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                    //    ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                    //    ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                    //    ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                    //    ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PP_VALEUR))
                        ObjetEnvoie[Idx].PP_VALEUR = "";
                         if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsParametres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametreI.URL_MISE_A_JOUR_PARAMETREI, Tokken).ToList();
                    if ((clsParametres == null) || (clsParametres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsParametre.clsObjetRetour = clsObjetRetour;
                        clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsParametre.clsObjetRetour = clsObjetRetour;
                    clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsParametre.clsObjetRetour = clsObjetRetour;
                clsParametres.Add(clsParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametreIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsParametre.clsObjetRetour = clsObjetRetour;
                clsParametres.Add(clsParametre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametreIController :" + ex.Message);
            }
            return Json(clsParametres, JsonRequestBehavior.AllowGet);
        }

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }
    }
}