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
    public class SouscripteurCommercialController : Controller
    {
        public JsonResult ListeTiersNew(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiers clsPhatiers = new HT_Stock.BOJ.clsPhatiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiers ObjetRetour = new HT_Stock.BOJ.clsPhatiers(); //Conteneur de la réponse de l'appel du service web
            clsPhatiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiers> clsPhatierss = new List<HT_Stock.BOJ.clsPhatiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_EMAIL))
                        ObjetEnvoie[Idx].TI_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSouscripteurCommercial.URL_SELECT_SOUSCRIPTEUR_COMMERCIAL2, Tokken).ToList();
                    if ((clsPhatierss == null) || (clsPhatierss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiers.clsObjetRetour = clsObjetRetour;
                        clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiers.clsObjetRetour = clsObjetRetour;
                    clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeTiers(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiers clsPhatiers = new HT_Stock.BOJ.clsPhatiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiers ObjetRetour = new HT_Stock.BOJ.clsPhatiers(); //Conteneur de la réponse de l'appel du service web
            clsPhatiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiers> clsPhatierss = new List<HT_Stock.BOJ.clsPhatiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSouscripteurCommercial.URL_SELECT_SOUSCRIPTEUR_COMMERCIAL, Tokken).ToList();
                    if ((clsPhatierss == null) || (clsPhatierss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiers.clsObjetRetour = clsObjetRetour;
                        clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiers.clsObjetRetour = clsObjetRetour;
                    clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ComboCommercial(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiers clsPhatiers = new HT_Stock.BOJ.clsPhatiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiers ObjetRetour = new HT_Stock.BOJ.clsPhatiers(); //Conteneur de la réponse de l'appel du service web
            clsPhatiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiers> clsPhatierss = new List<HT_Stock.BOJ.clsPhatiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSouscripteurCommercial.URL_SELECT_COMBO_COMMERCIAL, Tokken).ToList();
                    if ((clsPhatierss == null) || (clsPhatierss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiers.clsObjetRetour = clsObjetRetour;
                        clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiers.clsObjetRetour = clsObjetRetour;
                    clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SouscripteurCommercialController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
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