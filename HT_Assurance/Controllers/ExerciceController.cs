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
    public class ExerciceController : Controller
    {
        

        //BLOC LISTE
        public JsonResult AjoutExercice(List<HT_Assurance.clsExercice> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsExercice clsExercice = new HT_Assurance.clsExercice();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsExercice ObjetRetour = new HT_Assurance.clsExercice(); //Conteneur de la réponse de l'appel du service web
            clsExercice.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsExercice> clsExercices = new List<HT_Assurance.clsExercice>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_ETATEXERCICE))
                        ObjetEnvoie[Idx].EX_ETATEXERCICE = "O";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DESCEXERCICE))
                        ObjetEnvoie[Idx].EX_DESCEXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEFIN))
                        ObjetEnvoie[Idx].EX_DATEFIN = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEDEBUT))
                        ObjetEnvoie[Idx].EX_DATEDEBUT = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL))
                        ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_EXERCICE))
                        ObjetEnvoie[Idx].EX_EXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                        //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                        //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                        //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsExercices = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebExercice.URL_INSERT_EXERCICE, Tokken).ToList();
                    if ((clsExercices == null) || (clsExercices.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsExercice.clsObjetRetour = clsObjetRetour;
                        clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsExercice.clsObjetRetour = clsObjetRetour;
                    clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + ex.Message);
            }
            return Json(clsExercices, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateExercice(List<HT_Assurance.clsExercice> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsExercice clsExercice = new HT_Assurance.clsExercice();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsExercice ObjetRetour = new HT_Assurance.clsExercice(); //Conteneur de la réponse de l'appel du service web
            clsExercice.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsExercice> clsExercices = new List<HT_Assurance.clsExercice>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_ETATEXERCICE))
                        ObjetEnvoie[Idx].EX_ETATEXERCICE = "O";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DESCEXERCICE))
                        ObjetEnvoie[Idx].EX_DESCEXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEFIN))
                        ObjetEnvoie[Idx].EX_DATEFIN = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEDEBUT))
                        ObjetEnvoie[Idx].EX_DATEDEBUT = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL))
                        ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_EXERCICE))
                        ObjetEnvoie[Idx].EX_EXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsExercices = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebExercice.URL_UPDATE_EXERCICE, Tokken).ToList();
                    if ((clsExercices == null) || (clsExercices.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsExercice.clsObjetRetour = clsObjetRetour;
                        clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsExercice.clsObjetRetour = clsObjetRetour;
                    clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + ex.Message);
            }
            return Json(clsExercices, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SELECTExercice(List<HT_Assurance.clsExercice> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsExercice clsExercice = new HT_Assurance.clsExercice();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsExercice ObjetRetour = new HT_Assurance.clsExercice(); //Conteneur de la réponse de l'appel du service web
            clsExercice.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsExercice> clsExercices = new List<HT_Assurance.clsExercice>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_ETATEXERCICE))
                        ObjetEnvoie[Idx].EX_ETATEXERCICE = "O";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DESCEXERCICE))
                        ObjetEnvoie[Idx].EX_DESCEXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEFIN))
                        ObjetEnvoie[Idx].EX_DATEFIN = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEDEBUT))
                        ObjetEnvoie[Idx].EX_DATEDEBUT = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL))
                        ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_EXERCICE))
                        ObjetEnvoie[Idx].EX_EXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsExercices = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebExercice.URL_SELECT_EXERCICE, Tokken).ToList();
                    if ((clsExercices == null) || (clsExercices.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsExercice.clsObjetRetour = clsObjetRetour;
                        clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsExercice.clsObjetRetour = clsObjetRetour;
                    clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + ex.Message);
            }
            return Json(clsExercices, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DELETEExercice(List<HT_Stock.BOJ.clsExercice> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsExercice clsExercice = new HT_Stock.BOJ.clsExercice();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsExercice ObjetRetour = new HT_Stock.BOJ.clsExercice(); //Conteneur de la réponse de l'appel du service web
            clsExercice.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsExercice> clsExercices = new List<HT_Stock.BOJ.clsExercice>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                   /* if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_ETATEXERCICE))
                        ObjetEnvoie[Idx].EX_ETATEXERCICE = "O";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DESCEXERCICE))
                        ObjetEnvoie[Idx].EX_DESCEXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEFIN))
                        ObjetEnvoie[Idx].EX_DATEFIN = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEDEBUT))
                        ObjetEnvoie[Idx].EX_DATEDEBUT = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL))
                        ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_EXERCICE))
                        ObjetEnvoie[Idx].EX_EXERCICE = "01-01-1900";*/
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsExercices = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebExercice.URL_DELETE_EXERCICE, Tokken).ToList();
                    if ((clsExercices == null) || (clsExercices.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsExercice.clsObjetRetour = clsObjetRetour;
                        clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsExercice.clsObjetRetour = clsObjetRetour;
                    clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + ex.Message);
            }
            return Json(clsExercices, JsonRequestBehavior.AllowGet);
        }
        public JsonResult COMBOExercice(List<HT_Stock.BOJ.clsExercice> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsExercice clsExercice = new HT_Stock.BOJ.clsExercice();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsExercice ObjetRetour = new HT_Stock.BOJ.clsExercice(); //Conteneur de la réponse de l'appel du service web
            clsExercice.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsExercice> clsExercices = new List<HT_Stock.BOJ.clsExercice>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_ETATEXERCICE))
                        ObjetEnvoie[Idx].EX_ETATEXERCICE = "O";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DESCEXERCICE))
                        ObjetEnvoie[Idx].EX_DESCEXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEFIN))
                        ObjetEnvoie[Idx].EX_DATEFIN = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_DATEDEBUT))
                        ObjetEnvoie[Idx].EX_DATEDEBUT = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL))
                        ObjetEnvoie[Idx].JT_DATEJOURNEETRAVAIL = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EX_EXERCICE))
                        ObjetEnvoie[Idx].EX_EXERCICE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsExercices = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebExercice.URL_SELECT_COMBO, Tokken).ToList();
                    if ((clsExercices == null) || (clsExercices.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsExercice.clsObjetRetour = clsObjetRetour;
                        clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsExercice.clsObjetRetour = clsObjetRetour;
                    clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsExercice.clsObjetRetour = clsObjetRetour;
                clsExercices.Add(clsExercice); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ExerciceController :" + ex.Message);
            }
            return Json(clsExercices, JsonRequestBehavior.AllowGet);
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