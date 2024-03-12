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
    public class ParametragePlancomptableController : Controller
    {
        public JsonResult ListePlancomptable(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTPARAMETRAGEPLANCOMPTABLE, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listenaturecompte(List<HT_Stock.BOJ.clsPlancomptablenaturecompte> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptablenaturecompte clsPlancomptablenaturecompte = new HT_Stock.BOJ.clsPlancomptablenaturecompte();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptablenaturecompte ObjetRetour = new HT_Stock.BOJ.clsPlancomptablenaturecompte(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptablenaturecompte.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptablenaturecompte> clsPlancomptablenaturecomptes = new List<HT_Stock.BOJ.clsPlancomptablenaturecompte>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptablenaturecomptes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTNATURECOMPTE, Tokken).ToList();
                    if ((clsPlancomptablenaturecomptes == null) || (clsPlancomptablenaturecomptes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                        clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                    clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptablenaturecompte.clsObjetRetour = clsObjetRetour;
                clsPlancomptablenaturecomptes.Add(clsPlancomptablenaturecompte); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptablenaturecomptes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listesens(List<HT_Stock.BOJ.clsComptapar_sens> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsComptapar_sens clsComptapar_sens = new HT_Stock.BOJ.clsComptapar_sens();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsComptapar_sens ObjetRetour = new HT_Stock.BOJ.clsComptapar_sens(); //Conteneur de la réponse de l'appel du service web
            clsComptapar_sens.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsComptapar_sens> clsComptapar_senss = new List<HT_Stock.BOJ.clsComptapar_sens>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsComptapar_senss = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTSENS, Tokken).ToList();
                    if ((clsComptapar_senss == null) || (clsComptapar_senss.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsComptapar_sens.clsObjetRetour = clsObjetRetour;
                        clsComptapar_senss.Add(clsComptapar_sens);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsComptapar_sens.clsObjetRetour = clsObjetRetour;
                    clsComptapar_senss.Add(clsComptapar_sens);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsComptapar_sens.clsObjetRetour = clsObjetRetour;
                clsComptapar_senss.Add(clsComptapar_sens);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsComptapar_sens.clsObjetRetour = clsObjetRetour;
                clsComptapar_senss.Add(clsComptapar_sens); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsComptapar_senss, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listetypecompte(List<HT_Stock.BOJ.clsTypeCompte> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsTypeCompte clsTypeCompte = new HT_Stock.BOJ.clsTypeCompte();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsTypeCompte ObjetRetour = new HT_Stock.BOJ.clsTypeCompte(); //Conteneur de la réponse de l'appel du service web
            clsTypeCompte.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsTypeCompte> clsTypeComptes = new List<HT_Stock.BOJ.clsTypeCompte>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsTypeComptes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTTYPECOMPTE, Tokken).ToList();
                    if ((clsTypeComptes == null) || (clsTypeComptes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsTypeCompte.clsObjetRetour = clsObjetRetour;
                        clsTypeComptes.Add(clsTypeCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsTypeCompte.clsObjetRetour = clsObjetRetour;
                    clsTypeComptes.Add(clsTypeCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsTypeCompte.clsObjetRetour = clsObjetRetour;
                clsTypeComptes.Add(clsTypeCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsTypeCompte.clsObjetRetour = clsObjetRetour;
                clsTypeComptes.Add(clsTypeCompte); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsTypeComptes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listestatutcompte(List<HT_Stock.BOJ.clsStatutCompte> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsStatutCompte clsStatutCompte = new HT_Stock.BOJ.clsStatutCompte();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsStatutCompte ObjetRetour = new HT_Stock.BOJ.clsStatutCompte(); //Conteneur de la réponse de l'appel du service web
            clsStatutCompte.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsStatutCompte> clsStatutComptes = new List<HT_Stock.BOJ.clsStatutCompte>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsStatutComptes = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTSTATUTCOMPTE, Tokken).ToList();
                    if ((clsStatutComptes == null) || (clsStatutComptes.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsStatutCompte.clsObjetRetour = clsObjetRetour;
                        clsStatutComptes.Add(clsStatutCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsStatutCompte.clsObjetRetour = clsObjetRetour;
                    clsStatutComptes.Add(clsStatutCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsStatutCompte.clsObjetRetour = clsObjetRetour;
                clsStatutComptes.Add(clsStatutCompte);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsStatutCompte.clsObjetRetour = clsObjetRetour;
                clsStatutComptes.Add(clsStatutCompte); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsStatutComptes, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Listetypesaut(List<HT_Stock.BOJ.clsComptapar_typesaut> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsComptapar_typesaut clsComptapar_typesaut = new HT_Stock.BOJ.clsComptapar_typesaut();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsComptapar_typesaut ObjetRetour = new HT_Stock.BOJ.clsComptapar_typesaut(); //Conteneur de la réponse de l'appel du service web
            clsComptapar_typesaut.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsComptapar_typesaut> clsComptapar_typesauts = new List<HT_Stock.BOJ.clsComptapar_typesaut>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsComptapar_typesauts = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTTYPESTATUT, Tokken).ToList();
                    if ((clsComptapar_typesauts == null) || (clsComptapar_typesauts.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsComptapar_typesaut.clsObjetRetour = clsObjetRetour;
                        clsComptapar_typesauts.Add(clsComptapar_typesaut);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsComptapar_typesaut.clsObjetRetour = clsObjetRetour;
                    clsComptapar_typesauts.Add(clsComptapar_typesaut);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsComptapar_typesaut.clsObjetRetour = clsObjetRetour;
                clsComptapar_typesauts.Add(clsComptapar_typesaut);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsComptapar_typesaut.clsObjetRetour = clsObjetRetour;
                clsComptapar_typesauts.Add(clsComptapar_typesaut); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsComptapar_typesauts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListePlanRerporting(List<HT_Stock.BOJ.clsPlan_rerporting> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlan_rerporting clsPlan_rerporting = new HT_Stock.BOJ.clsPlan_rerporting();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlan_rerporting ObjetRetour = new HT_Stock.BOJ.clsPlan_rerporting(); //Conteneur de la réponse de l'appel du service web
            clsPlan_rerporting.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlan_rerporting> clsPlan_rerportings = new List<HT_Stock.BOJ.clsPlan_rerporting>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
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
                    clsPlan_rerportings = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTPLANREPORTING, Tokken).ToList();
                    if ((clsPlan_rerportings == null) || (clsPlan_rerportings.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlan_rerporting.clsObjetRetour = clsObjetRetour;
                        clsPlan_rerportings.Add(clsPlan_rerporting);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlan_rerporting.clsObjetRetour = clsObjetRetour;
                    clsPlan_rerportings.Add(clsPlan_rerporting);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlan_rerporting.clsObjetRetour = clsObjetRetour;
                clsPlan_rerportings.Add(clsPlan_rerporting);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlan_rerporting.clsObjetRetour = clsObjetRetour;
                clsPlan_rerportings.Add(clsPlan_rerporting); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlan_rerportings, JsonRequestBehavior.AllowGet);
        }
        public JsonResult LISTCOMPTECOLLECTIFPLANREPORTING(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
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
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_SELECT_LISTCOMPTECOLLECTIFPLANREPORTING, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
        }
        public JsonResult INSERT(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {

                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_COMPTECOLLECTIF))
                        ObjetEnvoie[Idx].PL_COMPTECOLLECTIF = "";
                   if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PLAN_REPORTING_CODE))
                        ObjetEnvoie[Idx].PLAN_REPORTING_CODE = "";

                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_INSERT, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
        }


        public JsonResult UPDATE(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut recuperation des parametres de connexion

                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NO_CODENATUREOPERATION))
                        ObjetEnvoie[Idx].NO_CODENATUREOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_CODENUMCOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTECONTREPARTIE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTECONTREPARTIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_COMPTECOLLECTIF))
                        ObjetEnvoie[Idx].PL_COMPTECOLLECTIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "1";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PLAN_REPORTING_CODE))
                        ObjetEnvoie[Idx].PLAN_REPORTING_CODE = "";
                }




                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_UPDATE_LISTTYPESTATUT, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DELETE(List<HT_Stock.BOJ.clsPlancomptable> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPlancomptable clsPlancomptable = new HT_Stock.BOJ.clsPlancomptable();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPlancomptable ObjetRetour = new HT_Stock.BOJ.clsPlancomptable(); //Conteneur de la réponse de l'appel du service web
            clsPlancomptable.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPlancomptable> clsPlancomptables = new List<HT_Stock.BOJ.clsPlancomptable>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPlancomptables = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceParametragePlancomptable.URL_DELETE_LISTTYPESTATUT, Tokken).ToList();
                    if ((clsPlancomptables == null) || (clsPlancomptables.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPlancomptable.clsObjetRetour = clsObjetRetour;
                        clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPlancomptable.clsObjetRetour = clsObjetRetour;
                    clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPlancomptable.clsObjetRetour = clsObjetRetour;
                clsPlancomptables.Add(clsPlancomptable); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ParametragePlancomptableController :" + ex.Message);
            }
            return Json(clsPlancomptables, JsonRequestBehavior.AllowGet);
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