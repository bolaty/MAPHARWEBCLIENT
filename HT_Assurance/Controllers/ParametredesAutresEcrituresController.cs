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
    public class ParametredesAutresEcrituresController : Controller
    {
        public JsonResult Listecombofamilleoperation(List<HT_Stock.BOJ.clsPhafamilleoperation> ObjetEnvoie)
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
                    clsPhafamilleoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_SELECT_FAMILLEOPERATION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPhafamilleoperations, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Liste(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation clsPhamouvementstockreglementnatureoperation = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglementnatureoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> clsPhamouvementstockreglementnatureoperations = new List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_SELECT_LISTE, Tokken).ToList();
                    if ((clsPhamouvementstockreglementnatureoperations == null) || (clsPhamouvementstockreglementnatureoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeJournal(List<HT_Stock.BOJ.clsJournal> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsJournal clsJournal = new HT_Stock.BOJ.clsJournal();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsJournal ObjetRetour = new HT_Stock.BOJ.clsJournal(); //Conteneur de la réponse de l'appel du service web
            clsJournal.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsJournal> clsJournals = new List<HT_Stock.BOJ.clsJournal>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsJournals = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_SELECT_JOURNAL, Tokken).ToList();
                    if ((clsJournals == null) || (clsJournals.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsJournal.clsObjetRetour = clsObjetRetour;
                        clsJournals.Add(clsJournal);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsJournal.clsObjetRetour = clsObjetRetour;
                    clsJournals.Add(clsJournal);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsJournal.clsObjetRetour = clsObjetRetour;
                clsJournals.Add(clsJournal);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsJournal.clsObjetRetour = clsObjetRetour;
                clsJournals.Add(clsJournal); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsJournals, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ListeNatureCompte(List<HT_Stock.BOJ.clsPlancomptablenaturecompte> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptablenaturecompte clsPlancomptablenaturecompte = new HT_Stock.BOJ.clsPlancomptablenaturecompte();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptablenaturecompte ObjetRetour = new HT_Stock.BOJ.clsPlancomptablenaturecompte(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptablenaturecompte.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptablenaturecompte> clsPlancomptablenaturecomptes = new List<HT_Stock.BOJ.clsPlancomptablenaturecompte>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptablenaturecomptes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_SELECT_NATURECOMPTE, Tokken).ToList();
                    if ((clsPlancomptablenaturecomptes == null) || (clsPlancomptablenaturecomptes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                        clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                    clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPlancomptablenaturecomptes, JsonRequestBehavior.AllowGet);
        }


        public JsonResult ListeSens(List<HT_Stock.BOJ.clsSENS> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsSENS clsSENS = new HT_Stock.BOJ.clsSENS();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsSENS ObjetRetour = new HT_Stock.BOJ.clsSENS(); //Conteneur de la réponse de l'appel du service web
            clsSENS.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsSENS> clsSENSs = new List<HT_Stock.BOJ.clsSENS>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsSENSs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_SELECT_SENS, Tokken).ToList();
                    if ((clsSENSs == null) || (clsSENSs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsSENS.clsObjetRetour = clsObjetRetour;
                        clsSENSs.Add(clsSENS);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsSENS.clsObjetRetour = clsObjetRetour;
                    clsSENSs.Add(clsSENS);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsSENS.clsObjetRetour = clsObjetRetour;
                clsSENSs.Add(clsSENS);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsSENS.clsObjetRetour = clsObjetRetour;
                clsSENSs.Add(clsSENS); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsSENSs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult INSERT(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation clsPhamouvementstockreglementnatureoperation = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglementnatureoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> clsPhamouvementstockreglementnatureoperations = new List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_INSERT, Tokken).ToList();
                    if ((clsPhamouvementstockreglementnatureoperations == null) || (clsPhamouvementstockreglementnatureoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }


        public JsonResult UPDATE(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation clsPhamouvementstockreglementnatureoperation = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglementnatureoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> clsPhamouvementstockreglementnatureoperations = new List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";

                }




                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_UPDATE, Tokken).ToList();
                    if ((clsPhamouvementstockreglementnatureoperations == null) || (clsPhamouvementstockreglementnatureoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DELETE(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation clsPhamouvementstockreglementnatureoperation = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglementnatureoperation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> clsPhamouvementstockreglementnatureoperations = new List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragedesautresEcriture.URL_DELETE, Tokken).ToList();
                    if ((clsPhamouvementstockreglementnatureoperations == null) || (clsPhamouvementstockreglementnatureoperations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametredesAutresEcrituresController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
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