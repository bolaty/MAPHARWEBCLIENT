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
    public class SuiviClientController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutSuiviClient(List<HT_Stock.BOJ.clsCtcontratsuivieclient> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratsuivieclient clsCtcontratsuivieclient = new HT_Stock.BOJ.clsCtcontratsuivieclient();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratsuivieclient ObjetRetour = new HT_Stock.BOJ.clsCtcontratsuivieclient(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratsuivieclient.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratsuivieclient> clsCtcontratsuivieclients = new List<HT_Stock.BOJ.clsCtcontratsuivieclient>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                   
                        if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SU_INDEXSUIVIE))
                        ObjetEnvoie[Idx].SU_INDEXSUIVIE = "";
                  
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratsuivieclients = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSuiviClient.URL_AJOUTER_SUIVICLIENT, Tokken).ToList();
                    if ((clsCtcontratsuivieclients == null) || (clsCtcontratsuivieclients.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                        clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                    clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + ex.Message);
            }
            return Json(clsCtcontratsuivieclients, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListeSuiviClient(List<HT_Stock.BOJ.clsCtcontratsuivieclient> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratsuivieclient clsCtcontratsuivieclient = new HT_Stock.BOJ.clsCtcontratsuivieclient();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratsuivieclient ObjetRetour = new HT_Stock.BOJ.clsCtcontratsuivieclient(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratsuivieclient.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratsuivieclient> clsCtcontratsuivieclients = new List<HT_Stock.BOJ.clsCtcontratsuivieclient>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if(string.IsNullOrEmpty(ObjetEnvoie[Idx].SU_DESCRIPTIONEVENEMENT))
                    ObjetEnvoie[Idx].SU_DESCRIPTIONEVENEMENT = "";
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
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                    //    ObjetEnvoie[Idx].TYPEOPERATION = "";
                    ////fin traitement des criteres de recherche non obligatoire

                    ////debut recuperation des parametres de connexion
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                       ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                       ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    ////fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratsuivieclients = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSuiviClient.URL_SELECT_SUIVICLIENT, Tokken).ToList();
                    if ((clsCtcontratsuivieclients == null) || (clsCtcontratsuivieclients.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                        clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                    clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + ex.Message);
            }
            return Json(clsCtcontratsuivieclients, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult SuppressionSuiviClient(List<HT_Stock.BOJ.clsCtcontratsuivieclient> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratsuivieclient clsCtcontratsuivieclient = new HT_Stock.BOJ.clsCtcontratsuivieclient();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratsuivieclient ObjetRetour = new HT_Stock.BOJ.clsCtcontratsuivieclient(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratsuivieclient.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratsuivieclient> clsCtcontratsuivieclients = new List<HT_Stock.BOJ.clsCtcontratsuivieclient>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsCtcontratsuivieclients = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSuiviClient.URL_SUPPRIMER_SUIVICLIENT, Tokken).ToList();
                    if ((clsCtcontratsuivieclients == null) || (clsCtcontratsuivieclients.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                        clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                    clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + ex.Message);
            }
            return Json(clsCtcontratsuivieclients, JsonRequestBehavior.AllowGet);
        }

        //BLOC MODIFICATION
        public JsonResult ModificationSuiviClient(List<HT_Stock.BOJ.clsCtcontratsuivieclient> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratsuivieclient clsCtcontratsuivieclient = new HT_Stock.BOJ.clsCtcontratsuivieclient();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratsuivieclient ObjetRetour = new HT_Stock.BOJ.clsCtcontratsuivieclient(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratsuivieclient.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratsuivieclient> clsCtcontratsuivieclients = new List<HT_Stock.BOJ.clsCtcontratsuivieclient>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SU_INDEXSUIVIE))
                        ObjetEnvoie[Idx].SU_INDEXSUIVIE = "";




                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratsuivieclients = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSuiviClient.URL_MODIFIER_SUIVICLIENT, Tokken).ToList();
                    if ((clsCtcontratsuivieclients == null) || (clsCtcontratsuivieclients.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                        clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                    clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratsuivieclient.clsObjetRetour = clsObjetRetour;
                clsCtcontratsuivieclients.Add(clsCtcontratsuivieclient); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SuiviClientController :" + ex.Message);
            }
            return Json(clsCtcontratsuivieclients, JsonRequestBehavior.AllowGet);
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