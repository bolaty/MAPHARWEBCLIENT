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
    public class ReglementfactureClientController : Controller
    {
        

        //BLOC LISTE
        public JsonResult ListeReglementfactureClient(List<HT_Assurance.clsPhamouvementstockreglement> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsPhamouvementstockreglement clsPhamouvementstockreglement = new HT_Assurance.clsPhamouvementstockreglement();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsPhamouvementstockreglement ObjetRetour = new HT_Assurance.clsPhamouvementstockreglement(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglement.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsPhamouvementstockreglement> clsPhamouvementstockreglements = new List<HT_Assurance.clsPhamouvementstockreglement>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))   MOUVEMENTCOMPTABLEANALYTIQUE
                    //    ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FB_IDFOURNISSEUR))
                        ObjetEnvoie[Idx].FB_IDFOURNISSEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MV_REFERENCEPIECE))
                        ObjetEnvoie[Idx].MV_REFERENCEPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    
                    if (ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques != null)
                    for (int i = 0; i < ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques.Count; i++)
                    {
                        if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE))
                            ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE="";
                    }

                    if (ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses != null)
                    if (ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses.Count > 0)
                    {
                        for (int j = 0; j < ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses.Count; j++)
                        {
                            if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE))
                                ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE = "0";
                            }
                    }

                     
                    
                        if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE))
                            ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.AB_CODEAGENCEBANCAIRE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.AB_CODEAGENCEBANCAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CA_CODECONTRAT))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATESAISIECHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATESAISIECHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.AG_CODEAGENCE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_REFCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_REFCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_VALEURCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_VALEURCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_PRIMEAENCAISSER))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_PRIMEAENCAISSER = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEANNULATIONCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEANNULATIONCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEEMISSIONCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEEMISSIONCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEVALIDATIONCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEVALIDATIONCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMTIREUR))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMTIREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMTIRE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMTIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATERECEPTIONCHEQUE))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATERECEPTIONCHEQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMDUDEPOSANT))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_NOMDUDEPOSANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_TELEPHONEDEPOSANT))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_TELEPHONEDEPOSANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEEFFET))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.OP_CODEOPERATEUR = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion AG_CODEAGENCE
                    //ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    //ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].AG_CODEAGENCE;
                    //ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglements = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebReferenceReglementFactureClient.URL_INSERTREGLEMENTFACTURECLIENT, Tokken).ToList();
                    if ((clsPhamouvementstockreglements == null) || (clsPhamouvementstockreglements.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglements, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AjoutReglementOperationTresorerie(List<HT_Stock.BOJ.clsPhamouvementstockreglement> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglement clsPhamouvementstockreglement = new HT_Stock.BOJ.clsPhamouvementstockreglement();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglement ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglement(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglement.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglement> clsPhamouvementstockreglements = new List<HT_Stock.BOJ.clsPhamouvementstockreglement>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    //if(string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT))
                        ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE2))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FB_IDFOURNISSEUR))
                        ObjetEnvoie[Idx].FB_IDFOURNISSEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MV_REFERENCEPIECE))
                        ObjetEnvoie[Idx].MV_REFERENCEPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //for (int i = 0; i < ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques.Count; i++)
                    //{
                    //    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE))
                    //        ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE = "";
                    //}
                    //for (int j = 0; j < ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses.Count; j++)
                    //{
                    //    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE))
                    //        ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE = "0";
                    //}

                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE))
                    //    ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE = "0";

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
                    clsPhamouvementstockreglements = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebReferenceReglementFactureClient.URL_INSERTOPERATIONTRESORERIE1, Tokken).ToList();
                    if ((clsPhamouvementstockreglements == null) || (clsPhamouvementstockreglements.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglements, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AjoutReglementOperationTresorerietiers(List<HT_Stock.BOJ.clsPhamouvementstockreglement> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsPhamouvementstockreglement clsPhamouvementstockreglement = new HT_Stock.BOJ.clsPhamouvementstockreglement();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsPhamouvementstockreglement ObjetRetour = new HT_Stock.BOJ.clsPhamouvementstockreglement(); //Conteneur de la réponse de l'appel du service web
            clsPhamouvementstockreglement.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsPhamouvementstockreglement> clsPhamouvementstockreglements = new List<HT_Stock.BOJ.clsPhamouvementstockreglement>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    ////debut traitement des criteres de recherche non obligatoire
                    //if(string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    //ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT))
                        ObjetEnvoie[Idx].MR_CODEMODEREGLEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE2))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE2 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].FB_IDFOURNISSEUR))
                        ObjetEnvoie[Idx].FB_IDFOURNISSEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MV_REFERENCEPIECE))
                        ObjetEnvoie[Idx].MV_REFERENCEPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    //for (int i = 0; i < ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques.Count; i++)
                    //{
                    //    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE))
                    //        ObjetEnvoie[Idx].clsPhamouvementstockreglementcheques[i].RC_NUMEROCHEQUE = "";
                    //}
                    //for (int j = 0; j < ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses.Count; j++)
                    //{
                    //    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE))
                    //        ObjetEnvoie[Idx].clsCtcontratchequephotoreglementcaisses[j].CHC_IDEXCHEQUE = "0";
                    //}

                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE))
                    //    ObjetEnvoie[Idx].clsCtcontratchequereglementcaisse.CHC_IDEXCHEQUE = "0";

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
                    clsPhamouvementstockreglements = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebReferenceReglementFactureClient.URL_INSERTOPERATIONTRESORERIETIERS, Tokken).ToList();
                    if ((clsPhamouvementstockreglements == null) || (clsPhamouvementstockreglements.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                        clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                    clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ReglementfactureClientController :" + ex.Message);
            }
            return Json(clsPhamouvementstockreglements, JsonRequestBehavior.AllowGet);
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