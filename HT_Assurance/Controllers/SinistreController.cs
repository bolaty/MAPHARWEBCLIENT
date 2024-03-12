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
    public class SinistreController : Controller
    {
        //BLOC AJOUT SINISTRE
        public JsonResult AjoutSinistre(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESAISIE))
                        ObjetEnvoie[Idx].SI_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESINISTRE))
                        ObjetEnvoie[Idx].SI_DATESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_HEURESINISTRE))
                        ObjetEnvoie[Idx].SI_HEURESINISTRE = "00:00";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE))
                        ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE))
                        ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE))
                        ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS))
                        ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MONTANTPREJUDICE))
                        ObjetEnvoie[Idx].SI_MONTANTPREJUDICE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EP_CODEEXPERTNOMME))
                        ObjetEnvoie[Idx].EP_CODEEXPERTNOMME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE))
                        ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE = "01-01-1900";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_UNITE))
                        ObjetEnvoie[Idx].SI_UNITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_AUTRES))
                        ObjetEnvoie[Idx].SI_AUTRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMAGENT))
                        ObjetEnvoie[Idx].SI_NOMAGENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_REPARATEUR))
                        ObjetEnvoie[Idx].SI_REPARATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_IMMATRICULATIONVEHICULE))
                        ObjetEnvoie[Idx].SI_IMMATRICULATIONVEHICULE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MARQUEVEHICULE))
                        ObjetEnvoie[Idx].SI_MARQUEVEHICULE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMETCONTACTSVICTIMES))
                        ObjetEnvoie[Idx].SI_NOMETCONTACTSVICTIMES = "";


                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_MISE_A_JOUR_SINISTRE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

        //BLOC MODIFICATION SINISTRE
        public JsonResult ModifSinistre(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESAISIE))
                        ObjetEnvoie[Idx].SI_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESINISTRE))
                        ObjetEnvoie[Idx].SI_DATESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_HEURESINISTRE))
                        ObjetEnvoie[Idx].SI_HEURESINISTRE = "00:00";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE))
                        ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE))
                        ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE))
                        ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS))
                        ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MONTANTPREJUDICE))
                        ObjetEnvoie[Idx].SI_MONTANTPREJUDICE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EP_CODEEXPERTNOMME))
                        ObjetEnvoie[Idx].EP_CODEEXPERTNOMME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE))
                        ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE = "01-01-1900";


                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_UNITE))
                        ObjetEnvoie[Idx].SI_UNITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_AUTRES))
                        ObjetEnvoie[Idx].SI_AUTRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMAGENT))
                        ObjetEnvoie[Idx].SI_NOMAGENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_REPARATEUR))
                        ObjetEnvoie[Idx].SI_REPARATEUR = ""; 
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_IMMATRICULATIONVEHICULE))
                         ObjetEnvoie[Idx].SI_IMMATRICULATIONVEHICULE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMETCONTACTSVICTIMES))
                        ObjetEnvoie[Idx].SI_NOMETCONTACTSVICTIMES = ""; 
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MARQUEVEHICULE))
                        ObjetEnvoie[Idx].SI_MARQUEVEHICULE = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_MISE_A_JOUR2_SINISTRE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

        // BLOC LISTE SINISTRE
        public JsonResult ListeSinistre(List<HT_Assurance.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtsinistre clsCtsinistre = new HT_Assurance.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtsinistre ObjetRetour = new HT_Assurance.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtsinistre> clsCtsinistres = new List<HT_Assurance.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "";
                    ////fin traitement des criteres de recherche non obligatoire

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
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_SELECT_SINISTRE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }


        //BLOC ANNULATION TRANSMISSION ET VALIDATION
        public JsonResult ANNULATIONTRANSMISSION(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESAISIE))
                        ObjetEnvoie[Idx].SI_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESINISTRE))
                        ObjetEnvoie[Idx].SI_DATESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_HEURESINISTRE))
                        ObjetEnvoie[Idx].SI_HEURESINISTRE = "00:00";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE))
                        ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE))
                        ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE))
                        ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS))
                        ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MONTANTPREJUDICE.ToString()))
                        ObjetEnvoie[Idx].SI_MONTANTPREJUDICE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EP_CODEEXPERTNOMME))
                        ObjetEnvoie[Idx].EP_CODEEXPERTNOMME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE))
                        ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_MODIF_TRANSMISSION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ANNULATIONVALIDATION(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESAISIE))
                        ObjetEnvoie[Idx].SI_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESINISTRE))
                        ObjetEnvoie[Idx].SI_DATESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_HEURESINISTRE))
                        ObjetEnvoie[Idx].SI_HEURESINISTRE = "00:00";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE))
                        ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE))
                        ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE))
                        ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS))
                        ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MONTANTPREJUDICE.ToString()))
                        ObjetEnvoie[Idx].SI_MONTANTPREJUDICE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EP_CODEEXPERTNOMME))
                        ObjetEnvoie[Idx].EP_CODEEXPERTNOMME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE))
                        ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_MODIF_VALIDATION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MONTANTVALIDER(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESAISIE))
                        ObjetEnvoie[Idx].SI_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESINISTRE))
                        ObjetEnvoie[Idx].SI_DATESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_HEURESINISTRE))
                        ObjetEnvoie[Idx].SI_HEURESINISTRE = "00:00";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE))
                        ObjetEnvoie[Idx].SI_NOMPRENOMSCONDUCTEURSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE))
                        ObjetEnvoie[Idx].SI_ADRESSEGEOGRPHIQUESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DESCRIPTIONSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATETRANSMISSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATEVALIDATIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE))
                        ObjetEnvoie[Idx].SI_DATESUSPENSIONSINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE))
                        ObjetEnvoie[Idx].SI_DATECLOTURESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS))
                        ObjetEnvoie[Idx].SI_DOCUMENTTRANSMIS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_MONTANTPREJUDICE.ToString()))
                        ObjetEnvoie[Idx].SI_MONTANTPREJUDICE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EP_CODEEXPERTNOMME))
                        ObjetEnvoie[Idx].EP_CODEEXPERTNOMME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE))
                        ObjetEnvoie[Idx].SI_DATEEXPERTNOMMESINISTRE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_MODIF_MONTANTVALIDE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }


        // BLOC LISTE NAT SINISTRE
        public JsonResult ListeNatSinistre(List<HT_Stock.BOJ.clsCtparnaturesinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtparnaturesinistre clsCtparnaturesinistre = new HT_Stock.BOJ.clsCtparnaturesinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtparnaturesinistre ObjetRetour = new HT_Stock.BOJ.clsCtparnaturesinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtparnaturesinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtparnaturesinistre> clsCtparnaturesinistres = new List<HT_Stock.BOJ.clsCtparnaturesinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    //if(string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                    //    ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                    //    ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                    //    ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                    //    ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                    //    ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                    //    ObjetEnvoie[Idx].TYPEOPERATION = "";
                    ////fin traitement des criteres de recherche non obligatoire

                    ////debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    ////fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtparnaturesinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre.URL_SELECT_SINISTRE1, Tokken).ToList();
                    if ((clsCtparnaturesinistres == null) || (clsCtparnaturesinistres.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtparnaturesinistre.clsObjetRetour = clsObjetRetour;
                        clsCtparnaturesinistres.Add(clsCtparnaturesinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtparnaturesinistre.clsObjetRetour = clsObjetRetour;
                    clsCtparnaturesinistres.Add(clsCtparnaturesinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtparnaturesinistre.clsObjetRetour = clsObjetRetour;
                clsCtparnaturesinistres.Add(clsCtparnaturesinistre);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtparnaturesinistre.clsObjetRetour = clsObjetRetour;
                clsCtparnaturesinistres.Add(clsCtparnaturesinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtparnaturesinistres, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION SINISTRE
        public JsonResult SuppressionSinistre(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_DELETE_SINISTRE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

        //BLOC ACTIONS SUR LES SINISTRES
        public JsonResult ActionsSurSinistres(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre1.URL_ACTIONS_SUR_LES_SINISTRES, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }






        //BLOC AJOUT SUIVI
        public JsonResult AjoutSuivi(List<HT_Stock.BOJ.clsCtsinistresuivie> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistresuivie clsCtsinistresuivie = new HT_Stock.BOJ.clsCtsinistresuivie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistresuivie ObjetRetour = new HT_Stock.BOJ.clsCtsinistresuivie(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistresuivie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistresuivie> clsCtsinistresuivies = new List<HT_Stock.BOJ.clsCtsinistresuivie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_CODESINISTRE))
                        ObjetEnvoie[Idx].SI_CODESINISTRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SD_INDEXSUIVIE))
                        ObjetEnvoie[Idx].SD_INDEXSUIVIE = "";
                    //debut traitement des criteres de recherche non obligatoire


                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistresuivies = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre2.URL_MISE_A_JOUR_SINISTRE, Tokken).ToList();
                    if ((clsCtsinistresuivies == null) || (clsCtsinistresuivies.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                        clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                    clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistresuivies, JsonRequestBehavior.AllowGet);
        }

        //BLOC MODIFICATION SUIVI
        public JsonResult ModifSsuivi(List<HT_Stock.BOJ.clsCtsinistresuivie> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistresuivie clsCtsinistresuivie = new HT_Stock.BOJ.clsCtsinistresuivie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistresuivie ObjetRetour = new HT_Stock.BOJ.clsCtsinistresuivie(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistresuivie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistresuivie> clsCtsinistresuivies = new List<HT_Stock.BOJ.clsCtsinistresuivie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsCtsinistresuivies = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre2.URL_MISE_A_JOUR2_SINISTRE, Tokken).ToList();
                    if ((clsCtsinistresuivies == null) || (clsCtsinistresuivies.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                        clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                    clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistresuivies, JsonRequestBehavior.AllowGet);
        }

        // BLOC LISTE SUIVI
        public JsonResult ListeSuivi(List<HT_Stock.BOJ.clsCtsinistresuivie> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistresuivie clsCtsinistresuivie = new HT_Stock.BOJ.clsCtsinistresuivie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistresuivie ObjetRetour = new HT_Stock.BOJ.clsCtsinistresuivie(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistresuivie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistresuivie> clsCtsinistresuivies = new List<HT_Stock.BOJ.clsCtsinistresuivie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SD_DESCRIPTIONEVENEMENT))
                        ObjetEnvoie[Idx].SD_DESCRIPTIONEVENEMENT = "";
                    //fin traitement des criteres de recherche non obligatoire

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
                    clsCtsinistresuivies = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre2.URL_SELECT_SINISTRE, Tokken).ToList();
                    if ((clsCtsinistresuivies == null) || (clsCtsinistresuivies.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                        clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                    clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistresuivies, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION SUIVI
        public JsonResult SuppressionSuivi(List<HT_Stock.BOJ.clsCtsinistresuivie> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistresuivie clsCtsinistresuivie = new HT_Stock.BOJ.clsCtsinistresuivie();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistresuivie ObjetRetour = new HT_Stock.BOJ.clsCtsinistresuivie(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistresuivie.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistresuivie> clsCtsinistresuivies = new List<HT_Stock.BOJ.clsCtsinistresuivie>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    clsCtsinistresuivies = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistre2.URL_DELETE_SINISTRE, Tokken).ToList();
                    if ((clsCtsinistresuivies == null) || (clsCtsinistresuivies.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                        clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                    clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistresuivie.clsObjetRetour = clsObjetRetour;
                clsCtsinistresuivies.Add(clsCtsinistresuivie); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistresuivies, JsonRequestBehavior.AllowGet);
        }

        //BLOC CONSULTATION DES REGLEMENTS
        public JsonResult ListeConsultationReglement(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MS_NUMPIECE))
                        ObjetEnvoie[Idx].MS_NUMPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "0";
                    ////fin traitement des criteres de recherche non obligatoire

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
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceConsultationReglement.URL_SELECT_CONSULTATION_DES_REGLEMENTS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEE_RELEVE_CLIENT = clsCtsinistres;
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }

    
        public JsonResult ListeReleveCommission(List<HT_Stock.BOJ.clsCtsinistre> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistre clsCtsinistre = new HT_Stock.BOJ.clsCtsinistre();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistre ObjetRetour = new HT_Stock.BOJ.clsCtsinistre(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistre.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistre> clsCtsinistres = new List<HT_Stock.BOJ.clsCtsinistre>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MS_NUMPIECE))
                        ObjetEnvoie[Idx].MS_NUMPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NS_CODENATURESINISTRE))
                        ObjetEnvoie[Idx].NS_CODENATURESINISTRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSINISTRE))
                        ObjetEnvoie[Idx].SI_NUMSINISTRE = "";
                    ////fin traitement des criteres de recherche non obligatoire

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
                    clsCtsinistres = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceReleveCommission.URL_SELECT_RELEVE_COMMISSION, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistre.clsObjetRetour = clsObjetRetour;
                clsCtsinistres.Add(clsCtsinistre); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistres, JsonRequestBehavior.AllowGet);
        }






        //BLOC AJOUT PHOTO
        public JsonResult AjoutPhotoSinistre(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrephoto clsCtsinistrephoto = new HT_Stock.BOJ.clsCtsinistrephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrephoto> clsCtsinistrephotos = new List<HT_Stock.BOJ.clsCtsinistrephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSEQUENCEPHOTO))
                        ObjetEnvoie[Idx].SI_NUMSEQUENCEPHOTO = "";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistrePhoto.URL_INSERT_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrephotos == null) || (clsCtsinistrephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistrephotos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListePhotoSinistre(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrephoto clsCtsinistrephoto = new HT_Stock.BOJ.clsCtsinistrephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrephoto> clsCtsinistrephotos = new List<HT_Stock.BOJ.clsCtsinistrephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "0";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistrePhoto.URL_LIST_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrephotos == null) || (clsCtsinistrephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistrephotos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionPhotoSinistre(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrephoto clsCtsinistrephoto = new HT_Stock.BOJ.clsCtsinistrephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrephoto> clsCtsinistrephotos = new List<HT_Stock.BOJ.clsCtsinistrephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SI_NUMSEQUENCEPHOTO))
                        ObjetEnvoie[Idx].SI_NUMSEQUENCEPHOTO = "";
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebSinistrePhoto.URL_DELETE_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrephotos == null) || (clsCtsinistrephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SinistreController :" + ex.Message);
            }
            return Json(clsCtsinistrephotos, JsonRequestBehavior.AllowGet);
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