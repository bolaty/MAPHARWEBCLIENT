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
    public class SaisieEcheancierController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutSaisieContrat(List<HT_Stock.BOJ.clsCtcontratecheancier> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratecheancier clsCtcontratecheancier = new HT_Stock.BOJ.clsCtcontratecheancier();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratecheancier ObjetRetour = new HT_Stock.BOJ.clsCtcontratecheancier(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratecheancier.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratecheancier> clsCtcontratecheanciers = new List<HT_Stock.BOJ.clsCtcontratecheancier>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                   
                   //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                   // ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EC_DATEECHEANCE))
                        ObjetEnvoie[Idx].EC_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EC_MONTANTECHEANCE))
                        ObjetEnvoie[Idx].EC_MONTANTECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EC_MONTANTECHEANCENF))
                        ObjetEnvoie[Idx].EC_MONTANTECHEANCENF = "";
                }


                    Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratecheanciers = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSaisieEcheancier.URL_MISE_A_JOUR_SAISIE_ECHEANCIER, Tokken).ToList();
                    if ((clsCtcontratecheanciers == null) || (clsCtcontratecheanciers.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                        clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                    clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + ex.Message);
            }
            return Json(clsCtcontratecheanciers, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListeSaisieContrat(List<HT_Stock.BOJ.clsCtcontratecheancier> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratecheancier clsCtcontratecheancier = new HT_Stock.BOJ.clsCtcontratecheancier();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratecheancier ObjetRetour = new HT_Stock.BOJ.clsCtcontratecheancier(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratecheancier.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratecheancier> clsCtcontratecheanciers = new List<HT_Stock.BOJ.clsCtcontratecheancier>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratecheanciers = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSaisieEcheancier.URL_SELECT_SAISIE_ECHEANCIER, Tokken).ToList();
                    if ((clsCtcontratecheanciers == null) || (clsCtcontratecheanciers.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                        clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                    clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + ex.Message);
            }
            return Json(clsCtcontratecheanciers, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult SuppressionsaisieContrat(List<HT_Stock.BOJ.clsCtcontratecheancier> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratecheancier clsCtcontratecheancier = new HT_Stock.BOJ.clsCtcontratecheancier();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratecheancier ObjetRetour = new HT_Stock.BOJ.clsCtcontratecheancier(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratecheancier.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratecheancier> clsCtcontratecheanciers = new List<HT_Stock.BOJ.clsCtcontratecheancier>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratecheanciers = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSaisieEcheancier.URL_DELETE_SAISIE_ECHEANCIER, Tokken).ToList();
                    if ((clsCtcontratecheanciers == null) || (clsCtcontratecheanciers.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                        clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                    clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratecheancier.clsObjetRetour = clsObjetRetour;
                clsCtcontratecheanciers.Add(clsCtcontratecheancier); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcheancierController :" + ex.Message);
            }
            return Json(clsCtcontratecheanciers, JsonRequestBehavior.AllowGet);
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