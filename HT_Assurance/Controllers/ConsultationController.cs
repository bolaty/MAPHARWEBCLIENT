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
    public class ConsultationController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutConsultation(List<HT_Stock.BOJ.clsCliconsultation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCliconsultation clsCliconsultation = new HT_Stock.BOJ.clsCliconsultation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCliconsultation ObjetRetour = new HT_Stock.BOJ.clsCliconsultation(); //Conteneur de la réponse de l'appel du service web
            clsCliconsultation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCliconsultation> clsCliconsultations = new List<HT_Stock.BOJ.clsCliconsultation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION1))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSPATIENT))
                        ObjetEnvoie[Idx].TI_NUMTIERSPATIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONPATIENT))
                        ObjetEnvoie[Idx].TI_DENOMINATIONPATIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSMEDECIN))
                        ObjetEnvoie[Idx].TI_NUMTIERSMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONMEDECIN))
                        ObjetEnvoie[Idx].TI_DENOMINATIONMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCliconsultations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebConsultation.URL_AJOUTER_CONSULTATION, Tokken).ToList();
                    if ((clsCliconsultations == null) || (clsCliconsultations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCliconsultation.clsObjetRetour = clsObjetRetour;
                        clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCliconsultation.clsObjetRetour = clsObjetRetour;
                    clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + ex.Message);
            }
            return Json(clsCliconsultations, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListeConsultation(List<HT_Stock.BOJ.clsCliconsultation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCliconsultation clsCliconsultation = new HT_Stock.BOJ.clsCliconsultation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCliconsultation ObjetRetour = new HT_Stock.BOJ.clsCliconsultation(); //Conteneur de la réponse de l'appel du service web
            clsCliconsultation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCliconsultation> clsCliconsultations = new List<HT_Stock.BOJ.clsCliconsultation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSPATIENT))
                        ObjetEnvoie[Idx].TI_NUMTIERSPATIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONPATIENT))
                        ObjetEnvoie[Idx].TI_DENOMINATIONPATIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSMEDECIN))
                        ObjetEnvoie[Idx].TI_NUMTIERSMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONMEDECIN))
                        ObjetEnvoie[Idx].TI_DENOMINATIONMEDECIN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_NUMERODOSSIER))
                        ObjetEnvoie[Idx].CO_NUMERODOSSIER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION1))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION1 = "";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCliconsultations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebConsultation.URL_LISTE_CONSULTATION, Tokken).ToList();
                    if ((clsCliconsultations == null) || (clsCliconsultations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCliconsultation.clsObjetRetour = clsObjetRetour;
                        clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCliconsultation.clsObjetRetour = clsObjetRetour;
                    clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + ex.Message);
            }
            return Json(clsCliconsultations, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult SuppressionConsultation(List<HT_Stock.BOJ.clsCliconsultation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCliconsultation clsCliconsultation = new HT_Stock.BOJ.clsCliconsultation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCliconsultation ObjetRetour = new HT_Stock.BOJ.clsCliconsultation(); //Conteneur de la réponse de l'appel du service web
            clsCliconsultation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCliconsultation> clsCliconsultations = new List<HT_Stock.BOJ.clsCliconsultation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCliconsultations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebConsultation.URL_DELETE_CONSULTATION, Tokken).ToList();
                    if ((clsCliconsultations == null) || (clsCliconsultations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCliconsultation.clsObjetRetour = clsObjetRetour;
                        clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCliconsultation.clsObjetRetour = clsObjetRetour;
                    clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + ex.Message);
            }
            return Json(clsCliconsultations, JsonRequestBehavior.AllowGet);
        }

        //BLOC MODIFICATION
        public JsonResult ModificationConsultation(List<HT_Stock.BOJ.clsCliconsultation> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCliconsultation clsCliconsultation = new HT_Stock.BOJ.clsCliconsultation();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCliconsultation ObjetRetour = new HT_Stock.BOJ.clsCliconsultation(); //Conteneur de la réponse de l'appel du service web
            clsCliconsultation.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCliconsultation> clsCliconsultations = new List<HT_Stock.BOJ.clsCliconsultation>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECONSULTATION1))
                        ObjetEnvoie[Idx].CO_CODECONSULTATION1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCliconsultations = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebConsultation.URL_MODIFICATION_CONSULTATION, Tokken).ToList();
                    if ((clsCliconsultations == null) || (clsCliconsultations.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCliconsultation.clsObjetRetour = clsObjetRetour;
                        clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCliconsultation.clsObjetRetour = clsObjetRetour;
                    clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCliconsultation.clsObjetRetour = clsObjetRetour;
                clsCliconsultations.Add(clsCliconsultation); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ConsultationController :" + ex.Message);
            }
            return Json(clsCliconsultations, JsonRequestBehavior.AllowGet);
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