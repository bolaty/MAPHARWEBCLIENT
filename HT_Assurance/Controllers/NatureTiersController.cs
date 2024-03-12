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
    public class NatureTiersController : Controller
    {
        public JsonResult ListeNatureDuTiers(List<HT_Stock.BOJ.clsPhaparnaturetiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhaparnaturetiers clsPhaparnaturetiers = new HT_Stock.BOJ.clsPhaparnaturetiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhaparnaturetiers ObjetRetour = new HT_Stock.BOJ.clsPhaparnaturetiers(); //Conteneur de la réponse de l'appel du service web
            clsPhaparnaturetiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhaparnaturetiers> clsPhaparnaturetierss = new List<HT_Stock.BOJ.clsPhaparnaturetiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhaparnaturetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebNatureTiers.URL_SELECT_NATURE_TIERS, Tokken).ToList();
                    if ((clsPhaparnaturetierss == null) || (clsPhaparnaturetierss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                        clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                    clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error NatureTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                clsPhaparnaturetierss.Add(clsPhaparnaturetiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error NatureTiersController :" + ex.Message);
            }
            return Json(clsPhaparnaturetierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeNatureDuTiersSelonType(List<HT_Stock.BOJ.clsPhaparnaturetiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhaparnaturetiers clsPhaparnaturetiers = new HT_Stock.BOJ.clsPhaparnaturetiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhaparnaturetiers ObjetRetour = new HT_Stock.BOJ.clsPhaparnaturetiers(); //Conteneur de la réponse de l'appel du service web
            clsPhaparnaturetiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhaparnaturetiers> clsPhaparnaturetierss = new List<HT_Stock.BOJ.clsPhaparnaturetiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhaparnaturetierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebNatureTiers.URL_SELECT_NATURE_TIERS_SELON_TYPE, Tokken).ToList();
                    if ((clsPhaparnaturetierss == null) || (clsPhaparnaturetierss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                        clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                    clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                clsPhaparnaturetierss.Add(clsPhaparnaturetiers);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error NatureTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhaparnaturetiers.clsObjetRetour = clsObjetRetour;
                clsPhaparnaturetierss.Add(clsPhaparnaturetiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error NatureTiersController :" + ex.Message);
            }
            return Json(clsPhaparnaturetierss, JsonRequestBehavior.AllowGet);
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