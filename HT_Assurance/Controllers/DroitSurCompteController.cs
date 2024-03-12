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
    public class DroitSurCompteController : Controller
    {
       //BLOC LISTE
        public JsonResult ListeDroitSurCompte(List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateurdroitCompteTresorerie clsOperateurdroitCompteTresorerie = new HT_Stock.BOJ.clsOperateurdroitCompteTresorerie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateurdroitCompteTresorerie ObjetRetour = new HT_Stock.BOJ.clsOperateurdroitCompteTresorerie(); //Conteneur de la réponse de l'appel du service web
            clsOperateurdroitCompteTresorerie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie> clsOperateurdroitCompteTresoreries = new List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurdroitCompteTresoreries = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceDroitSurCompte.URL_SELECT_DROIT_SUR_COMPTE, Tokken).ToList();
                    if ((clsOperateurdroitCompteTresoreries == null) || (clsOperateurdroitCompteTresoreries.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                        clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                    clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurCompteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurCompteController :" + ex.Message);
            }
            return Json(clsOperateurdroitCompteTresoreries, JsonRequestBehavior.AllowGet);
        }
         //BLOC MISE A JOUR
        public JsonResult AjoutDroitSurCompte(List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateurdroitCompteTresorerie clsOperateurdroitCompteTresorerie = new HT_Stock.BOJ.clsOperateurdroitCompteTresorerie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateurdroitCompteTresorerie ObjetRetour = new HT_Stock.BOJ.clsOperateurdroitCompteTresorerie(); //Conteneur de la réponse de l'appel du service web
            clsOperateurdroitCompteTresorerie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie> clsOperateurdroitCompteTresoreries = new List<HT_Stock.BOJ.clsOperateurdroitCompteTresorerie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                  //  ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
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
                    clsOperateurdroitCompteTresoreries = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceDroitSurCompte.URL_AJOUTER_DROIT_SUR_COMPTE, Tokken).ToList();
                    if ((clsOperateurdroitCompteTresoreries == null) || (clsOperateurdroitCompteTresoreries.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                        clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                    clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurCompteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateurdroitCompteTresorerie.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitCompteTresoreries.Add(clsOperateurdroitCompteTresorerie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitSurCompteController :" + ex.Message);
            }
            return Json(clsOperateurdroitCompteTresoreries, JsonRequestBehavior.AllowGet);
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