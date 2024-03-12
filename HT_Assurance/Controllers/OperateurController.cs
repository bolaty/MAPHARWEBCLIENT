//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using System.Text;
using System.Configuration;

namespace HT_Assurance.Controllers
{
    public class OperateurController : Controller
    {

        //Utilisateur
        // enregistrement
        public ActionResult EnregistrementUtilisateur()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //liste
        public ActionResult ListeUtilisateur()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        //modification
        public ActionResult ModificationUtilisateur()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ListeDroitMenu()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurAgence()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurEntrepot()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitTransfertDeStock()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurFamilleOperation()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurOperationTresorerieTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurAutreOperationTiers()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult ModificationEntrepot()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurOperationTresorerieEtAutreEcriture()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
        public ActionResult DroitSurCompte()
        {
            ViewBag.MODEGESTION = clsDeclaration.MODEGESTION;
            return View();
        }
       
        public JsonResult ListeOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_SELECT_Operateur, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    if(clsOperateurs[0].clsObjetRetour.SL_RESULTAT=="TRUE")
                    {
                        string test = "";
                        test = "";

                        Session["OP_NOMPRENOM"] = clsOperateurs[0].OP_NOMPRENOM;
                        Session["OP_CODEOPERATEUR"] = clsOperateurs[0].OP_CODEOPERATEUR;
                        Session["AG_CODEAGENCE"] = clsOperateurs[0].AG_CODEAGENCE;
                        Session["EN_CODEENTREPOT"] = clsOperateurs[0].EN_CODEENTREPOT;
                        Session["JT_DATEJOURNEETRAVAIL"] = "25/09/2020";
                        Session["EX_DATEDEBUTPREMIEREXERCICE"] = "01/01/2020";
                        Assurance.Outils.clsDeclaration.ENTETE1_VALEUR = clsOperateurs[0].clsAgences[0].ENTETE1;
                        Assurance.Outils.clsDeclaration.ENTETE2_VALEUR = clsOperateurs[0].clsAgences[0].ENTETE2;
                        Assurance.Outils.clsDeclaration.ENTETE3_VALEUR = clsOperateurs[0].clsAgences[0].ENTETE3;
                        Assurance.Outils.clsDeclaration.ENTETE4_VALEUR = clsOperateurs[0].clsAgences[0].ENTETE4;
                        clsOperateurs[0].COCHER = ConfigurationManager.AppSettings["URL_ROOT_PROJET"];

                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }

            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ComboOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_COMBO_OPERATEUR, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    if (clsOperateurs[0].clsObjetRetour.SL_RESULTAT == "TRUE")
                    {
                        string test = "";
                        test = "";

                        Session["OP_NOMPRENOM"] = clsOperateurs[0].OP_NOMPRENOM;
                        Session["OP_CODEOPERATEUR"] = clsOperateurs[0].OP_CODEOPERATEUR;
                        Session["AG_CODEAGENCE"] = clsOperateurs[0].AG_CODEAGENCE;
                        Session["EN_CODEENTREPOT"] = clsOperateurs[0].EN_CODEENTREPOT;
                        Session["JT_DATEJOURNEETRAVAIL"] = "25/09/2020";
                        Session["EX_DATEDEBUTPREMIEREXERCICE"] = "01/01/2020";
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }

            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }

