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
    public class LesTiersController : Controller
    {
        public JsonResult ListeDesTiers(List<HT_Assurance.clsPhatiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsPhatiers clsPhatiers = new HT_Assurance.clsPhatiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsPhatiers ObjetRetour = new HT_Assurance.clsPhatiers(); //Conteneur de la réponse de l'appel du service web
            clsPhatiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsPhatiers> clsPhatierss = new List<HT_Assurance.clsPhatiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSPRINCIPAL))
                        ObjetEnvoie[Idx].TI_IDTIERSPRINCIPAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SX_CODESEXE))
                        ObjetEnvoie[Idx].SX_CODESEXE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE))
                        ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATENAISSANCE))
                        ObjetEnvoie[Idx].TI_DATENAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SIEGE))
                        ObjetEnvoie[Idx].TI_SIEGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DESCRIPTIONTIERS))
                        ObjetEnvoie[Idx].TI_DESCRIPTIONTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ADRESSEPOSTALE))
                        ObjetEnvoie[Idx].TI_ADRESSEPOSTALE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ADRESSEGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].TI_ADRESSEGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TELEPHONE))
                        ObjetEnvoie[Idx].TI_TELEPHONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_FAX))
                        ObjetEnvoie[Idx].TI_FAX = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SITEWEB))
                        ObjetEnvoie[Idx].TI_SITEWEB = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_EMAIL))
                        ObjetEnvoie[Idx].TI_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_GERANT))
                        ObjetEnvoie[Idx].TI_GERANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_STATUT))
                        ObjetEnvoie[Idx].TI_STATUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE))
                        ObjetEnvoie[Idx].TI_DATESAISIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATEDEPART))
                        ObjetEnvoie[Idx].TI_DATEDEPART = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_CODEACTIVITE))
                        ObjetEnvoie[Idx].AC_CODEACTIVITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ASDI))
                        ObjetEnvoie[Idx].TI_ASDI = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TVA))
                        ObjetEnvoie[Idx].TI_TVA = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_STATUTDOUTEUX))
                        ObjetEnvoie[Idx].TI_STATUTDOUTEUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_PLAFONDCREDIT))
                        ObjetEnvoie[Idx].TI_PLAFONDCREDIT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMCPTECONTIBUABLE))
                        ObjetEnvoie[Idx].TI_NUMCPTECONTIBUABLE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TAUXREMISE))
                        ObjetEnvoie[Idx].TI_TAUXREMISE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CU_CODECASUTILISATION))
                        ObjetEnvoie[Idx].CU_CODECASUTILISATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMEROAGREMENT))
                        ObjetEnvoie[Idx].TI_NUMEROAGREMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TAUXDECLARATION))
                        ObjetEnvoie[Idx].TI_TAUXDECLARATION = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETYPETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_MANDATAIRE))
                        ObjetEnvoie[Idx].TI_MANDATAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_USAGER))
                        ObjetEnvoie[Idx].TI_USAGER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IN_CODEINGREDIENT))
                        ObjetEnvoie[Idx].IN_CODEINGREDIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE1))
                        ObjetEnvoie[Idx].TI_DATESAISIE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE2))
                        ObjetEnvoie[Idx].TI_DATESAISIE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODEPRODUIT))
                        ObjetEnvoie[Idx].AP_CODEPRODUIT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEECRAN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].QU_CODEQUARTIER))
                        ObjetEnvoie[Idx].QU_CODEQUARTIER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ESCOMPTE))
                        ObjetEnvoie[Idx].TI_ESCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].TI_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONE))
                        ObjetEnvoie[Idx].ZN_CODEZONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_PHOTO))
                        ObjetEnvoie[Idx].TI_PHOTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SIGNATURE))
                        ObjetEnvoie[Idx].TI_SIGNATURE = "";
                            if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMEROAXA))
                        ObjetEnvoie[Idx].TI_NUMEROAXA = "";
                }
            
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_SELECT_LES_TIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionDesTiers(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
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
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_DELETE_LES_TIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DepartDesTiers(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
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
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_DEPART_TIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AjoutDesTiers(List<HT_Assurance.clsPhatiers> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsPhatiers clsPhatiers = new HT_Assurance.clsPhatiers();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsPhatiers ObjetRetour = new HT_Assurance.clsPhatiers(); //Conteneur de la réponse de l'appel du service web
            clsPhatiers.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsPhatiers> clsPhatierss = new List<HT_Assurance.clsPhatiers>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSPRINCIPAL))
                        ObjetEnvoie[Idx].TI_IDTIERSPRINCIPAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SX_CODESEXE))
                        ObjetEnvoie[Idx].SX_CODESEXE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE))
                        ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATENAISSANCE))
                        ObjetEnvoie[Idx].TI_DATENAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SIEGE))
                        ObjetEnvoie[Idx].TI_SIEGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DESCRIPTIONTIERS))
                        ObjetEnvoie[Idx].TI_DESCRIPTIONTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ADRESSEPOSTALE))
                        ObjetEnvoie[Idx].TI_ADRESSEPOSTALE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ADRESSEGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].TI_ADRESSEGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TELEPHONE))
                        ObjetEnvoie[Idx].TI_TELEPHONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_FAX))
                        ObjetEnvoie[Idx].TI_FAX = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SITEWEB))
                        ObjetEnvoie[Idx].TI_SITEWEB = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_EMAIL))
                        ObjetEnvoie[Idx].TI_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_GERANT))
                        ObjetEnvoie[Idx].TI_GERANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_STATUT))
                        ObjetEnvoie[Idx].TI_STATUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE))
                        ObjetEnvoie[Idx].TI_DATESAISIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATEDEPART))
                        ObjetEnvoie[Idx].TI_DATEDEPART = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_CODEACTIVITE))
                        ObjetEnvoie[Idx].AC_CODEACTIVITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ASDI))
                        ObjetEnvoie[Idx].TI_ASDI = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TVA))
                        ObjetEnvoie[Idx].TI_TVA = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_STATUTDOUTEUX))
                        ObjetEnvoie[Idx].TI_STATUTDOUTEUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_PLAFONDCREDIT))
                        ObjetEnvoie[Idx].TI_PLAFONDCREDIT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMCPTECONTIBUABLE))
                        ObjetEnvoie[Idx].TI_NUMCPTECONTIBUABLE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TAUXREMISE))
                        ObjetEnvoie[Idx].TI_TAUXREMISE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CU_CODECASUTILISATION))
                        ObjetEnvoie[Idx].CU_CODECASUTILISATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMEROAGREMENT))
                        ObjetEnvoie[Idx].TI_NUMEROAGREMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_TAUXDECLARATION))
                        ObjetEnvoie[Idx].TI_TAUXDECLARATION = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETYPETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_MANDATAIRE))
                        ObjetEnvoie[Idx].TI_MANDATAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_USAGER))
                        ObjetEnvoie[Idx].TI_USAGER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IN_CODEINGREDIENT))
                        ObjetEnvoie[Idx].IN_CODEINGREDIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE1))
                        ObjetEnvoie[Idx].TI_DATESAISIE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DATESAISIE2))
                        ObjetEnvoie[Idx].TI_DATESAISIE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODEPRODUIT))
                        ObjetEnvoie[Idx].AP_CODEPRODUIT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEECRAN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].QU_CODEQUARTIER))
                        ObjetEnvoie[Idx].QU_CODEQUARTIER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_ESCOMPTE))
                        ObjetEnvoie[Idx].TI_ESCOMPTE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].TI_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONE))
                        ObjetEnvoie[Idx].ZN_CODEZONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_PHOTO))
                        ObjetEnvoie[Idx].TI_PHOTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_SIGNATURE))
                        ObjetEnvoie[Idx].TI_SIGNATURE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SP_CODESPECIALITE))
                        ObjetEnvoie[Idx].SP_CODESPECIALITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RE_CODEREGIMEIMPOSITION))
                        ObjetEnvoie[Idx].RE_CODEREGIMEIMPOSITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMEROAXA))
                        ObjetEnvoie[Idx].TI_NUMEROAXA = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_AJOUT_DES_TIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RechercherLeTiers(List<HT_Stock.BOJ.clsPhatiers> ObjetEnvoie)
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
                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SC_CODESECTION))
                        ObjetEnvoie[Idx].SC_CODESECTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_CLTVENTCAISSE))
                        ObjetEnvoie[Idx].TI_CLTVENTCAISSE = "";

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhatierss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_SELECT_LE_TIERS, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhatiers.clsObjetRetour = clsObjetRetour;
                clsPhatierss.Add(clsPhatiers); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsPhatierss, JsonRequestBehavior.AllowGet);
        }

        //PROSPECT
         public JsonResult AjoutDesProspect(List<HT_Stock.BOJ.clsOrgProspects> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOrgProspects clsOrgProspects = new HT_Stock.BOJ.clsOrgProspects();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOrgProspects ObjetRetour = new HT_Stock.BOJ.clsOrgProspects(); //Conteneur de la réponse de l'appel du service web
            clsOrgProspects.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOrgProspects> clsOrgProspectss = new List<HT_Stock.BOJ.clsOrgProspects>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_IDTIERS))
                        ObjetEnvoie[Idx].PR_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_IDTIERSPRINCIPAL))
                        ObjetEnvoie[Idx].PR_IDTIERSPRINCIPAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SX_CODESEXE))
                        ObjetEnvoie[Idx].SX_CODESEXE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE))
                        ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMTIERS))
                        ObjetEnvoie[Idx].PR_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATENAISSANCE))
                        ObjetEnvoie[Idx].PR_DATENAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DENOMINATION))
                        ObjetEnvoie[Idx].PR_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SIEGE))
                        ObjetEnvoie[Idx].PR_SIEGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DESCRIPTIONTIERS))
                        ObjetEnvoie[Idx].PR_DESCRIPTIONTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ADRESSEPOSTALE))
                        ObjetEnvoie[Idx].PR_ADRESSEPOSTALE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ADRESSEGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].PR_ADRESSEGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TELEPHONE))
                        ObjetEnvoie[Idx].PR_TELEPHONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_FAX))
                        ObjetEnvoie[Idx].PR_FAX = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SITEWEB))
                        ObjetEnvoie[Idx].PR_SITEWEB = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_EMAIL))
                        ObjetEnvoie[Idx].PR_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_GERANT))
                        ObjetEnvoie[Idx].PR_GERANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_STATUT))
                        ObjetEnvoie[Idx].PR_STATUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE))
                        ObjetEnvoie[Idx].PR_DATESAISIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATEDEPART))
                        ObjetEnvoie[Idx].PR_DATEDEPART = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_CODEACTIVITE))
                        ObjetEnvoie[Idx].AC_CODEACTIVITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ASDI))
                        ObjetEnvoie[Idx].PR_ASDI = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TVA))
                        ObjetEnvoie[Idx].PR_TVA = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_STATUTDOUTEUX))
                        ObjetEnvoie[Idx].PR_STATUTDOUTEUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_PLAFONDCREDIT))
                        ObjetEnvoie[Idx].PR_PLAFONDCREDIT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMCPTECONTIBUABLE))
                        ObjetEnvoie[Idx].PR_NUMCPTECONTIBUABLE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TAUXREMISE))
                        ObjetEnvoie[Idx].PR_TAUXREMISE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CU_CODECASUTILISATION))
                        ObjetEnvoie[Idx].CU_CODECASUTILISATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMEROAGREMENT))
                        ObjetEnvoie[Idx].PR_NUMEROAGREMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TAUXDECLARATION))
                        ObjetEnvoie[Idx].PR_TAUXDECLARATION = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETYPETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_MANDATAIRE))
                        ObjetEnvoie[Idx].PR_MANDATAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_USAGER))
                        ObjetEnvoie[Idx].PR_USAGER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IN_CODEINGREDIENT))
                        ObjetEnvoie[Idx].IN_CODEINGREDIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    /*if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";*/
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE1))
                        ObjetEnvoie[Idx].PR_DATESAISIE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE2))
                        ObjetEnvoie[Idx].PR_DATESAISIE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODEPRODUIT))
                        ObjetEnvoie[Idx].AP_CODEPRODUIT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEECRAN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                   /* if (string.IsNullOrEmpty(ObjetEnvoie[Idx].QU_CODEQUARTIER))
                        ObjetEnvoie[Idx].QU_CODEQUARTIER = "";*/
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ESCOMPTE))
                        ObjetEnvoie[Idx].PR_ESCOMPTE = "N";
                    /*if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].PR_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZN_CODEZONE))
                        ObjetEnvoie[Idx].ZN_CODEZONE = "";*/
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_PHOTO))
                        ObjetEnvoie[Idx].PR_PHOTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SIGNATURE))
                        ObjetEnvoie[Idx].PR_SIGNATURE = "";
                   /* if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SP_CODESPECIALITE))
                        ObjetEnvoie[Idx].SP_CODESPECIALITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RE_CODEREGIMEIMPOSITION))
                        ObjetEnvoie[Idx].RE_CODEREGIMEIMPOSITION = "";*/
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOrgProspectss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_AJOUT_DES_PROSPECT, Tokken).ToList();
                    if ((clsOrgProspectss == null) || (clsOrgProspectss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOrgProspects.clsObjetRetour = clsObjetRetour;
                        clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOrgProspects.clsObjetRetour = clsObjetRetour;
                    clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsOrgProspectss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeDesProspect(List<HT_Stock.BOJ.clsOrgProspects> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOrgProspects clsOrgProspects = new HT_Stock.BOJ.clsOrgProspects();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOrgProspects ObjetRetour = new HT_Stock.BOJ.clsOrgProspects(); //Conteneur de la réponse de l'appel du service web
            clsOrgProspects.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOrgProspects> clsOrgProspectss = new List<HT_Stock.BOJ.clsOrgProspects>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_IDTIERS))
                        ObjetEnvoie[Idx].PR_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].VL_CODEVILLE))
                        ObjetEnvoie[Idx].VL_CODEVILLE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_IDTIERSPRINCIPAL))
                        ObjetEnvoie[Idx].PR_IDTIERSPRINCIPAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SX_CODESEXE))
                        ObjetEnvoie[Idx].SX_CODESEXE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE))
                        ObjetEnvoie[Idx].FM_CODEFORMEJURIDIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMTIERS))
                        ObjetEnvoie[Idx].PR_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATENAISSANCE))
                        ObjetEnvoie[Idx].PR_DATENAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DENOMINATION))
                        ObjetEnvoie[Idx].PR_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SIEGE))
                        ObjetEnvoie[Idx].PR_SIEGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DESCRIPTIONTIERS))
                        ObjetEnvoie[Idx].PR_DESCRIPTIONTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ADRESSEPOSTALE))
                        ObjetEnvoie[Idx].PR_ADRESSEPOSTALE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ADRESSEGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].PR_ADRESSEGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TELEPHONE))
                        ObjetEnvoie[Idx].PR_TELEPHONE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_FAX))
                        ObjetEnvoie[Idx].PR_FAX = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SITEWEB))
                        ObjetEnvoie[Idx].PR_SITEWEB = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_EMAIL))
                        ObjetEnvoie[Idx].PR_EMAIL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_GERANT))
                        ObjetEnvoie[Idx].PR_GERANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_STATUT))
                        ObjetEnvoie[Idx].PR_STATUT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE))
                        ObjetEnvoie[Idx].PR_DATESAISIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATEDEPART))
                        ObjetEnvoie[Idx].PR_DATEDEPART = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_CODEACTIVITE))
                        ObjetEnvoie[Idx].AC_CODEACTIVITE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ASDI))
                        ObjetEnvoie[Idx].PR_ASDI = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TVA))
                        ObjetEnvoie[Idx].PR_TVA = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_STATUTDOUTEUX))
                        ObjetEnvoie[Idx].PR_STATUTDOUTEUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_PLAFONDCREDIT))
                        ObjetEnvoie[Idx].PR_PLAFONDCREDIT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMCPTECONTIBUABLE))
                        ObjetEnvoie[Idx].PR_NUMCPTECONTIBUABLE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TAUXREMISE))
                        ObjetEnvoie[Idx].PR_TAUXREMISE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CU_CODECASUTILISATION))
                        ObjetEnvoie[Idx].CU_CODECASUTILISATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMEROAGREMENT))
                        ObjetEnvoie[Idx].PR_NUMEROAGREMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_TAUXDECLARATION))
                        ObjetEnvoie[Idx].PR_TAUXDECLARATION = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GP_CODEGROUPE))
                        ObjetEnvoie[Idx].GP_CODEGROUPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETYPETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_MANDATAIRE))
                        ObjetEnvoie[Idx].PR_MANDATAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_USAGER))
                        ObjetEnvoie[Idx].PR_USAGER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IN_CODEINGREDIENT))
                        ObjetEnvoie[Idx].IN_CODEINGREDIENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TP_CODETYPETIERS))
                        ObjetEnvoie[Idx].TP_CODETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS))
                        ObjetEnvoie[Idx].TC_CODECOMPTETYPETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NT_CODENATURETIERS))
                        ObjetEnvoie[Idx].NT_CODENATURETIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE1))
                        ObjetEnvoie[Idx].PR_DATESAISIE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DATESAISIE2))
                        ObjetEnvoie[Idx].PR_DATESAISIE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODEPRODUIT))
                        ObjetEnvoie[Idx].AP_CODEPRODUIT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEECRAN = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_ESCOMPTE))
                        ObjetEnvoie[Idx].PR_ESCOMPTE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_PHOTO))
                        ObjetEnvoie[Idx].PR_PHOTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_SIGNATURE))
                        ObjetEnvoie[Idx].PR_SIGNATURE = "";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOrgProspectss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_SELECT_LES_PROSPECT, Tokken).ToList();
                    if ((clsOrgProspectss == null) || (clsOrgProspectss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOrgProspects.clsObjetRetour = clsObjetRetour;
                        clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOrgProspects.clsObjetRetour = clsObjetRetour;
                    clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsOrgProspectss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SuppressionDesProspect(List<HT_Stock.BOJ.clsOrgProspects> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOrgProspects clsOrgProspects = new HT_Stock.BOJ.clsOrgProspects();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOrgProspects ObjetRetour = new HT_Stock.BOJ.clsOrgProspects(); //Conteneur de la réponse de l'appel du service web
            clsOrgProspects.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOrgProspects> clsOrgProspectss = new List<HT_Stock.BOJ.clsOrgProspects>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOrgProspectss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_DELETE_LES_PROSPECT, Tokken).ToList();
                    if ((clsOrgProspectss == null) || (clsOrgProspectss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOrgProspects.clsObjetRetour = clsObjetRetour;
                        clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOrgProspects.clsObjetRetour = clsObjetRetour;
                    clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsOrgProspectss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult RechercherLeProspect(List<HT_Stock.BOJ.clsOrgProspects> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsOrgProspects clsOrgProspects = new HT_Stock.BOJ.clsOrgProspects();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsOrgProspects ObjetRetour = new HT_Stock.BOJ.clsOrgProspects(); //Conteneur de la réponse de l'appel du service web
            clsOrgProspects.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsOrgProspects> clsOrgProspectss = new List<HT_Stock.BOJ.clsOrgProspects>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_NUMTIERS))
                        ObjetEnvoie[Idx].PR_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_DENOMINATION))
                        ObjetEnvoie[Idx].PR_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SC_CODESECTION))
                        ObjetEnvoie[Idx].SC_CODESECTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PR_CLTVENTCAISSE))
                        ObjetEnvoie[Idx].PR_CLTVENTCAISSE = "";

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsOrgProspectss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebLesTiers.URL_SELECT_LE_PROSPECT, Tokken).ToList();
                    if ((clsOrgProspectss == null) || (clsOrgProspectss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsOrgProspects.clsObjetRetour = clsObjetRetour;
                        clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsOrgProspects.clsObjetRetour = clsObjetRetour;
                    clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsOrgProspects.clsObjetRetour = clsObjetRetour;
                clsOrgProspectss.Add(clsOrgProspects); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error LesTiersController :" + ex.Message);
            }
            return Json(clsOrgProspectss, JsonRequestBehavior.AllowGet);
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