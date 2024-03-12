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
    public class RemiseDeChequeController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutRemiseDeCheque(List<HT_Stock.BOJ.clsCtsinistrecheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrecheque clsCtsinistrecheque = new HT_Stock.BOJ.clsCtsinistrecheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrecheque ObjetRetour = new HT_Stock.BOJ.clsCtsinistrecheque(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrecheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrecheque> clsCtsinistrecheques = new List<HT_Stock.BOJ.clsCtsinistrecheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                    ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrecheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeCheque.URL_AJOUTER_REMISE_DE_CHEQUE, Tokken).ToList();
                    if ((clsCtsinistrecheques == null) || (clsCtsinistrecheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + ex.Message);
            }
            return Json(clsCtsinistrecheques, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeRemiseDeCheque(List<HT_Stock.BOJ.clsCtsinistrecheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrecheque clsCtsinistrecheque = new HT_Stock.BOJ.clsCtsinistrecheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrecheque ObjetRetour = new HT_Stock.BOJ.clsCtsinistrecheque(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrecheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrecheque> clsCtsinistrecheques = new List<HT_Stock.BOJ.clsCtsinistrecheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_REFCHEQUE))
                        ObjetEnvoie[Idx].CH_REFCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BQ_CODEBANQUE))
                        ObjetEnvoie[Idx].BQ_CODEBANQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE))
                        ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT1))
                        ObjetEnvoie[Idx].MONTANT1 = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT2))
                        ObjetEnvoie[Idx].MONTANT2 = "10000000000";
                    //fin traitement des criteres de recherche non obligatoire


                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrecheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeCheque.URL_SELECT_REMISE_DE_CHEQUE, Tokken).ToList();
                    if ((clsCtsinistrecheques == null) || (clsCtsinistrecheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + ex.Message);
            }
            return Json(clsCtsinistrecheques, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificationRemiseDeCheque(List<HT_Stock.BOJ.clsCtsinistrecheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrecheque clsCtsinistrecheque = new HT_Stock.BOJ.clsCtsinistrecheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrecheque ObjetRetour = new HT_Stock.BOJ.clsCtsinistrecheque(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrecheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrecheque> clsCtsinistrecheques = new List<HT_Stock.BOJ.clsCtsinistrecheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                        ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrecheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeCheque.URL_MODIFIER_REMISE_DE_CHEQUE, Tokken).ToList();
                    if ((clsCtsinistrecheques == null) || (clsCtsinistrecheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + ex.Message);
            }
            return Json(clsCtsinistrecheques, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionRemiseDeCheque(List<HT_Stock.BOJ.clsCtsinistrecheque> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrecheque clsCtsinistrecheque = new HT_Stock.BOJ.clsCtsinistrecheque();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrecheque ObjetRetour = new HT_Stock.BOJ.clsCtsinistrecheque(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrecheque.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrecheque> clsCtsinistrecheques = new List<HT_Stock.BOJ.clsCtsinistrecheque>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                        ObjetEnvoie[Idx].CH_IDEXCHEQUE = "1";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO))
                    //    ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO = "1";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrecheques = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeCheque.URL_SUPPRIMER_REMISE_DE_CHEQUE, Tokken).ToList();
                    if ((clsCtsinistrecheques == null) || (clsCtsinistrecheques.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrecheque.clsObjetRetour = clsObjetRetour;
                clsCtsinistrecheques.Add(clsCtsinistrecheque); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequeController :" + ex.Message);
            }
            return Json(clsCtsinistrecheques, JsonRequestBehavior.AllowGet);
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