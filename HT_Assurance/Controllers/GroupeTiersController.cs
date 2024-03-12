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
    public class GroupeTiersController : Controller
    {
        public JsonResult ListeGroupeTiers(List<HT_Stock.BOJ.clsPhatiersgroupe> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiersgroupe clsPhatiersgroupe = new HT_Stock.BOJ.clsPhatiersgroupe();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiersgroupe ObjetRetour = new HT_Stock.BOJ.clsPhatiersgroupe(); //Conteneur de la réponse de l'appel du service web
            clsPhatiersgroupe.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiersgroupe> clsPhatiersgroupes = new List<HT_Stock.BOJ.clsPhatiersgroupe>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatiersgroupes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGroupeDesTiers.URL_SELECT_GROUPE_DES_TIERS, Tokken).ToList();
                    if ((clsPhatiersgroupes == null) || (clsPhatiersgroupes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                        clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                    clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + ex.Message);
            }
            return Json(clsPhatiersgroupes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AjoutGroupeTiers(List<HT_Stock.BOJ.clsPhatiersgroupe> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiersgroupe clsPhatiersgroupe = new HT_Stock.BOJ.clsPhatiersgroupe();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiersgroupe ObjetRetour = new HT_Stock.BOJ.clsPhatiersgroupe(); //Conteneur de la réponse de l'appel du service web
            clsPhatiersgroupe.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiersgroupe> clsPhatiersgroupes = new List<HT_Stock.BOJ.clsPhatiersgroupe>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                    //ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatiersgroupes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGroupeDesTiers.URL_AJOUTER_GROUPE_DES_TIERS, Tokken).ToList();
                    if ((clsPhatiersgroupes == null) || (clsPhatiersgroupes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                        clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                    clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + ex.Message);
            }
            return Json(clsPhatiersgroupes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeGroupeTiers2(List<HT_Stock.BOJ.clsPhatiersgroupe> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiersgroupe clsPhatiersgroupe = new HT_Stock.BOJ.clsPhatiersgroupe();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiersgroupe ObjetRetour = new HT_Stock.BOJ.clsPhatiersgroupe(); //Conteneur de la réponse de l'appel du service web
            clsPhatiersgroupe.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiersgroupe> clsPhatiersgroupes = new List<HT_Stock.BOJ.clsPhatiersgroupe>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                       ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].BQ_CODEBANQUE))
                    //    ObjetEnvoie[Idx].BQ_CODEBANQUE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE))
                    //    ObjetEnvoie[Idx].AB_CODEAGENCEBANCAIRE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT1))
                    //    ObjetEnvoie[Idx].MONTANT1 = "0";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MONTANT2))
                    //    ObjetEnvoie[Idx].MONTANT2 = "10000000000";
                    //fin traitement des criteres de recherche non obligatoire


                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatiersgroupes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGroupeDesTiers.URL_SELECT_LISTE_GROUPE_DES_TIERS, Tokken).ToList();
                    if ((clsPhatiersgroupes == null) || (clsPhatiersgroupes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                        clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                    clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + ex.Message);
            }
            return Json(clsPhatiersgroupes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificationGroupeTiers(List<HT_Stock.BOJ.clsPhatiersgroupe> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiersgroupe clsPhatiersgroupe = new HT_Stock.BOJ.clsPhatiersgroupe();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiersgroupe ObjetRetour = new HT_Stock.BOJ.clsPhatiersgroupe(); //Conteneur de la réponse de l'appel du service web
            clsPhatiersgroupe.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiersgroupe> clsPhatiersgroupes = new List<HT_Stock.BOJ.clsPhatiersgroupe>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                    //    ObjetEnvoie[Idx].CH_IDEXCHEQUE = "1";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatiersgroupes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGroupeDesTiers.URL_MODIFIER_GROUPE_DES_TIERS, Tokken).ToList();
                    if ((clsPhatiersgroupes == null) || (clsPhatiersgroupes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                        clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                    clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + ex.Message);
            }
            return Json(clsPhatiersgroupes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionGroupeTiers(List<HT_Stock.BOJ.clsPhatiersgroupe> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhatiersgroupe clsPhatiersgroupe = new HT_Stock.BOJ.clsPhatiersgroupe();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhatiersgroupe ObjetRetour = new HT_Stock.BOJ.clsPhatiersgroupe(); //Conteneur de la réponse de l'appel du service web
            clsPhatiersgroupe.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhatiersgroupe> clsPhatiersgroupes = new List<HT_Stock.BOJ.clsPhatiersgroupe>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                    //    ObjetEnvoie[Idx].CH_IDEXCHEQUE = "1";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO))
                    //    ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO = "1";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatiersgroupes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebGroupeDesTiers.URL_SUPPRIMER_GROUPE_DES_TIERS, Tokken).ToList();
                    if ((clsPhatiersgroupes == null) || (clsPhatiersgroupes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                        clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                    clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiersgroupe.clsObjetRetour = clsObjetRetour;
                clsPhatiersgroupes.Add(clsPhatiersgroupe); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error GroupeTiersController :" + ex.Message);
            }
            return Json(clsPhatiersgroupes, JsonRequestBehavior.AllowGet);
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