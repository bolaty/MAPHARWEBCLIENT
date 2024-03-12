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
    public class DroitTransfertStockController : Controller
    {
       //BLOC LISTE
        public JsonResult ListeDroitTransfertStock(List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot clsOperateurdroitsaisiephaparentrepot = new HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot ObjetRetour = new HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot(); //Conteneur de la réponse de l'appel du service web
            clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot> clsOperateurdroitsaisiephaparentrepots = new List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                   //  ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOperateurdroitsaisiephaparentrepots = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitTransfertStock.URL_SELECT_DROIT_TRANSFERT_STOCK, Tokken).ToList();
                    if ((clsOperateurdroitsaisiephaparentrepots == null) || (clsOperateurdroitsaisiephaparentrepots.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                        clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                    clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitTransfertStockController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitTransfertStockController :" + ex.Message);
            }
            return Json(clsOperateurdroitsaisiephaparentrepots, JsonRequestBehavior.AllowGet);
        }
         //BLOC MISE A JOUR
        public JsonResult AjoutDroitTransfertStock(List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot> ObjetEnvoie)

        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot clsOperateurdroitsaisiephaparentrepot = new HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot ObjetRetour = new HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot(); //Conteneur de la réponse de l'appel du service web
            clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot> clsOperateurdroitsaisiephaparentrepots = new List<HT_Stock.BOJ.clsOperateurdroitsaisiephaparentrepot>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                 // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                //  ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                  //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //fin recuperation des parametres de connexion

                    ////debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                    //    ObjetEnvoie[Idx].AG_CODEAGENCE = "";
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
                    clsOperateurdroitsaisiephaparentrepots = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDroitTransfertStock.URL_AJOUTER_DROIT_TRANSFERT_STOCK, Tokken).ToList();
                    if ((clsOperateurdroitsaisiephaparentrepots == null) || (clsOperateurdroitsaisiephaparentrepots.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                        clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                    clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitTransfertStockController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOperateurdroitsaisiephaparentrepot.clsObjetRetour = clsObjetRetour;
                clsOperateurdroitsaisiephaparentrepots.Add(clsOperateurdroitsaisiephaparentrepot); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error DroitTransfertStockController :" + ex.Message);
            }
            return Json(clsOperateurdroitsaisiephaparentrepots, JsonRequestBehavior.AllowGet);
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