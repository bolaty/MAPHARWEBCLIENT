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
    public class TarifSelonBranchesController : Controller
    {
        public JsonResult ListeTarifSelonBranches(List<HT_Stock.BOJ.clsCtparbranchecategorietarif> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtparbranchecategorietarif clsCtparbranchecategorietarif = new HT_Stock.BOJ.clsCtparbranchecategorietarif();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtparbranchecategorietarif ObjetRetour = new HT_Stock.BOJ.clsCtparbranchecategorietarif(); //Conteneur de la réponse de l'appel du service web
            clsCtparbranchecategorietarif.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtparbranchecategorietarif> clsCtparbranchecategorietarifs = new List<HT_Stock.BOJ.clsCtparbranchecategorietarif>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtparbranchecategorietarifs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceTarifselonBranches.URL_SELECT_TARIFSELONBRANCHE, Tokken).ToList();
                    if ((clsCtparbranchecategorietarifs == null) || (clsCtparbranchecategorietarifs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtparbranchecategorietarif.clsObjetRetour = clsObjetRetour;
                        clsCtparbranchecategorietarifs.Add(clsCtparbranchecategorietarif);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtparbranchecategorietarif.clsObjetRetour = clsObjetRetour;
                    clsCtparbranchecategorietarifs.Add(clsCtparbranchecategorietarif);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtparbranchecategorietarif.clsObjetRetour = clsObjetRetour;
                clsCtparbranchecategorietarifs.Add(clsCtparbranchecategorietarif);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TarifSelonBranchesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtparbranchecategorietarif.clsObjetRetour = clsObjetRetour;
                clsCtparbranchecategorietarifs.Add(clsCtparbranchecategorietarif); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error TarifSelonBranchesController :" + ex.Message);
            }
            return Json(clsCtparbranchecategorietarifs, JsonRequestBehavior.AllowGet);
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