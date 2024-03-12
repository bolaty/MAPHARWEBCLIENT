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
    public class RelanceController : Controller
    {
        public JsonResult AjoutRelance(List<HT_Stock.BOJ.clsSmsout> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsSmsout clsSmsout = new HT_Stock.BOJ.clsSmsout();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsSmsout ObjetRetour = new HT_Stock.BOJ.clsSmsout(); //Conteneur de la réponse de l'appel du service web
            clsSmsout.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsSmsout> clsSmsouts = new List<HT_Stock.BOJ.clsSmsout>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_DATEPIECE))
                        ObjetEnvoie[Idx].SM_DATEPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_NUMPIECE))
                        ObjetEnvoie[Idx].SM_NUMPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_NUMSEQUENCE))
                        ObjetEnvoie[Idx].SM_NUMSEQUENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMPTE))
                        ObjetEnvoie[Idx].CO_CODECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_MESSAGE))
                        ObjetEnvoie[Idx].SM_MESSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_TELEPHONE))
                        ObjetEnvoie[Idx].SM_TELEPHONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_STATUT))
                        ObjetEnvoie[Idx].SM_STATUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SM_DATESAISIE))
                        ObjetEnvoie[Idx].SM_DATESAISIE = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsSmsouts = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRelance.URL_ADD_RELANCE, Tokken).ToList();
                    if ((clsSmsouts == null) || (clsSmsouts.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsSmsout.clsObjetRetour = clsObjetRetour;
                        clsSmsouts.Add(clsSmsout);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsSmsout.clsObjetRetour = clsObjetRetour;
                    clsSmsouts.Add(clsSmsout);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsSmsout.clsObjetRetour = clsObjetRetour;
                clsSmsouts.Add(clsSmsout);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RelanceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsSmsout.clsObjetRetour = clsObjetRetour;
                clsSmsouts.Add(clsSmsout); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RelanceController :" + ex.Message);
            }
            return Json(clsSmsouts, JsonRequestBehavior.AllowGet);
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