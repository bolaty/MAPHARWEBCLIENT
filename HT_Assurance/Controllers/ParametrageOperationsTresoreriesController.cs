//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using CrystalDecisions.CrystalReports.Engine;
using System.Net;
using System.Text;

namespace HT_Assurance.Controllers
{

    public class ParametrageOperationsTresoreriesController : Controller
    {
        // CHARGEMENT COMBO NATURE FAMILLE
        public JsonResult ComboFamilleOperation(List<HT_Stock.BOJ.clsPhafamilleoperation> ObjetEnvoie)
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


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhafamilleoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_FAMILLE_OPERATION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhafamilleoperation.clsObjetRetour = clsObjetRetour;
                clsPhafamilleoperations.Add(clsPhafamilleoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPhafamilleoperations, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT COMBO JOURNAL
        public JsonResult ComboJournal(List<HT_Stock.BOJ.clsJournal> ObjetEnvoie)
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


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TJ_CODETYPEJOURNAL))
                        ObjetEnvoie[Idx].TJ_CODETYPEJOURNAL = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsJournals = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_JOURNAL, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsJournal.clsObjetRetour = clsObjetRetour;
                clsJournals.Add(clsJournal); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsJournals, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT COMBO JOURNAL SYSTEME
        public JsonResult ComboJournalSysteme(List<HT_Stock.BOJ.clsJournal> ObjetEnvoie)
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


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TJ_CODETYPEJOURNAL))
                        ObjetEnvoie[Idx].TJ_CODETYPEJOURNAL = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsJournals = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_JOURNAL_SYSTEME, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsJournal.clsObjetRetour = clsObjetRetour;
                clsJournals.Add(clsJournal); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsJournals, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT COMBO NATURE COMPTE
        public JsonResult ComboNatureCompte(List<HT_Stock.BOJ.clsPlancomptablenaturecompte> ObjetEnvoie)
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


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptablenaturecomptes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_NATURE_COMPTE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPlancomptablenaturecomptes, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT COMBO SENS
        public JsonResult ComboSens(List<HT_Stock.BOJ.clsSENS> ObjetEnvoie)
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


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsSENSs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_SENS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsSENS.clsObjetRetour = clsObjetRetour;
                clsSENSs.Add(clsSENS); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsSENSs, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT CHAMP NUMERO COMPTE
        public JsonResult ChampNumeroCompte(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                       ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_NUMERO_COMPTE, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
        }

        // CHARGEMENT COMBO TYPE OPERATION
        public JsonResult ComboTypeOperation(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype clsPhamouvementstockreglementnatureoperationtype = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglementnatureoperationtype.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype> clsPhamouvementstockreglementnatureoperationtypes = new List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperationtype>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperationtypes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_CHARGEMENT_TYPE_OPERATION, Tokken).ToList();
                    if ((clsPhamouvementstockreglementnatureoperationtypes == null) || (clsPhamouvementstockreglementnatureoperationtypes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglementnatureoperationtype.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglementnatureoperationtypes.Add(clsPhamouvementstockreglementnatureoperationtype);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglementnatureoperationtype.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglementnatureoperationtypes.Add(clsPhamouvementstockreglementnatureoperationtype);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglementnatureoperationtype.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperationtypes.Add(clsPhamouvementstockreglementnatureoperationtype);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperationtype.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperationtypes.Add(clsPhamouvementstockreglementnatureoperationtype); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperationtypes, JsonRequestBehavior.AllowGet);
        }




        // LISTE
        public JsonResult ListeParamOperationsTresoreries(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
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
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION))
                        ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION))
                        ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_LIST_PARAM_OPERATIONS_TRESORERIE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }

        // ENREGISTREMENT
        public JsonResult AjoutParamOperationsTresoreries(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
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
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION))
                        ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION))
                        ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RO_CODENATUREOPERATIONTYPE))
                        ObjetEnvoie[Idx].RO_CODENATUREOPERATIONTYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_INSERT_PARAM_OPERATIONS_TRESORERIE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }

        // MODIFICATION
        public JsonResult ModifParamOperationsTresoreries(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
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
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                   
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION))
                        ObjetEnvoie[Idx].FO_CODEFAMILLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION))
                        ObjetEnvoie[Idx].NF_CODENATUREFAMILLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RO_CODENATUREOPERATIONTYPE))
                        ObjetEnvoie[Idx].RO_CODENATUREOPERATIONTYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_UPDATE_PARAM_OPERATIONS_TRESORERIE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglementnatureoperations, JsonRequestBehavior.AllowGet);
        }

        // SUPPRESSION
        public JsonResult SupprimerParamOperationsTresoreries(List<HT_Stock.BOJ.clsPhamouvementstockreglementnatureoperation> ObjetEnvoie)
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
                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglementnatureoperations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametrageOperationsTresoreries.URL_DELETE_PARAM_OPERATIONS_TRESORERIE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglementnatureoperation.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglementnatureoperations.Add(clsPhamouvementstockreglementnatureoperation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametrageOperationsTresoreriesController :" + ex.Message);
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