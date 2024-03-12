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
    public class ApproVenteController : Controller
    {
        public JsonResult ListeApproVente(List<HT_Stock.BOJ.clsPhamouvementStock> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementStock clsPhamouvementStock = new HT_Stock.BOJ.clsPhamouvementStock();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementStock ObjetRetour = new HT_Stock.BOJ.clsPhamouvementStock(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementStock.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementStock> clsPhamouvementStocks = new List<HT_Stock.BOJ.clsPhamouvementStock>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MS_NUMPIECE))
                        ObjetEnvoie[Idx].MS_NUMPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AR_CODEARTICLE1))
                        ObjetEnvoie[Idx].AR_CODEARTICLE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_NOMPRENOM))
                        ObjetEnvoie[Idx].CO_NOMPRENOM = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_NUMCOMMERCIAL))
                        ObjetEnvoie[Idx].CO_NUMCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETYPEARTICLE))
                        ObjetEnvoie[Idx].NT_CODENATURETYPEARTICLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPELISTE))
                        ObjetEnvoie[Idx].TYPELISTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NUMEROBORDEREAU))
                        ObjetEnvoie[Idx].NUMEROBORDEREAU = "0";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementStocks = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebApproVente.URL_SELECT_APPROVISIONNEMENT_VENTES, Tokken).ToList();
                    if ((clsPhamouvementStocks == null) || (clsPhamouvementStocks.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementStock.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementStocks.Add(clsPhamouvementStock);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementStock.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementStocks.Add(clsPhamouvementStock);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementStock.clsObjetRetour = clsObjetRetour;
                clsPhamouvementStocks.Add(clsPhamouvementStock);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ApproVenteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementStock.clsObjetRetour = clsObjetRetour;
                clsPhamouvementStocks.Add(clsPhamouvementStock); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ApproVenteController :" + ex.Message);
            }
            return Json(clsPhamouvementStocks, JsonRequestBehavior.AllowGet);
        }


        //BLOC SUPPRESSION SINISTRE
        public JsonResult SuppressionSinistre(List<HT_Stock.BOJ.clsPhamouvementStock> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementStock clsCtsinistre = new HT_Stock.BOJ.clsPhamouvementStock();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementStock ObjetRetour = new HT_Stock.BOJ.clsPhamouvementStock(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementStock> clsCtsinistres = new List<HT_Stock.BOJ.clsPhamouvementStock>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebApproVente.URL_DELETE_APPROVISIONNEMENT_VENTES, Tokken).ToList();
                    if ((clsCtsinistres == null) || (clsCtsinistres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistre.clsObjetRetour = clsObjetRetour;
                        clsCtsinistres.Add(clsCtsinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistre.clsObjetRetour = clsObjetRetour;
                    clsCtsinistres.Add(clsCtsinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ApproVenteController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ApproVenteController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
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