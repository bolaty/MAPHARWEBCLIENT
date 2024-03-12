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
    public class ListeFamilleOperationController : Controller
    {
        public JsonResult ListeFamilleOperation(List<HT_Stock.BOJ.clsPhafamilleoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhafamilleoperation clsPhafamilleoperation = new HT_Stock.BOJ.clsPhafamilleoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhafamilleoperation ObjetRetour = new HT_Stock.BOJ.clsPhafamilleoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhafamilleoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhafamilleoperation> clsPhafamilleoperations = new List<HT_Stock.BOJ.clsPhafamilleoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhafamilleoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebListeFamilleOperation.URL_SELECT_FAMILLE_OPERATION_TIERS, Tokken).ToList();
                    if ((clsPhafamilleoperations == null) || (clsPhafamilleoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                        clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                    clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ListeFamilleOperationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ListeFamilleOperationController :" + ex.Message);
            }
            return Json(clsPhafamilleoperations, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeFamilleOperationversement(List<HT_Stock.BOJ.clsPhafamilleoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhafamilleoperation clsPhafamilleoperation = new HT_Stock.BOJ.clsPhafamilleoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhafamilleoperation ObjetRetour = new HT_Stock.BOJ.clsPhafamilleoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhafamilleoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhafamilleoperation> clsPhafamilleoperations = new List<HT_Stock.BOJ.clsPhafamilleoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhafamilleoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebListeFamilleOperation.URL_SELECT_FAMILLE_OPERATION_VERSEMENT, Tokken).ToList();
                    if ((clsPhafamilleoperations == null) || (clsPhafamilleoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                        clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                    clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ListeFamilleOperationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ListeFamilleOperationController :" + ex.Message);
            }
            return Json(clsPhafamilleoperations, JsonRequestBehavior.AllowGet);
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