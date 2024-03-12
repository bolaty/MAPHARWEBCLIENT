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
    public class SaisieEcritureComptableController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutSaisieEcritureComptable(List<HT_Stock.BOJ.clsPhamouvementstockreglement> ObjetEnvoie)
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
                    //debut recuperation des parametres de connexion

                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MC_LIBELLEOPERATION))
                        ObjetEnvoie[Idx].MC_LIBELLEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PL_NUMCOMPTE1))
                        ObjetEnvoie[Idx].PL_NUMCOMPTE1 = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].NC_CODENATURECOMPTE))
                        ObjetEnvoie[Idx].NC_CODENATURECOMPTE = "";
                    //if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EC_MONTANTECHEANCENF))
                    //    ObjetEnvoie[Idx].EC_MONTANTECHEANCENF = "";
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsPhamouvementstockreglements = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferenceSaisieEcritureComptable.URL_MISE_A_JOUR_SAISIE_ECRITURECOMPTABLE, Tokken).ToList();
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
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcritureComptableController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsPhamouvementstockreglement.clsObjetRetour = clsObjetRetour;
                clsPhamouvementstockreglements.Add(clsPhamouvementstockreglement); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error SaisieEcritureComptableController :" + ex.Message);
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