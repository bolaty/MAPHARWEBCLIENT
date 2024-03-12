//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using System.Text;

namespace HT_Assurance.Controllers
{
    public class PosteBudgetaireController : Controller
    {
        

        //BLOC LISTE
        public JsonResult ListePosteBudgetaireParamII(List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire clsMicbudgetparampostebudgetaire = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire ObjetRetour = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire(); //Conteneur de la réponse de l'appel du service web
            clsMicbudgetparampostebudgetaire.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> clsMicbudgetparampostebudgetaires = new List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_LIBELLE))
                        ObjetEnvoie[Idx].BG_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
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
                    clsMicbudgetparampostebudgetaires = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencePosteBudgetaire.URL_SELECT_POSTEBUDGETAIRE, Tokken).ToList();
                    if ((clsMicbudgetparampostebudgetaires == null) || (clsMicbudgetparampostebudgetaires.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                        clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                    clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + ex.Message);
            }
            return Json(clsMicbudgetparampostebudgetaires, JsonRequestBehavior.AllowGet);
        }

        public JsonResult INSERTParamII(List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire clsMicbudgetparampostebudgetaire = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire ObjetRetour = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire(); //Conteneur de la réponse de l'appel du service web
            clsMicbudgetparampostebudgetaire.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> clsMicbudgetparampostebudgetaires = new List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BN_CODENATUREPOSTEBUDGETAIRE))
                        ObjetEnvoie[Idx].BN_CODENATUREPOSTEBUDGETAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_CODEPOSTEBUDGETAIRE))
                        ObjetEnvoie[Idx].BG_CODEPOSTEBUDGETAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BT_CODETYPEBUDGET))
                        ObjetEnvoie[Idx].BT_CODETYPEBUDGET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BD_CODETYPEBUDGETDETAIL))
                        ObjetEnvoie[Idx].BD_CODETYPEBUDGETDETAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_LIBELLE))
                        ObjetEnvoie[Idx].BG_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
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
                    clsMicbudgetparampostebudgetaires = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencePosteBudgetaire.URL_INSERT_POSTEBUDGETAIRE, Tokken).ToList();
                    if ((clsMicbudgetparampostebudgetaires == null) || (clsMicbudgetparampostebudgetaires.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                        clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                    clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + ex.Message);
            }
            return Json(clsMicbudgetparampostebudgetaires, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UPDATEParamII(List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire clsMicbudgetparampostebudgetaire = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire ObjetRetour = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire(); //Conteneur de la réponse de l'appel du service web
            clsMicbudgetparampostebudgetaire.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> clsMicbudgetparampostebudgetaires = new List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BN_CODENATUREPOSTEBUDGETAIRE))
                        ObjetEnvoie[Idx].BN_CODENATUREPOSTEBUDGETAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_CODEPOSTEBUDGETAIRE))
                        ObjetEnvoie[Idx].BG_CODEPOSTEBUDGETAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BT_CODETYPEBUDGET))
                        ObjetEnvoie[Idx].BT_CODETYPEBUDGET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BD_CODETYPEBUDGETDETAIL))
                        ObjetEnvoie[Idx].BD_CODETYPEBUDGETDETAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_LIBELLE))
                        ObjetEnvoie[Idx].BG_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
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
                    clsMicbudgetparampostebudgetaires = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencePosteBudgetaire.URL_UPDATE_POSTEBUDGETAIRE, Tokken).ToList();
                    if ((clsMicbudgetparampostebudgetaires == null) || (clsMicbudgetparampostebudgetaires.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                        clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                    clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + ex.Message);
            }
            return Json(clsMicbudgetparampostebudgetaires, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DELETEParamII(List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire clsMicbudgetparampostebudgetaire = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire ObjetRetour = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire(); //Conteneur de la réponse de l'appel du service web
            clsMicbudgetparampostebudgetaire.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> clsMicbudgetparampostebudgetaires = new List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_LIBELLE))
                        ObjetEnvoie[Idx].BG_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
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
                    clsMicbudgetparampostebudgetaires = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencePosteBudgetaire.URL_DELETE_POSTEBUDGETAIRE, Tokken).ToList();
                    if ((clsMicbudgetparampostebudgetaires == null) || (clsMicbudgetparampostebudgetaires.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                        clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                    clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + ex.Message);
            }
            return Json(clsMicbudgetparampostebudgetaires, JsonRequestBehavior.AllowGet);
        }
        public JsonResult COMBOParamII(List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire clsMicbudgetparampostebudgetaire = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsMicbudgetparampostebudgetaire ObjetRetour = new HT_Stock.BOJ.clsMicbudgetparampostebudgetaire(); //Conteneur de la réponse de l'appel du service web
            clsMicbudgetparampostebudgetaire.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire> clsMicbudgetparampostebudgetaires = new List<HT_Stock.BOJ.clsMicbudgetparampostebudgetaire>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BG_LIBELLE))
                        ObjetEnvoie[Idx].BG_LIBELLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
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
                    clsMicbudgetparampostebudgetaires = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencePosteBudgetaire.URL_COMBO_POSTEBUDGETAIRE, Tokken).ToList();
                    if ((clsMicbudgetparampostebudgetaires == null) || (clsMicbudgetparampostebudgetaires.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                        clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                    clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsMicbudgetparampostebudgetaire.clsObjetRetour = clsObjetRetour;
                clsMicbudgetparampostebudgetaires.Add(clsMicbudgetparampostebudgetaire); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TypeBudgetParamIIController :" + ex.Message);
            }
            return Json(clsMicbudgetparampostebudgetaires, JsonRequestBehavior.AllowGet);
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