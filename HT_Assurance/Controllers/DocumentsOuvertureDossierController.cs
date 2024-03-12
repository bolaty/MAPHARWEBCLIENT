//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;
using System.Web.Http;
using System.Net;
using System.Diagnostics;

namespace HT_Assurance.Controllers
{
    public class DocumentsOuvertureDossierController : ApiController
    {
        string test = "0";
        //BLOC AJOUT DOCUMENT (OUVERTURE DE DOSSIER)
        public List<HT_Stock.BOJ.clsCtsinistrephoto> AjoutDoc(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
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
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDocumentsOuvertureDossier.URL_MISE_A_JOUR_DOC_OUVRE_DOSSIER, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + ex.Message);
            }
            return clsCtsinistrephotos;
        }

        //BLOC CREER LE DOCUMENT DANS LE REPERTOIRE
        public string createFolder(string tache)
        {
            string root = HttpContext.Current.Server.MapPath("~/Ressources/Taches/" + tache);
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }
            return root;
        }

        //COPIE L'IMAGE DU DOCUMENT
        public async Task<HttpResponseMessage> pvgCopyFile()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string root = HttpContext.Current.Server.MapPath("~/Ressources");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                //Lire les données du formulaire.
                await Request.Content.ReadAsMultipartAsync(provider);
                //Cela illustre comment obtenir les noms de fichiers.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);
                }
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
                //Log
                Core.clsLog.EcrireDansFichierLog("Error DocumentController :" + e.Message);
            }
        }

        //COPIER LE DOCUMENT + clsCtsinistrephotos.SI_CODESINISTRE
        public async Task<HttpResponseMessage> pvgCopyTaskDocs()
        {
            string _FileName = "";

            string root = HttpContext.Current.Server.MapPath("~/Ressources/OuvertureDossier");

            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
                Directory.CreateDirectory(root + "/Docs");
            }

            Assurance.Outils.clsDeclaration.ROOT = root;

            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartFormDataStreamProvider(Assurance.Outils.clsDeclaration.ROOT + "/Docs");

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                // This illustrates how to get the file names.
                foreach (MultipartFileData file in provider.FileData)
                {
                    Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                    Trace.WriteLine("Server file path: " + file.LocalFileName);


                    string[] TabExt = file.Headers.ContentDisposition.FileName.Split('.');
                    string ext = TabExt[TabExt.Length - 1].Replace("\"", "");

                    string[] TabPath = file.LocalFileName.Split('\\');
                    string name = "Docs/" + TabPath[TabPath.Length - 1].Replace("\"", "");

                    _FileName = name + "." + ext;

                    System.IO.File.Move(file.LocalFileName, file.LocalFileName + "." + ext);
                }

                Assurance.Outils.clsDeclaration.ROOT = "";
                return Request.CreateResponse(_FileName);
            }
            catch (System.Exception e)
            {
                Assurance.Outils.clsDeclaration.ROOT = "";
                //+++++Log                                                                                                          
                Core.clsLog.EcrireDansFichierLog("Error ProjetController :" + e.Message);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        //BLOC LISTE DOCUMENT (OUVERTURE DE DOSSIER)
        public List<HT_Stock.BOJ.clsCtsinistrephoto> ListeDoc(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
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
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDocumentsOuvertureDossier.URL_SELECT_DOC_OUVRE_DOSSIER, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + ex.Message);
            }
            return clsCtsinistrephotos;
        }

        //BLOC MODIFICATION DOCUMENT (OUVERTURE DE DOSSIER)
        public List<HT_Stock.BOJ.clsCtsinistrephoto> ModificationDoc(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
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
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDocumentsOuvertureDossier.URL_MODIF_DOC_OUVRE_DOSSIER, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + ex.Message);
            }
            return clsCtsinistrephotos;
        }

        public bool pvgSupprimerPhotoSignature(string chemin)
        {
            bool vlpResultat = false;
            if (File.Exists(chemin))
            {
                File.Delete(chemin);
                if (!File.Exists(chemin))
                    vlpResultat = true;
            }


            return vlpResultat;
        }

        //BLOC SUPPRESSION DOCUMENT (OUVERTURE DE DOSSIER)
        public List<HT_Stock.BOJ.clsCtsinistrephoto> SuppressionDoc(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
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
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDocumentsOuvertureDossier.URL_DELETE_DOC_OUVRE_DOSSIER, Tokken).ToList();
                    if ((clsCtsinistrephotos == null) || (clsCtsinistrephotos.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                        clsCtsinistrephotos.Add(clsCtsinistrephoto);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                    if (clsCtsinistrephotos[0].clsObjetRetour.SL_RESULTAT == "TRUE")
                    {
                        string root = HttpContext.Current.Server.MapPath("~/Ressources/OuvertureDossier/");
                        pvgSupprimerPhotoSignature(root + ObjetEnvoie[0].SI_CHEMINPHOTO);
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
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + ex.Message);
            }
            return clsCtsinistrephotos;
        }

        //BLOC COMBO DOCUMENT (OUVERTURE DE DOSSIER)
        public List<HT_Stock.BOJ.clsCtsinistrephoto> ComboDoc(List<HT_Stock.BOJ.clsCtsinistrephoto> ObjetEnvoie)
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
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtsinistrephotos = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebDocumentsOuvertureDossier.URL_COMBO_DOC_OUVRE_DOSSIER, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtsinistrephoto.clsObjetRetour = clsObjetRetour;
                clsCtsinistrephotos.Add(clsCtsinistrephoto); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error AjoutDocOuvertureDossierController :" + ex.Message);
            }
            return clsCtsinistrephotos;
        }
    }
}