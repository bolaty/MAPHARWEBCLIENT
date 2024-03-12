//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using CrystalDecisions.CrystalReports.Engine;
using System.Net;
using System.Text;

namespace HT_Assurance.Controllers
{

    public class EditionComptabiliteController : Controller
    {
        string edition_url = ""; // Lien de la prévisualisation de l'édition
        public JsonResult ListeZoneEditionCombo(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_COMBOZONEEDITION, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListeSuccursales(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONE))
                        ObjetEnvoie[Idx].ZN_CODEZONE = "";
                } 

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_COMBOSUCCURSALES, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListeExercice(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONE))
                        ObjetEnvoie[Idx].ZN_CODEZONE = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_COMBOEXERCICE, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListePeriodicite(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_PERIODICITE, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodiciteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodiciteController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListePeriode(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_PERIODE, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodeController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListeTypeArticle(List<HT_Stock.BOJ.clsEdition> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEdition clsEdition = new HT_Stock.BOJ.clsEdition();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEdition ObjetRetour = new HT_Stock.BOJ.clsEdition(); //Conteneur de la réponse de l'appel du service web
            clsEdition.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEdition> clsEditions = new List<HT_Stock.BOJ.clsEdition>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_TYPEARTICLE, Tokken).ToList();
                    if ((clsEditions == null) || (clsEditions.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEdition.clsObjetRetour = clsObjetRetour;
                        clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEdition.clsObjetRetour = clsObjetRetour;
                    clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error PeriodeController :" + ex.Message);
            }
            return Json(clsEditions, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListeTypeTiers(List<HT_Stock.BOJ.clsPhapartypetiers> ObjetEnvoie)
         {
             string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
             HT_Stock.BOJ.clsPhapartypetiers clsPhapartypetiers = new HT_Stock.BOJ.clsPhapartypetiers();  //Déclaration d'une instance de l'objet equipe_operateurs
             HT_Stock.BOJ.clsPhapartypetiers ObjetRetour = new HT_Stock.BOJ.clsPhapartypetiers(); //Conteneur de la réponse de l'appel du service web
             clsPhapartypetiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
             Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
             List<HT_Stock.BOJ.clsPhapartypetiers> clsPhapartypetierss = new List<HT_Stock.BOJ.clsPhapartypetiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
             Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

             try
             {
                 Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                 if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                 {
                     //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                     clsPhapartypetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_SELECT_TYPETIERS, Tokken).ToList();
                     if ((clsPhapartypetierss == null) || (clsPhapartypetierss.Count == 0))
                     {
                         clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                         clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                         clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                         clsPhapartypetierss.Add(clsPhapartypetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                     }
                 }
                 else
                 {
                     clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                     clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                     clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                     clsPhapartypetierss.Add(clsPhapartypetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                 }
             }
             catch (System.Net.WebException e)  //Exeptions liées au serveur
             {
                 clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                 clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                 clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                 clsPhapartypetierss.Add(clsPhapartypetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                 Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + e.Message);

             }
             catch (Exception ex)  //Exeptions liées au code
             {
                 clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                 clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                 clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                 clsPhapartypetierss.Add(clsPhapartypetiers); // Ajout d'une nouvelle instance de la classe a la liste
                 Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + ex.Message);
             }
             return Json(clsPhapartypetierss, JsonRequestBehavior.AllowGet);
         }
        public JsonResult Inserteditioncomptabilite(List<HT_Stock.BOJ.clsEditionEtatParametre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatParametre clsEditionEtatParametre = new HT_Stock.BOJ.clsEditionEtatParametre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatParametre ObjetRetour = new HT_Stock.BOJ.clsEditionEtatParametre(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatParametre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatParametre> clsEditionEtatParametres = new List<HT_Stock.BOJ.clsEditionEtatParametre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                  
                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                  
                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatParametres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_INSERT_URL_EDITION_COMPTABILTE, Tokken).ToList();
                    if ((clsEditionEtatParametres == null) || (clsEditionEtatParametres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatParametres.Add(clsEditionEtatParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatParametres.Add(clsEditionEtatParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                clsEditionEtatParametres.Add(clsEditionEtatParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                clsEditionEtatParametres.Add(clsEditionEtatParametre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionComptabiliteController :" + ex.Message);
            }
            return Json(clsEditionEtatParametres, JsonRequestBehavior.AllowGet);
        }



        public JsonResult Inserteditioncomptabilite1(List<HT_Stock.BOJ.clsEditionEtatCaisse> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatCaisse clsEditionEtatCaisse = new HT_Stock.BOJ.clsEditionEtatCaisse();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatCaisse ObjetRetour = new HT_Stock.BOJ.clsEditionEtatCaisse(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatCaisse.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatCaisse> clsEditionEtatCaisses = new List<HT_Stock.BOJ.clsEditionEtatCaisse>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].TI_IDTIERSMEDECIN;
            ObjetEnvoie[0].TI_IDTIERSMEDECIN = "";
            List<clsEditionEtatCaisse> clsEditionEtatCaissess = new List<clsEditionEtatCaisse>();

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT))
                        ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_RAISONSOCIAL))
                        ObjetEnvoie[Idx].AG_RAISONSOCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JO_CODEJOURNAL))
                        ObjetEnvoie[Idx].JO_CODEJOURNAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MV_STATUTGLVRE))
                        ObjetEnvoie[Idx].MV_STATUTGLVRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE2))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTETIERS))
                        ObjetEnvoie[Idx].PL_NUMCOMPTETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSMEDECIN))
                        ObjetEnvoie[Idx].TI_IDTIERSMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_OPTION))
                        ObjetEnvoie[Idx].PL_OPTION = "";

                    //fin traitement des criteres de recherche non obligatoire  PL_NUMCOMPTETIERS
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                  

                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatCaisses = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_INSERT_EDITION_COMPTABILITE_1, Tokken).ToList();

                    if ((clsEditionEtatCaisses == null) || (clsEditionEtatCaisses.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1 = new List<clsEditionEtatCaisse>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1 = clsEditionEtatCaisses;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + ex.Message);
            }
            clsEditionEtatCaissess.Add(clsEditionEtatCaisses[0]);
            return Json(clsEditionEtatCaissess, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Inserteditioncomptabilite1_2(List<HT_Stock.BOJ.clsEditionEtatCaisse> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatCaisse clsEditionEtatCaisse = new HT_Stock.BOJ.clsEditionEtatCaisse();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatCaisse ObjetRetour = new HT_Stock.BOJ.clsEditionEtatCaisse(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatCaisse.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatCaisse> clsEditionEtatCaisses = new List<HT_Stock.BOJ.clsEditionEtatCaisse>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].TI_IDTIERSMEDECIN;
            ObjetEnvoie[0].TI_IDTIERSMEDECIN = "";
            List<clsEditionEtatCaisse> clsEditionEtatCaissess = new List<clsEditionEtatCaisse>();

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT))
                        ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_RAISONSOCIAL))
                        ObjetEnvoie[Idx].AG_RAISONSOCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JO_CODEJOURNAL))
                        ObjetEnvoie[Idx].JO_CODEJOURNAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MV_STATUTGLVRE))
                        ObjetEnvoie[Idx].MV_STATUTGLVRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE2))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTETIERS))
                        ObjetEnvoie[Idx].PL_NUMCOMPTETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSMEDECIN))
                        ObjetEnvoie[Idx].TI_IDTIERSMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_OPTION))
                        ObjetEnvoie[Idx].PL_OPTION = "";
                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatCaisses = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_INSERT_EDITION_COMPTABILITE_1_2, Tokken).ToList();

                    if ((clsEditionEtatCaisses == null) || (clsEditionEtatCaisses.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_2 = new List<clsEditionEtatCaisse>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_2 = clsEditionEtatCaisses;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + ex.Message);
            }
            clsEditionEtatCaissess.Add(clsEditionEtatCaisses[0]);
            return Json(clsEditionEtatCaissess, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Inserteditioncomptabilite1_3(List<HT_Stock.BOJ.clsEditionEtatCaisse> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatCaisse clsEditionEtatCaisse = new HT_Stock.BOJ.clsEditionEtatCaisse();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatCaisse ObjetRetour = new HT_Stock.BOJ.clsEditionEtatCaisse(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatCaisse.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatCaisse> clsEditionEtatCaisses = new List<HT_Stock.BOJ.clsEditionEtatCaisse>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FRpvgAfficherEtat1_3
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].TI_IDTIERSMEDECIN;
            ObjetEnvoie[0].TI_IDTIERSMEDECIN = "";
            List<clsEditionEtatCaisse> clsEditionEtatCaissess = new List<clsEditionEtatCaisse>();

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT))
                        ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_RAISONSOCIAL))
                        ObjetEnvoie[Idx].AG_RAISONSOCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JO_CODEJOURNAL))
                        ObjetEnvoie[Idx].JO_CODEJOURNAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTETIERS))
                        ObjetEnvoie[Idx].PL_NUMCOMPTETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSMEDECIN))
                        ObjetEnvoie[Idx].TI_IDTIERSMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_OPTION))
                        ObjetEnvoie[Idx].PL_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE2))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE2 = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatCaisses = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_INSERT_EDITION_COMPTABILITE_1_3, Tokken).ToList();

                    if ((clsEditionEtatCaisses == null) || (clsEditionEtatCaisses.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_3 = new List<clsEditionEtatCaisse>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_3 = clsEditionEtatCaisses;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatCaisse.clsObjetRetour = clsObjetRetour;
                clsEditionEtatCaisses.Add(clsEditionEtatCaisse); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + ex.Message);
            }
            clsEditionEtatCaissess.Add(clsEditionEtatCaisses[0]);
            return Json(clsEditionEtatCaissess, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Inserteditioncomptabilite2(List<HT_Stock.BOJ.clsEditionEtatStock> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatStock clsEditionEtatStock = new HT_Stock.BOJ.clsEditionEtatStock();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatStock ObjetRetour = new HT_Stock.BOJ.clsEditionEtatStock(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatStock.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatStock> clsEditionEtatStocks = new List<HT_Stock.BOJ.clsEditionEtatStock>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].TYPEOPERATION;
            ObjetEnvoie[0].TYPEOPERATION = "";
            List<clsEditionEtatStock> clsEditionEtatStockss = new List<clsEditionEtatStock>();

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ET_TYPELISTE))
                        ObjetEnvoie[Idx].ET_TYPELISTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";


                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";

            
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                   
                   
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                   

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatStocks = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionComptabilite.URL_INSERT_EDITION_COMPTABILITE_2, Tokken).ToList();
                    if ((clsEditionEtatStocks == null) || (clsEditionEtatStocks.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatStock.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatStocks.Add(clsEditionEtatStock);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_2 = new List<clsEditionEtatStock>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_2 = clsEditionEtatStocks;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatStock.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatStocks.Add(clsEditionEtatStock);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatStock.clsObjetRetour = clsObjetRetour;
                clsEditionEtatStocks.Add(clsEditionEtatStock);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatStock.clsObjetRetour = clsObjetRetour;
                clsEditionEtatStocks.Add(clsEditionEtatStock); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTresorerieController :" + ex.Message);
            }
            clsEditionEtatStockss.Add(clsEditionEtatStocks[0]);
            return Json(clsEditionEtatStockss, JsonRequestBehavior.AllowGet);
        }



        public JsonResult pvgAfficherEtat1()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                //Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "COMPTABILITE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument(HT_Assurance.clsDeclaration.FORMATETAT, randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = Assurance.Outils.clsDeclaration.URL_DOSSIER_ETATS + fileName; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR          
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }



            return Json(retour, JsonRequestBehavior.AllowGet);

            //return retour;   // Retour de la fonction
            
        }
        public JsonResult pvgAfficherEtat1_2()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                //Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "COMPTABILITE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_2);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument(HT_Assurance.clsDeclaration.FORMATETAT, randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = Assurance.Outils.clsDeclaration.URL_DOSSIER_ETATS + fileName; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR          
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }



            return Json(retour, JsonRequestBehavior.AllowGet);

            //return retour;   // Retour de la fonction
            
        }
        public JsonResult pvgAfficherEtat1_3()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                //Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "COMPTABILITE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_1_3);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument(HT_Assurance.clsDeclaration.FORMATETAT, randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = Assurance.Outils.clsDeclaration.URL_DOSSIER_ETATS + fileName; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR          
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }



            return Json(retour, JsonRequestBehavior.AllowGet);

            //return retour;   // Retour de la fonction
            
        }
        public JsonResult pvgAfficherEtat2()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                //Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "COMPTABILITE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_COMPTABILITE_2);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument(HT_Assurance.clsDeclaration.FORMATETAT, randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = Assurance.Outils.clsDeclaration.URL_DOSSIER_ETATS + fileName; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR          
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }



            return Json(retour, JsonRequestBehavior.AllowGet);

            //return retour;   // Retour de la fonction
            
        }



        private void pvpRenseignerFormule(string[] vappNomFormule, object[] vappValeurFormule, ReportDocument rd)
        {
            for (int Idx = 0; Idx < vappNomFormule.GetLength(0); Idx++)
            {
                string vlpNomFormule = vappNomFormule[Idx].ToString();
                string vlpValeurFormule = vappValeurFormule[Idx].ToString();
                rd.DataDefinition.FormulaFields[vlpNomFormule].Text = "'" + vlpValeurFormule.Replace("'", "''") + "'";

            }
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