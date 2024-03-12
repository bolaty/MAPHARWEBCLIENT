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
    public class ContratChequeController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutContratCheque(List<HT_Assurance.clsCtcontratcheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratcheque clsCtcontratcheque = new HT_Stock.BOJ.clsCtcontratcheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratcheque ObjetRetour = new HT_Stock.BOJ.clsCtcontratcheque(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratcheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratcheque> clsCtcontratcheques = new List<HT_Stock.BOJ.clsCtcontratcheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                        ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratcheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_MISE_A_JOUR_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratcheques == null) || (clsCtcontratcheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                        clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                    clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratcheques, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListeContratCheque(List<HT_Stock.BOJ.clsCtcontratcheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontratcheque clsCtcontratcheque = new HT_Assurance.clsCtcontratcheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontratcheque ObjetRetour = new HT_Assurance.clsCtcontratcheque(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratcheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontratcheque> clsCtcontratcheques = new List<HT_Assurance.clsCtcontratcheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                       ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_REFCHEQUE))
                        ObjetEnvoie[Idx].CH_REFCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE))
                        ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT1))
                        ObjetEnvoie[Idx].MONTANT1 = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT2))
                        ObjetEnvoie[Idx].MONTANT2 = "100000000000";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratcheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_SELECT_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratcheques == null) || (clsCtcontratcheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                        clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                    clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratcheques, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult Suppressioncontratcheque(List<HT_Stock.BOJ.clsCtcontratcheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratcheque clsCtcontratcheque = new HT_Stock.BOJ.clsCtcontratcheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratcheque ObjetRetour = new HT_Stock.BOJ.clsCtcontratcheque(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratcheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratcheque> clsCtcontratcheques = new List<HT_Stock.BOJ.clsCtcontratcheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratcheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_DELETE_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratcheques == null) || (clsCtcontratcheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                        clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                    clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratcheques, JsonRequestBehavior.AllowGet);

        }

        //BLOC DE MODIFICATION
        public JsonResult ModificationContratCheque(List<HT_Assurance.clsCtcontratcheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratcheque clsCtcontratcheque = new HT_Stock.BOJ.clsCtcontratcheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratcheque ObjetRetour = new HT_Stock.BOJ.clsCtcontratcheque(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratcheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratcheque> clsCtcontratcheques = new List<HT_Stock.BOJ.clsCtcontratcheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                        ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratcheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_MODIFICATION_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratcheques == null) || (clsCtcontratcheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                        clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                    clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratcheques, JsonRequestBehavior.AllowGet);
        }


        //BLOC DE VALIDATION
        public JsonResult ValidationContratCheque(List<HT_Stock.BOJ.clsCtcontratcheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratcheque clsCtcontratcheque = new HT_Stock.BOJ.clsCtcontratcheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratcheque ObjetRetour = new HT_Stock.BOJ.clsCtcontratcheque(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratcheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratcheque> clsCtcontratcheques = new List<HT_Stock.BOJ.clsCtcontratcheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                        ObjetEnvoie[Idx].CH_IDEXCHEQUE = "1";
                     if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_REFCHEQUE))
                        ObjetEnvoie[Idx].CH_REFCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT1))
                        ObjetEnvoie[Idx].MONTANT1 = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT2))
                        ObjetEnvoie[Idx].MONTANT2 = "100000000000";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratcheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_VALIDATION_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratcheques == null) || (clsCtcontratcheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                        clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                    clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratcheque.clsObjetRetour = clsObjetRetour;
                clsCtcontratcheques.Add(clsCtcontratcheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratcheques, JsonRequestBehavior.AllowGet);
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