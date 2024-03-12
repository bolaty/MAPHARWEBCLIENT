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
    public class GarentiesController : Controller
    {
        public JsonResult ListeGarenties(List<HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison clsCtpargarantierisqueassuranceliaison = new HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison ObjetRetour = new HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison(); //Conteneur de la réponse de l'appel du service web
            clsCtpargarantierisqueassuranceliaison.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison> clsCtpargarantierisqueassuranceliaisons = new List<HT_Stock.BOJ.clsCtpargarantierisqueassuranceliaison>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtpargarantierisqueassuranceliaisons = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGarenties.URL_SELECT_GARENTIES, Tokken).ToList();
                    if ((clsCtpargarantierisqueassuranceliaisons == null) || (clsCtpargarantierisqueassuranceliaisons.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtpargarantierisqueassuranceliaison.clsObjetRetour = clsObjetRetour;
                        clsCtpargarantierisqueassuranceliaisons.Add(clsCtpargarantierisqueassuranceliaison);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtpargarantierisqueassuranceliaison.clsObjetRetour = clsObjetRetour;
                    clsCtpargarantierisqueassuranceliaisons.Add(clsCtpargarantierisqueassuranceliaison);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtpargarantierisqueassuranceliaison.clsObjetRetour = clsObjetRetour;
                clsCtpargarantierisqueassuranceliaisons.Add(clsCtpargarantierisqueassuranceliaison);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GarentiesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtpargarantierisqueassuranceliaison.clsObjetRetour = clsObjetRetour;
                clsCtpargarantierisqueassuranceliaisons.Add(clsCtpargarantierisqueassuranceliaison); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GarentiesController :" + ex.Message);
            }
            return Json(clsCtpargarantierisqueassuranceliaisons, JsonRequestBehavior.AllowGet);
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