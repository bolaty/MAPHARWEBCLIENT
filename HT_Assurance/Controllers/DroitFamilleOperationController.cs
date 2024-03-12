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
    public class DroitFamilleOperationController : Controller
    {
       //BLOC LISTE
        public JsonResult ListeFamilleOperation(List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur clsLogicielobjettypeoperationoperateur = new HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur ObjetRetour = new HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur(); //Conteneur de la réponse de l'appel du service web
            clsLogicielobjettypeoperationoperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur> clsLogicielobjettypeoperationoperateurs = new List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                  ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsLogicielobjettypeoperationoperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitFamilleOperation.URL_SELECT_DROIT_FAMILLE_OPERATION, Tokken).ToList();
                    if ((clsLogicielobjettypeoperationoperateurs == null) || (clsLogicielobjettypeoperationoperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                        clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                    clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitFamilleOperationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitFamilleOperationController :" + ex.Message);
            }
            return Json(clsLogicielobjettypeoperationoperateurs, JsonRequestBehavior.AllowGet);
        }
         //BLOC MISE A JOUR
        public JsonResult AjoutFamilleOperation(List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur clsLogicielobjettypeoperationoperateur = new HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur ObjetRetour = new HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur(); //Conteneur de la réponse de l'appel du service web
            clsLogicielobjettypeoperationoperateur.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur> clsLogicielobjettypeoperationoperateurs = new List<HT_Stock.BOJ.clsLogicielobjettypeoperationoperateur>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                  ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion

                    //////debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                    //    ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                    //    ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                    //    ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                    //    ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].COCHER))
                    //    ObjetEnvoie[Idx].COCHER = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MODIFICATION))
                    //    ObjetEnvoie[Idx].MODIFICATION = "";
                    ////fin traitement des criteres de recherche non  obligatoire


                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsLogicielobjettypeoperationoperateurs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitFamilleOperation.URL_AJOUTER_DROIT_FAMILLE_OPERATION, Tokken).ToList();
                    if ((clsLogicielobjettypeoperationoperateurs == null) || (clsLogicielobjettypeoperationoperateurs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                        clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                    clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitFamilleOperationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsLogicielobjettypeoperationoperateur.clsObjetRetour = clsObjetRetour;
                clsLogicielobjettypeoperationoperateurs.Add(clsLogicielobjettypeoperationoperateur); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitFamilleOperationController :" + ex.Message);
            }
            return Json(clsLogicielobjettypeoperationoperateurs, JsonRequestBehavior.AllowGet);
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