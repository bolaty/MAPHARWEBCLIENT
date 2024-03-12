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
    public class RemiseDeChequePhotoController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutRemiseDeChequePhoto(List<HT_Stock.BOJ.clsCtsinistrechequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrechequephoto clsCtsinistrechequephoto = new HT_Stock.BOJ.clsCtsinistrechequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrechequephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrechequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrechequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrechequephoto> clsCtsinistrechequephotos = new List<HT_Stock.BOJ.clsCtsinistrechequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    ////fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO))
                        ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "WWWW.TEST.COM";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE = "test";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrechequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeChequePhoto.URL_MISE_A_JOUR_REMISE_DE_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrechequephotos == null) || (clsCtsinistrechequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + ex.Message);
            }
            return Json(clsCtsinistrechequephotos, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE

        public JsonResult ListeRemiseDeChequePhoto(List<HT_Stock.BOJ.clsCtsinistrechequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrechequephoto clsCtsinistrechequephoto = new HT_Stock.BOJ.clsCtsinistrechequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrechequephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrechequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrechequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrechequephoto> clsCtsinistrechequephotos = new List<HT_Stock.BOJ.clsCtsinistrechequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                   // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrechequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeChequePhoto.URL_SELECT_REMISE_DE_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrechequephotos == null) || (clsCtsinistrechequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + ex.Message);
            }
            return Json(clsCtsinistrechequephotos, JsonRequestBehavior.AllowGet);
        }

        ////BLOC SUPPRESSION
        public JsonResult SuppressionRemiseDeChequePhoto(List<HT_Stock.BOJ.clsCtsinistrechequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtsinistrechequephoto clsCtsinistrechequephoto = new HT_Stock.BOJ.clsCtsinistrechequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtsinistrechequephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrechequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtsinistrechequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtsinistrechequephoto> clsCtsinistrechequephotos = new List<HT_Stock.BOJ.clsCtsinistrechequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    // ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    ////ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion

                    //debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO))
                    //    ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "WWWW.TEST.COM";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE = "test";
                
            }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrechequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebRemiseDeChequePhoto.URL_DELETE_REMISE_DE_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtsinistrechequephotos == null) || (clsCtsinistrechequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + ex.Message);
            }
            return Json(clsCtsinistrechequephotos, JsonRequestBehavior.AllowGet);

        }

        ////BLOC DE MODIFICATION
        //public JsonResult ModificationContratCheque(List<HT_Stock.BOJ.clsCtsinistrechequephoto> ObjetEnvoie)
        //{
        //    string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
        //    HT_Stock.BOJ.clsCtsinistrechequephoto clsCtsinistrechequephoto = new HT_Stock.BOJ.clsCtsinistrechequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
        //    HT_Stock.BOJ.clsCtsinistrechequephoto ObjetRetour = new HT_Stock.BOJ.clsCtsinistrechequephoto(); //Conteneur de la réponse de l'appel du service web
        //    clsCtsinistrechequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
        //    Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
        //    List<HT_Stock.BOJ.clsCtsinistrechequephoto> clsCtsinistrechequephotos = new List<HT_Stock.BOJ.clsCtsinistrechequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
        //    Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

        //    try
        //    {

        //        for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
        //        {
        //            //debut recuperation des parametres de connexion
        //            ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
        //           ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
        //            ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
        //            //fin recuperation des parametres de connexion

        //            //debut traitement des criteres de recherche non obligatoire
        //            if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
        //                ObjetEnvoie[Idx].CH_IDEXCHEQUE = "";
        //        }

        //        Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
        //        if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
        //        {
        //            //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
        //            clsCtsinistrechequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_MODIFICATION_CHEQUE, Tokken).ToList();
        //            if ((clsCtsinistrechequephotos == null) || (clsCtsinistrechequephotos.Count == 0))
        //            {
        //                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
        //                clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
        //                clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
        //                clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //            }
        //        }
        //        else
        //        {
        //            clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
        //            clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
        //            clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
        //            clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //        }
        //    }
        //    catch (System.Net.WebException e)  //Exeptions liées au serveur
        //    {
        //        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
        //        clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
        //        clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
        //        clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //        Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + e.Message);

        //    }
        //    catch (Exception ex)  //Exeptions liées au code
        //    {
        //        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
        //        clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
        //        clsCtsinistrechequephoto.clsObjetRetour = clsObjetRetour;
        //        clsCtsinistrechequephotos.Add(clsCtsinistrechequephoto); // Ajout d'une nouvelle instance de la classe a la liste
        //        Core.clsLog.EcrireDansFichierLog("Error RemiseDeChequePhotoController :" + ex.Message);
        //    }
        //    return Json(clsCtsinistrechequephotos, JsonRequestBehavior.AllowGet);
        //}

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