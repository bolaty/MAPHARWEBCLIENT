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

    public class EditionParametreIIController : Controller
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
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_COMBOZONEEDITION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + ex.Message);
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
                    clsEditions = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_COMBOSUCCURSALES, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEdition.clsObjetRetour = clsObjetRetour;
                clsEditions.Add(clsEdition); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + ex.Message);
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
                    clsPhapartypetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_COMBOTYPETIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhapartypetiers.clsObjetRetour = clsObjetRetour;
                clsPhapartypetierss.Add(clsPhapartypetiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionParametreIIController :" + ex.Message);
            }
            return Json(clsPhapartypetierss, JsonRequestBehavior.AllowGet);
        }



        public JsonResult InsertEditionBloc1_1(List<HT_Stock.BOJ.clsEditionEtatParametre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatParametre clsEditionEtatParametre = new HT_Stock.BOJ.clsEditionEtatParametre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatParametre ObjetRetour = new HT_Stock.BOJ.clsEditionEtatParametre(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatParametre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatParametre> clsEditionEtatParametres = new List<HT_Stock.BOJ.clsEditionEtatParametre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            List<clsEditionEtatParametre> clsEditionEtatParametress = new List<clsEditionEtatParametre>();
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].ENTETE1;
            ObjetEnvoie[0].ENTETE1 = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BT_CODETYPEBUDGET))
                    //ObjetEnvoie[Idx].BT_CODETYPEBUDGET = "";

                    //fin traitement des criteres de recherche non obligatoire
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatParametres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_LISTE_BLOC1_1, Tokken).ToList();
                    if ((clsEditionEtatParametres == null) || (clsEditionEtatParametres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatParametres.Add(clsEditionEtatParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1 = new List<clsEditionEtatParametre>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1 = clsEditionEtatParametres;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT };

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
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                clsEditionEtatParametres.Add(clsEditionEtatParametre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + ex.Message);
            }
            Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE = clsEditionEtatParametres;
            clsEditionEtatParametress.Add(clsEditionEtatParametres[0]);
            return Json(clsEditionEtatParametress, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertEditionBloc1_2(List<HT_Stock.BOJ.clsEditionEtatParametre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatParametre clsEditionEtatParametre = new HT_Stock.BOJ.clsEditionEtatParametre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatParametre ObjetRetour = new HT_Stock.BOJ.clsEditionEtatParametre(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatParametre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatParametre> clsEditionEtatParametres = new List<HT_Stock.BOJ.clsEditionEtatParametre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].ENTETE1;
            ObjetEnvoie[0].ENTETE1 = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BT_CODETYPEBUDGET))
                        ObjetEnvoie[Idx].BT_CODETYPEBUDGET = "";

                    //fin traitement des criteres de recherche non obligatoire
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatParametres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_LISTE_BLOC1_2, Tokken).ToList();
                    if ((clsEditionEtatParametres == null) || (clsEditionEtatParametres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatParametres.Add(clsEditionEtatParametre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1 = new List<clsEditionEtatParametre>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1 = clsEditionEtatParametres;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT };
                    //pvgAfficherEtat_Bloc1();
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
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatParametre.clsObjetRetour = clsObjetRetour;
                clsEditionEtatParametres.Add(clsEditionEtatParametre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + ex.Message);
            }
            Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE = clsEditionEtatParametres;
            List<clsEditionEtatParametre> clsEditionEtatParametress = new List<clsEditionEtatParametre>();
            clsEditionEtatParametress.Add(clsEditionEtatParametres[0]);
            return Json(clsEditionEtatParametress, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertEditionBloc2(List<HT_Stock.BOJ.clsEditionEtatImmobilisation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsEditionEtatImmobilisation clsEditionEtatImmobilisation = new HT_Stock.BOJ.clsEditionEtatImmobilisation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsEditionEtatImmobilisation ObjetRetour = new HT_Stock.BOJ.clsEditionEtatImmobilisation(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatImmobilisation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsEditionEtatImmobilisation> clsEditionEtatImmobilisations = new List<HT_Stock.BOJ.clsEditionEtatImmobilisation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].ENTETE1;
            ObjetEnvoie[0].ENTETE1 = "";
            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PS_CODESOUSPRODUIT))
                        ObjetEnvoie[Idx].PS_CODESOUSPRODUIT = "";

                    //fin traitement des criteres de recherche non obligatoire
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatImmobilisations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_LISTE_BLOC2, Tokken).ToList();
                    if ((clsEditionEtatImmobilisations == null) || (clsEditionEtatImmobilisations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatImmobilisation.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatImmobilisations.Add(clsEditionEtatImmobilisation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_2 = new List<clsEditionEtatImmobilisation>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_2 = clsEditionEtatImmobilisations;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "DateArrete", "Option", "Etablissement", "ET_INDEX", "Entete1", "Entete2", "Entete3", "Entete4", "DateDebut", "Exercice" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { ObjetEnvoie[0].DATEFIN, "", ObjetEnvoie[0].AG_RAISONSOCIALE, ObjetEnvoie[0].ET_INDEX, Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].DATEDEBUT, "" };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatImmobilisation.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatImmobilisations.Add(clsEditionEtatImmobilisation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatImmobilisation.clsObjetRetour = clsObjetRetour;
                clsEditionEtatImmobilisations.Add(clsEditionEtatImmobilisation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatImmobilisation.clsObjetRetour = clsObjetRetour;
                clsEditionEtatImmobilisations.Add(clsEditionEtatImmobilisation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + ex.Message);
            }
            List<clsEditionEtatImmobilisation> clsEditionEtatImmobilisationss = new List<clsEditionEtatImmobilisation>();
            clsEditionEtatImmobilisationss.Add(clsEditionEtatImmobilisations[0]);
            return Json(clsEditionEtatImmobilisationss, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertEditionBloc3(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].ENTETE1;
            ObjetEnvoie[0].ENTETE1 = "";
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
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebEditionParametreII.URL_SELECT_LISTE_BLOC3, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_3 = new List<clsPlancomptable>();
                    Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_3 = clsPlancomptables;
                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT };

                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ZoneEditionComboController :" + ex.Message);
            }
            List<clsPlancomptable> clsPlancomptabless = new List<clsPlancomptable>();
            clsPlancomptabless.Add(clsPlancomptables[0]);
            return Json(clsPlancomptabless, JsonRequestBehavior.AllowGet);
        }

        public JsonResult pvgAfficherEtat_Bloc1()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "PARAMETREII\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_1);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
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
        public JsonResult pvgAfficherEtat_Bloc2()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "PARAMETREII\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_2);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
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
        public JsonResult pvgAfficherEtat_Bloc3()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "PARAMETREII\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                

                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_PARAMETRE_II_BLOC_3);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
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
            Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE = new List<clsEditionEtatParametre>();
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