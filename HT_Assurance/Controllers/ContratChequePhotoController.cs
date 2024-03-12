//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using System.Text;
using System.IO;

namespace HT_Assurance.Controllers
{
    public class ContratChequePhotoController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutContratChequePhoto(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Stock.BOJ.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratchequephoto ObjetRetour = new HT_Stock.BOJ.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Stock.BOJ.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    ////fin recuperation des parametres de connexion

                    ////debut traitement des criteres de recherche non obligatoire
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_IDEXCHEQUE))
                    //    ObjetEnvoie[Idx].CH_IDEXCHEQUE = "1";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO))
                      ObjetEnvoie[Idx].CH_NUMSEQUENCEPHOTO = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "WWWW.TEST.COM";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE))
                    //    ObjetEnvoie[Idx].CH_LIBELLEPHOTOCHEQUE = "test";
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratChequePhoto.URL_AJOUTER_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE

        public JsonResult ListeContratChequePhoto(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Stock.BOJ.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratchequephoto ObjetRetour = new HT_Stock.BOJ.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Stock.BOJ.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratChequePhoto.URL_SELECT_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeImpressionChequePhoto(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Assurance.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontratchequephoto ObjetRetour = new HT_Assurance.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Assurance.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratChequePhoto.URL_SELECT_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                    /* else
                     {
                         Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = new List<clsCtcontratchequephoto>();
                         Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = clsCtcontratchequephotos;
                         Assurance.Outils.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                         Assurance.Outils.clsDeclaration.vappValeurFormule = new string[] { Assurance.Outils.clsDeclaration.ENTETE1_VALEUR, Assurance.Outils.clsDeclaration.ENTETE2_VALEUR, Assurance.Outils.clsDeclaration.ENTETE3_VALEUR, Assurance.Outils.clsDeclaration.ENTETE4_VALEUR };
                     }*/

                    HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = new List<HT_Assurance.clsCtcontratchequephoto>();
                    HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = clsCtcontratchequephotos;


                    string TI_PHOTOBASE64 = "";

                    for (int k = 0; k < HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE.Count; k++)
                    {

                        //"CHEQ_" + clsCtcontratchequephotos[Idx].AG_CODEAGENCE + "_" + clsCtcontratchequephotos[Idx].CH_DATESAISIECHEQUE.ToShortDateString().Replace("/", "") + "_" + clsCtcontratchequephotos[Idx].CH_IDEXCHEQUE + "_" + vlpIndex

                        string vlpCodeArticle = "CHEQ_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].AG_CODEAGENCE.ToString() + "_" + DateTime.Parse(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].CH_DATESAISIECHEQUE.ToString()).ToShortDateString().Replace("/", "") + "_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].CH_IDEXCHEQUE.ToString() + "_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].CH_NUMSEQUENCEPHOTO.ToString();
                        //Récupération de la photo de l'étudiant depuis la base de données
                        //Stock.BLL.Phapararticlephoto.clsPhapararticlephoto Phapararticlephoto = new Stock.BLL.Phapararticlephoto.clsPhapararticlephoto();
                        MemoryStream memory = new MemoryStream();
                        String chemin = HT_Assurance.clsDeclaration.CHEMIN_REPORTS + "\\IMAGES\\" + vlpCodeArticle + ".png";
                        byte[] PH_PHOTO = null;
                        //Phapararticlephoto = (Stock.BLL.Phapararticlephoto.clsPhapararticlephoto)clsPhapararticlephotoManager.Instance.pvgTableLibelle(vlpCodeArticle).OR_OBJET;



                        try
                        {
                            PH_PHOTO = System.Convert.FromBase64String(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].CH_CHEMINPHOTOCHEQUE.ToString());
                        }
                        catch
                        {
                            //XtraMessageBox.Show(this, "L'image " + Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_CHEMINPHOTOCHEQUE.ToString() + " n'existe pas ou le chemin n'a pas été correctement configuré !!!", Application.ProductName, MessageBoxButtons.OK, MessageBoxIcon.Information);
                            //return;
                        }




                        try
                        {
                            //if (File.Exists(chemin)) File.Delete(chemin);
                            //PictureEdit pictureEdit1 = new DevExpress.XtraEditors.PictureEdit();
                            TI_PHOTOBASE64 = Convert.ToBase64String(PH_PHOTO);



                            if (TI_PHOTOBASE64 != "")
                                Base64ToImageSave(TI_PHOTOBASE64).Save(chemin);



                            //memory = new MemoryStream(PH_PHOTO);
                            //pictureEdit1.Image = Bitmap.FromStream(memory);
                            //pictureEdit1.Image.Save(chemin);

                        }
                        catch
                        {

                        }

                        if (!System.IO.File.Exists(chemin)) chemin = "";
                        HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE[k].CH_CHEMINPHOTOCHEQUE = chemin;


                    }

                    ObjetEnvoie[0].SL_VALEURRETOURS = "LISTE DES IMAGES";
                    HT_Assurance.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                    HT_Assurance.clsDeclaration.vappValeurFormule = new string[] { HT_Assurance.clsDeclaration.ENTETE1_VALEUR, HT_Assurance.clsDeclaration.ENTETE2_VALEUR, HT_Assurance.clsDeclaration.ENTETE3_VALEUR, HT_Assurance.clsDeclaration.ENTETE4_VALEUR };



                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
          //  Assurance.Outils.clsDeclaration.SOURCE_DE_DONNEEIMPRESSIONPHOTOCHEQUE = clsCtcontratchequephotos;
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
        }

        ////BLOC SUPPRESSION
        public JsonResult SuppressioncontratchequePhoto(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Stock.BOJ.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontratchequephoto ObjetRetour = new HT_Stock.BOJ.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
            clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Stock.BOJ.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ////ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratChequePhoto.URL_DELETE_CHEQUE_PHOTO, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                    clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
            }
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);

        }

        ////BLOC DE MODIFICATION
        //public JsonResult ModificationContratCheque(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
        //{
        //    string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
        //    HT_Stock.BOJ.clsCtcontratchequephoto clsCtcontratchequephoto = new HT_Stock.BOJ.clsCtcontratchequephoto();  //Déclaration d'une instance de l'objet equipe_operateurs
        //    HT_Stock.BOJ.clsCtcontratchequephoto ObjetRetour = new HT_Stock.BOJ.clsCtcontratchequephoto(); //Conteneur de la réponse de l'appel du service web
        //    clsCtcontratchequephoto.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
        //    Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
        //    List<HT_Stock.BOJ.clsCtcontratchequephoto> clsCtcontratchequephotos = new List<HT_Stock.BOJ.clsCtcontratchequephoto>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
        //            clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContratCheque.URL_MODIFICATION_CHEQUE, Tokken).ToList();
        //            if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
        //            {
        //                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
        //                clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
        //                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
        //                clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //            }
        //        }
        //        else
        //        {
        //            clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
        //            clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
        //            clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
        //            clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //        }
        //    }
        //    catch (System.Net.WebException e)  //Exeptions liées au serveur
        //    {
        //        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
        //        clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
        //        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
        //        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
        //        Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + e.Message);

        //    }
        //    catch (Exception ex)  //Exeptions liées au code
        //    {
        //        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
        //        clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
        //        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
        //        clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
        //        Core.clsLog.EcrireDansFichierLog("Error ContratChequeController :" + ex.Message);
        //    }
        //    return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
        //}
        public System.Drawing.Image Base64ToImageSave(string base64String)
        {

            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            ms.Write(imageBytes, 0, imageBytes.Length);
            System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);
            return image;
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