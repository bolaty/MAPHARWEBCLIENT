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
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;

namespace HT_Assurance.Controllers
{

    public class AfficherReglementChequeController : Controller
    {
        string edition_url = ""; // Lien de la prévisualisation de l'édition

        public JsonResult InserteditiontresorerieCheque(List<HT_Stock.BOJ.clsCtcontratchequephoto> ObjetEnvoie)
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
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE))
                        ObjetEnvoie[Idx].CH_CHEMINPHOTOCHEQUE = "";
                        //fin traitement des criteres de recherche non obligatoire

                        //debut recuperation des parametres de connexion
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    //fin recuperation des parametres de connexion
                }


                HT_Assurance.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (HT_Assurance.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontratchequephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceAfficherReglementCheque.URL_INSERT_EDITION_TRESORERIE_CHEQUE, Tokken).ToList();
                    if ((clsCtcontratchequephotos == null) || (clsCtcontratchequephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                        clsCtcontratchequephotos.Add(clsCtcontratchequephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }

                    HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES = new List<HT_Assurance.clsCtcontratchequephoto>();
                    HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES = clsCtcontratchequephotos;


                    string TI_PHOTOBASE64 = "";

                    for (int k = 0; k < HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES.Count; k++)
                    {

                        //"CHEQ_" + clsCtcontratchequephotos[Idx].AG_CODEAGENCE + "_" + clsCtcontratchequephotos[Idx].CH_DATESAISIECHEQUE.ToShortDateString().Replace("/", "") + "_" + clsCtcontratchequephotos[Idx].CH_IDEXCHEQUE + "_" + vlpIndex

                        string vlpCodeArticle = "CHEQ_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].AG_CODEAGENCE.ToString() + "_" + DateTime.Parse(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_DATESAISIECHEQUE.ToString()).ToShortDateString().Replace("/", "") + "_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_IDEXCHEQUE.ToString() + "_" + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_NUMSEQUENCEPHOTO.ToString();
                        //Récupération de la photo de l'étudiant depuis la base de données
                        //Stock.BLL.Phapararticlephoto.clsPhapararticlephoto Phapararticlephoto = new Stock.BLL.Phapararticlephoto.clsPhapararticlephoto();
                        MemoryStream memory = new MemoryStream();
                        String chemin = HT_Assurance.clsDeclaration.CHEMIN_REPORTS + "\\IMAGES\\" + vlpCodeArticle + ".png";
                        byte[] PH_PHOTO = null;
                        //Phapararticlephoto = (Stock.BLL.Phapararticlephoto.clsPhapararticlephoto)clsPhapararticlephotoManager.Instance.pvgTableLibelle(vlpCodeArticle).OR_OBJET;



                        try
                        {
                            PH_PHOTO = System.Convert.FromBase64String(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_CHEMINPHOTOCHEQUE.ToString());
                        }
                        catch
                        {
                            //XtraMessageBox.Show(this, "L'image " + HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_CHEMINPHOTOCHEQUE.ToString() + " n'existe pas ou le chemin n'a pas été correctement configuré !!!", Application.ProductName, MessageBoxButtons.OK, MessageBoxIcon.Information);
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
                        HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES[k].CH_CHEMINPHOTOCHEQUE = chemin;


                    }

                    ObjetEnvoie[0].SL_VALEURRETOURS = "LISTE DES CHEQUES";
                    HT_Assurance.clsDeclaration.vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                    HT_Assurance.clsDeclaration.vappValeurFormule = new string[] { HT_Assurance.clsDeclaration.ENTETE1_VALEUR, HT_Assurance.clsDeclaration.ENTETE2_VALEUR, HT_Assurance.clsDeclaration.ENTETE3_VALEUR, HT_Assurance.clsDeclaration.ENTETE4_VALEUR};
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
                Core.clsLog.EcrireDansFichierLog("Error AfficherReglementChequeController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontratchequephoto.clsObjetRetour = clsObjetRetour;
                clsCtcontratchequephotos.Add(clsCtcontratchequephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AfficherReglementChequeController :" + ex.Message);
            }
            return Json(clsCtcontratchequephotos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult pvgAfficherEtat()
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document
                HT_Assurance.clsDeclaration.NOM_ETAT_EN_COURS = "ListeCheque.rpt";
                rd.FileName = HT_Assurance.clsDeclaration.CHEMIN_REPORTS + "REGLEMENT_ASSURANCE\\" + HT_Assurance.clsDeclaration.NOM_ETAT_EN_COURS; // Recuperation du fier .rpt HT_Assurance.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                

                //HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES = new List<clsCtcontratchequephoto>();

                rd.SetDataSource(HT_Assurance.clsDeclaration.SOURCE_DE_DONNEELISTEDESCHEQUES);  // liaison entre le fichier rpt et les données qu'il doit contenir

                //=====================
                //string[] vappNomFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                //object[] vappValeurFormule = new string[] { "Entete1", "Entete2", "Entete3", "Entete4" };
                if (HT_Assurance.clsDeclaration.vappNomFormule != null && HT_Assurance.clsDeclaration.vappValeurFormule != null)
                    pvpRenseignerFormule(HT_Assurance.clsDeclaration.vappNomFormule, HT_Assurance.clsDeclaration.vappValeurFormule, rd);
                //=====================


                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, HT_Assurance.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = HT_Assurance.clsDeclaration.URL_DOSSIER_ETATS + fileName; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR          
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }



            return Json(retour, JsonRequestBehavior.AllowGet);

            //HT_Assurance.clsDeclaration.SOURCE_DE_DONNEEASSURANCE = new List<Core.clsEditionEtatAssurance>();

            //return retour;   // Retour de la fonction



        }


        private void pvpRenseignerFormule(string[] vappNomFormule, object[] vappValeurFormule, ReportDocument rd)
        {
            for (int Idx = 0; Idx < vappNomFormule.GetLength(0); Idx++)
            {
                string vlpNomFormule = vappNomFormule[Idx].ToString();
                string vlpValeurFormule = vappValeurFormule[Idx].ToString();
                rd.DataDefinition.FormulaFields[vlpNomFormule].Text = "'" + vlpValeurFormule.Replace("'", "''") + "'";

            }
        }


        public Dictionary<string, string>[] pvgAfficheEtat(List<clsEditionEtatParametre> data)
        {
            string fileName = ""; // declaration de la variable qui contiendra le nom du futur etat

            Dictionary<string, string>[] retour = new Dictionary<string, string>[1]; // declaration de la variable de retour

            retour[0] = new Dictionary<string, string>(); // Initialisation de la variable de retour

            try
            {
                // declaration du fichier généré
                ReportDocument rd = new ReportDocument(); // Création d'une instance document 
                rd.FileName = HT_Assurance.clsDeclaration.CHEMIN_REPORTS + "ListeCheque.rpt"; // Recuperation du fier .rpt HT_Assurance.clsDeclaration.NOM_ETAT_EN_COURS
                DateTime date = DateTime.Today; // Recuperation de la date du jour                
                rd.SetDataSource(data);  // liaison entre le fichier rpt et les données qu'il doit contenir
                Random random = new Random(); // Création d'une instance de valeur aleatoir                
                int randomNumber = random.Next(Core.clsDeclaration.VAL_RAND_MIN, Core.clsDeclaration.VAL_RAND_MAX);  // Génération automatique d'un nombre compris entre 0 et 1000000

                //fileName = Core.ConversionFichier.extentionDocument("PDF", randomNumber.ToString(), rd, HT_Assurance.clsDeclaration.CHEMIN_ETATS); // Attribution d'un nom au fichier etat

                edition_url = HT_Assurance.clsDeclaration.URL_DOSSIER_ETATS + "ListeCheque.rpt"; // Xhemin d'acces du fichier etat

                retour[0].Add("SL_RESULTAT", Core.clsDeclaration.SL_RESULTAT_SUCCESS); // RESULTAT = TRUE
                retour[0].Add("SL_MESSAGE", Core.clsDeclaration.SUCCESS_MSG_OPERATION); // MSG = REPONSE SUCCES
                retour[0].Add("SL_PATH_FILE", edition_url); // Ajout d'une nouvelle instance de la classe a la liste

            }
            catch (WebException e)
            {
                // Exeptions liées au SEVEUR           
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR; // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message); // MSG = ERREUR DU SERVEUR
            }
            catch (Exception ex)  // Exeptions liées au CODE
            {
                retour[0]["SL_RESULTAT"] = Core.clsDeclaration.SL_RESULTAT_ERROR;  // RESULTAT = FALSE
                retour[0]["SL_MESSAGE"] = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  // MSG = ERREUR DU CODE
            }

            return retour;   // Retour de la fonction
        }

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