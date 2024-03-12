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

    public class EditionEtatAssuranceController : Controller
    {
        string edition_url = ""; // Lien de la prévisualisation de l'édition
       
        public JsonResult Insertedition(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new  Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].FORMATETAT;
            try
            {

               
                 


                    for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                  
                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_SELECT_LISTE_ETATASSURANCE, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }
        

        public JsonResult ListeAvisdeReglement(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;

            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_AVISDEREGLEMENTPRIME, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                  // Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                  //  Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListetatdesPrimeEncaissement(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;

            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_SELECT_LISTE_ETAT_DES_ENCAISSEMENTS_DIFERES, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    // Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    //  Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }


        public JsonResult InserteditionEtatVentilleAffaireNouvelles(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;

            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_ETATVENTILLEAFFAIRENOUVELLES, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    // Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    //  Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }


        public JsonResult InserteditionSource2(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS2 = ObjetEnvoie[0].NOMETAT;

            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire
                   
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_SELECT_LISTE_ETATASSURANCE, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE2 = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InserteditionlISTE(List<Core.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            Core.clsEditionEtatAssurance clsEditionEtatAssurance = new Core.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            Core.clsEditionEtatAssurance ObjetRetour = new Core.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Core.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Core.Common.clsObjetRetour clsObjetRetour = new Core.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<Core.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<Core.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;

            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_SELECT_LISTE_ETATASSURANCE, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                   // Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                 //   Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            //Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EtatSynoptique(List<HT_Assurance.clsEditionEtatAssurance> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsEditionEtatAssurance clsEditionEtatAssurance = new HT_Assurance.clsEditionEtatAssurance();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsEditionEtatAssurance ObjetRetour = new HT_Assurance.clsEditionEtatAssurance(); //Conteneur de la réponse de l'appel du service web
            clsEditionEtatAssurance.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsEditionEtatAssurance> clsEditionEtatAssurances = new List<HT_Assurance.clsEditionEtatAssurance>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].FORMATETAT;
            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CT_CODESTAUT))
                        ObjetEnvoie[Idx].CT_CODESTAUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PY_CODEPAYS))
                        ObjetEnvoie[Idx].PY_CODEPAYS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL))
                        ObjetEnvoie[Idx].ZN_CODEZONECOMMERCIAL = "";

                    //fin traitement des criteres de recherche non obligatoire
                }



                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsEditionEtatAssurances = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebComboZoneEdition.URL_SELECT_LISTE_ETAT_SYNOPTIQUE, Tokken).ToList();
                    if ((clsEditionEtatAssurances == null) || (clsEditionEtatAssurances.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                        clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                    clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsEditionEtatAssurance.clsObjetRetour = clsObjetRetour;
                clsEditionEtatAssurances.Add(clsEditionEtatAssurance); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = clsEditionEtatAssurances;
            return Json(clsEditionEtatAssurances, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Insertedition3(List<HT_Assurance.clsCtcontratchequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Assurance.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontratchequephoto ObjetRetour = new HT_Assurance.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Assurance.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR
            Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS = ObjetEnvoie[0].NOMETAT;
            HT_Assurance.clsDeclaration.FORMATETAT = ObjetEnvoie[0].FORMATETAT;
            try
            {





                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "2";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "0";
                    

                    //fin traitement des criteres de recherche non obligatoire
                }

                

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceAfficherReglementCheque.URL_SELECT_REMISE_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4", "LibelleEtat", "Date1", "Date2" };
                    Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR, ObjetEnvoie[0].ET_LIBELLEETAT, ObjetEnvoie[0].DATEDEBUT, ObjetEnvoie[0].DATEFIN };
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error EditionEtatAssuranceController :" + ex.Message);
            }
            HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEREMISEDECHECQUE = clsCtcontratchequephotos;
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
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
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "ASSURANCE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                



                rd.SetDataSource(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEREMISEDECHECQUE);  // liaison entre le fichier rpt et les données qu'il doit contenir

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

        public JsonResult pvgAfficherEtat()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "ASSURANCE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                



                rd.SetDataSource(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE);  // liaison entre le fichier rpt et les données qu'il doit contenir
             //   rd.Subreports["EtatReglementPrime.rpt"].SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEASSURANCE);
                //    rd.Subreports(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEASSURANCE)

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

        public JsonResult pvgAfficherEtatSousEtat()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "ASSURANCE\\" + Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                



                rd.SetDataSource(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE);  // liaison entre le fichier rpt et les données qu'il doit contenir
                rd.Subreports["EtatReglementPrime.rpt"].SetDataSource(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE2);
                //    rd.Subreports(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEASSURANCE)

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

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

        public JsonResult pvgAfficherEtatReleveClient()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "ASSURANCE\\" + "RelevetMaphar.rpt"; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                



                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_RELEVE_CLIENT);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

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

        public JsonResult pvgAfficherEtatReleveClientGeneral()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                rd.FileName = Assurance.Outils.clsDeclaration.CHEMIN_REPORTS + "TRESORERIE\\" + "Relevet.rpt"; // Recuperation du fier .rpt Assurance.Outils.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                



                rd.SetDataSource(Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_RELEVE_CLIENT);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                if (Assurance.Outils.clsDeclaration.vappNomFormule != null && Assurance.Outils.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(Assurance.Outils.clsDeclaration.vappNomFormule, Assurance.Outils.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, Assurance.Outils.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

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