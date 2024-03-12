//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using System.Text;

namespace HT_Assurance.Controllers
{
    public class DroitAutreOperationTiersController : Controller
    {
       //BLOC LISTE
        public JsonResult ListeDroitOperationTresorerie(List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur clsLogicielobjettypeschemacomptableoperateur = new HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur ObjetRetour = new HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur(); //Conteneur de la réponse de l'appel du service web
            clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur> clsLogicielobjettypeschemacomptableoperateurs = new List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsLogicielobjettypeschemacomptableoperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitSurAutreOperationTiers.URL_LISTE_DROIT_SUR_AUTRE_OPERATION_TIERS, Tokken).ToList();
                    if ((clsLogicielobjettypeschemacomptableoperateurs == null) || (clsLogicielobjettypeschemacomptableoperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                        clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                    clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurAutreOperationTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurAutreOperationTiersController :" + ex.Message);
            }
            return Json(clsLogicielobjettypeschemacomptableoperateurs, JsonRequestBehavior.AllowGet);
        }
         //BLOC MISE A JOUR
        public JsonResult AjoutDroitOperationTresorerie(List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur clsLogicielobjettypeschemacomptableoperateur = new HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur ObjetRetour = new HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur(); //Conteneur de la réponse de l'appel du service web
            clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur> clsLogicielobjettypeschemacomptableoperateurs = new List<HT_Stock.BOJ.clsLogicielobjettypeschemacomptableoperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    // ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion

                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    //fin traitement des criteres de recherche non  obligatoire


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsLogicielobjettypeschemacomptableoperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitSurAutreOperationTiers.URL_AJOUT_DROIT_SUR_AUTRE_OPERATION_TIERS, Tokken).ToList();
                    if ((clsLogicielobjettypeschemacomptableoperateurs == null) || (clsLogicielobjettypeschemacomptableoperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                        clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                    clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurAutreOperationTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsLogicielobjettypeschemacomptableoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeschemacomptableoperateurs.Add(clsLogicielobjettypeschemacomptableoperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurAutreOperationTiersController :" + ex.Message);
            }
            return Json(clsLogicielobjettypeschemacomptableoperateurs, JsonRequestBehavior.AllowGet);
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