        //BLOC MISE A JOUR 
        public JsonResult AjoutOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_NOMPRENOM))
                        ObjetEnvoie[Idx].OP_NOMPRENOM = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_LOGIN))
                        ObjetEnvoie[Idx].OP_LOGIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_DATESAISIE))
                        ObjetEnvoie[Idx].OP_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MOTPASSE))
                        ObjetEnvoie[Idx].OP_MOTPASSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PO_CODEPROFIL))
                        ObjetEnvoie[Idx].PO_CODEPROFIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_EMAIL))
                        ObjetEnvoie[Idx].OP_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE))
                        ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_DENOMINATION))
                        ObjetEnvoie[Idx].EN_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TO_LIBELLE))
                        ObjetEnvoie[Idx].TO_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SR_LIBELLE))
                        ObjetEnvoie[Idx].SR_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CAISSIER))
                        ObjetEnvoie[Idx].OP_CAISSIER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_IMPRESSIONAUTOMATIQUE))
                        ObjetEnvoie[Idx].OP_IMPRESSIONAUTOMATIQUE = "";
                    //fin traitement des criteres de recherche non  obligatoire


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_AJOUT_OPERATEUR, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }
            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }
        
        //DEBUT LISTE OPERATEUR1
        public JsonResult ListeOperateur1(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                  //  ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_LISTE_Operateur, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }

            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult SuppressionOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                   // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_DELETE_OPERATEUR, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }
            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);

        }

        //BLOC DE MODIFICATION
        public JsonResult ModificationOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                  // ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                  //  ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_NOMPRENOM))
                        ObjetEnvoie[Idx].OP_NOMPRENOM = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_LOGIN))
                        ObjetEnvoie[Idx].OP_LOGIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_DATESAISIE))
                        ObjetEnvoie[Idx].OP_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MOTPASSE))
                        ObjetEnvoie[Idx].OP_MOTPASSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PO_CODEPROFIL))
                        ObjetEnvoie[Idx].PO_CODEPROFIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_EMAIL))
                        ObjetEnvoie[Idx].OP_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE))
                        ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_DENOMINATION))
                        ObjetEnvoie[Idx].EN_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TO_LIBELLE))
                        ObjetEnvoie[Idx].TO_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SR_LIBELLE))
                        ObjetEnvoie[Idx].SR_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OH_PHOTO))
                        ObjetEnvoie[Idx].OH_PHOTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_NOMPRENOM))
                        ObjetEnvoie[Idx].OP_NOMPRENOM = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TO_CODETYPEOERATEUR))
                        ObjetEnvoie[Idx].TO_CODETYPEOERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OH_SIGNATURE))
                        ObjetEnvoie[Idx].OH_SIGNATURE = "";
                    //fin traitement des criteres de recherche non  obligatoire
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_UPDATE_OPERATEUR, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }
            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }

        //DEBUT LISTE MODIFICATION ENTREPOT
        public JsonResult ListeModificationEntrepot(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                   // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                  // ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                  //  ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_LISTE_MODIFICATION_ENTREPOT, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }

            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
        }

        //BLOC MISE A JOUR 
        public JsonResult ModifMotDePassOperateur(List<HT_Stock.BOJ.clsOperateur> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateur clsOperateur = new HT_Stock.BOJ.clsOperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateur ObjetRetour = new HT_Stock.BOJ.clsOperateur(); //Conteneur de la réponse de l'appel du service web
            clsOperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateur> clsOperateurs = new List<HT_Stock.BOJ.clsOperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //////debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_NOMPRENOM))
                    //    ObjetEnvoie[Idx].OP_NOMPRENOM = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                    //    ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                    //    ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_LOGIN))
                    //    ObjetEnvoie[Idx].OP_LOGIN = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_DATESAISIE))
                    //    ObjetEnvoie[Idx].OP_DATESAISIE = "01-01-1900";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                    //    ObjetEnvoie[Idx].TI_IDTIERS = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MOTPASSE))
                    //    ObjetEnvoie[Idx].OP_MOTPASSE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PO_CODEPROFIL))
                    //    ObjetEnvoie[Idx].PO_CODEPROFIL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_EMAIL))
                    //    ObjetEnvoie[Idx].OP_EMAIL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                    //    ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                    //    ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                    //    ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT))
                    //    ObjetEnvoie[Idx].PL_CODENUMCOMPTECOFFREFORT = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                    //    ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE))
                    //    ObjetEnvoie[Idx].OP_MONTANTTOTALENCAISSEAUTORISE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_DENOMINATION))
                    //    ObjetEnvoie[Idx].EN_DENOMINATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TO_LIBELLE))
                    //    ObjetEnvoie[Idx].TO_LIBELLE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SR_LIBELLE))
                    //    ObjetEnvoie[Idx].SR_LIBELLE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CAISSIER))
                    //    ObjetEnvoie[Idx].OP_CAISSIER = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_IMPRESSIONAUTOMATIQUE))
                    //    ObjetEnvoie[Idx].OP_IMPRESSIONAUTOMATIQUE = "";
                    ////fin traitement des criteres de recherche non  obligatoire


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebOperateur.URL_MODIFICATION_MOT_DE_PASSE, Tokken).ToList();
                    if ((clsOperateurs == null) || (clsOperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateur.clsObjetRetour = clsObjetRetour;
                        clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateur.clsObjetRetour = clsObjetRetour;
                    clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateur.clsObjetRetour = clsObjetRetour;
                clsOperateurs.Add(clsOperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error OperateurController :" + ex.Message);
            }
            return Json(clsOperateurs, JsonRequestBehavior.AllowGet);
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