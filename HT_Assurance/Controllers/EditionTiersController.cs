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

    public class EditionTiersController : Controller
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
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_SELECT_COMBOZONEEDITION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
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
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_SELECT_COMBOSUCCURSALES, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
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
                    clsPhapartypetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_SELECT_COMBOTYPETIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                clsPhapartypetierss.Add(clsPhapartypetiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            return Json(clsPhapartypetierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeTypeTiersProspect(List<HT_Stock.BOJ.clsPhapartypetiers> ObjetEnvoie)
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
                    clsPhapartypetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_SELECT_COMBOTYPETIERS_PROSPECT, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                clsPhapartypetierss.Add(clsPhapartypetiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            return Json(clsPhapartypetierss, JsonRequestBehavior.AllowGet);
        }



        //bloc du fournisseur
        public JsonResult InserteditiontiersFournisseur(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SC_CODESECTION))
                        ObjetEnvoie[Idx].SC_CODESECTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ASDI))
                        ObjetEnvoie[Idx].TI_ASDI = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TVA))
                        ObjetEnvoie[Idx].TI_TVA = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_CLIENT_FOURNISSEUR, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc relence
        public JsonResult InserteditiontiersRelence(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TVA))
                        ObjetEnvoie[Idx].TI_TVA = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ASDI))
                        ObjetEnvoie[Idx].TI_ASDI = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SC_CODESECTION))
                        ObjetEnvoie[Idx].SC_CODESECTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_RELENCE, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc commerciaux
        public JsonResult InserteditiontiersCommerciaux(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
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
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_LISTE_COMMERCIAUX, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc chauffeur
        public JsonResult InserteditiontiersChauffeur(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
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
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_LISTE_CHAUFFEUR, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc type client
        public JsonResult InserteditiontiersClient(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
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
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_TYPE_CLIENT, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc rdv
        public JsonResult InserteditiontiersRdv(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_RDV, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }
        //bloc liste vehicule
        public JsonResult InserteditiontiersVehicule(List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatClientFournisseur clsEditionEtatClientFournisseur = new HT_Stock.BOJ.clsEditionEtatClientFournisseur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatClientFournisseur ObjetRetour = new HT_Stock.BOJ.clsEditionEtatClientFournisseur(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatClientFournisseur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurs = new List<HT_Stock.BOJ.clsEditionEtatClientFournisseur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].CH_EMAIL;
            ObjetEnvoie[0].CH_EMAIL = "";
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
                    clsEditionEtatClientFournisseurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionTiers.URL_INSERT_LISTE_VEHICULE, Tokken).ToList();
                    if ((clsEditionEtatClientFournisseurs == null) || (clsEditionEtatClientFournisseurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = new List<clsEditionEtatClientFournisseur>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS = clsEditionEtatClientFournisseurs;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "ET_INDEX" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEFIN, ObjetEnvoie[0].ET_INDEX };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatClientFournisseur.clsObjetRetour = clsObjetRetour;
                clsEditionEtatClientFournisseurs.Add(clsEditionEtatClientFournisseur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionTiersController :" + ex.Message);
            }
            List<clsEditionEtatClientFournisseur> clsEditionEtatClientFournisseurss = new List<clsEditionEtatClientFournisseur>();
            clsEditionEtatClientFournisseurss.Add(clsEditionEtatClientFournisseurs[0]);
            return Json(clsEditionEtatClientFournisseurss, JsonRequestBehavior.AllowGet);
        }


        //afficher l'etat
        public JsonResult pvgAfficherEtat()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                //Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "TIERS\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_EDITION_TIERS);  // liaison entre le fichier rpt et les données qu'il doit contenir

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





        public Dictionary<string, string>[] pvgAfficheEtat(List<clsEditionEtatClientFournisseur> data)
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document 
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "ENTREPOT.rpt"; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                
                rd.SetDataSource(data);  // liaison entre le fichier rpt et les données qu'il doit contenir
                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                //fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

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

            return retour;   // Retour de la fonction
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