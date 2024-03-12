//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using System.Text;

namespace HT_Assurance.Controllers
{
    public class ProfilsController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutProfils(List<HT_Stock.BOJ.clsProfilweb> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsProfilweb clsProfilweb = new HT_Stock.BOJ.clsProfilweb();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsProfilweb ObjetRetour = new HT_Stock.BOJ.clsProfilweb(); //Conteneur de la réponse de l'appel du service web
            clsProfilweb.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsProfilweb> clsProfilwebs = new List<HT_Stock.BOJ.clsProfilweb>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEPREMIEREEXECUTION))
                    ObjetEnvoie[Idx].DATEPREMIEREEXECUTION = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEDEBUT))
                        ObjetEnvoie[Idx].DATEDEBUT = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEFIN))
                        ObjetEnvoie[Idx].DATEFIN = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEAFFECTATIONRESULTAT))
                        ObjetEnvoie[Idx].EX_DATEAFFECTATIONRESULTAT = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PREMIEREEXECUTION))
                        ObjetEnvoie[Idx].PREMIEREEXECUTION = "01/01/1900";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsProfilwebs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebProfils.URL_AJOUTER_PROFILS, Tokken).ToList();
                    if ((clsProfilwebs == null) || (clsProfilwebs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsProfilweb.clsObjetRetour = clsObjetRetour;
                        clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsProfilweb.clsObjetRetour = clsObjetRetour;
                    clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + ex.Message);
            }
            return Json(clsProfilwebs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeProfils(List<HT_Stock.BOJ.clsProfilweb> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsProfilweb clsProfilweb = new HT_Stock.BOJ.clsProfilweb();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsProfilweb ObjetRetour = new HT_Stock.BOJ.clsProfilweb(); //Conteneur de la réponse de l'appel du service web
            clsProfilweb.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsProfilweb> clsProfilwebs = new List<HT_Stock.BOJ.clsProfilweb>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PO_LIBELLE))
                        ObjetEnvoie[Idx].PO_LIBELLE = "";
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
                    clsProfilwebs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebProfils.URL_SELECT_PROFILS, Tokken).ToList();
                    if ((clsProfilwebs == null) || (clsProfilwebs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsProfilweb.clsObjetRetour = clsObjetRetour;
                        clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsProfilweb.clsObjetRetour = clsObjetRetour;
                    clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + ex.Message);
            }
            return Json(clsProfilwebs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ModificationProfils(List<HT_Stock.BOJ.clsProfilweb> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsProfilweb clsProfilweb = new HT_Stock.BOJ.clsProfilweb();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsProfilweb ObjetRetour = new HT_Stock.BOJ.clsProfilweb(); //Conteneur de la réponse de l'appel du service web
            clsProfilweb.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsProfilweb> clsProfilwebs = new List<HT_Stock.BOJ.clsProfilweb>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEPREMIEREEXECUTION))
                        ObjetEnvoie[Idx].DATEPREMIEREEXECUTION = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEDEBUT))
                        ObjetEnvoie[Idx].DATEDEBUT = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DATEFIN))
                        ObjetEnvoie[Idx].DATEFIN = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEAFFECTATIONRESULTAT))
                        ObjetEnvoie[Idx].EX_DATEAFFECTATIONRESULTAT = "01/01/1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PREMIEREEXECUTION))
                        ObjetEnvoie[Idx].PREMIEREEXECUTION = "01/01/1900";

                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsProfilwebs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebProfils.URL_MODIFIER_PROFILS, Tokken).ToList();
                    if ((clsProfilwebs == null) || (clsProfilwebs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsProfilweb.clsObjetRetour = clsObjetRetour;
                        clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsProfilweb.clsObjetRetour = clsObjetRetour;
                    clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + ex.Message);
            }
            return Json(clsProfilwebs, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionProfils(List<HT_Stock.BOJ.clsProfilweb> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsProfilweb clsProfilweb = new HT_Stock.BOJ.clsProfilweb();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsProfilweb ObjetRetour = new HT_Stock.BOJ.clsProfilweb(); //Conteneur de la réponse de l'appel du service web
            clsProfilweb.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsProfilweb> clsProfilwebs = new List<HT_Stock.BOJ.clsProfilweb>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsProfilwebs = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebProfils.URL_SUPPRIMER_PROFILS, Tokken).ToList();
                    if ((clsProfilwebs == null) || (clsProfilwebs.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsProfilweb.clsObjetRetour = clsObjetRetour;
                        clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsProfilweb.clsObjetRetour = clsObjetRetour;
                    clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsProfilweb.clsObjetRetour = clsObjetRetour;
                clsProfilwebs.Add(clsProfilweb); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ProfilsController :" + ex.Message);
            }
            return Json(clsProfilwebs, JsonRequestBehavior.AllowGet);
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