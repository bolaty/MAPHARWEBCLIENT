﻿//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using System.Text;

namespace HT_Assurance.Controllers
{
    public class CompteAmortissementController : Controller
    {
        public JsonResult ListeCompteAmortissement(List<HT_Stock.BOJ.clsBienimmobilisefamille > ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsBienimmobilisefamille  clsBienimmobilisefamille  = new HT_Stock.BOJ.clsBienimmobilisefamille ();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsBienimmobilisefamille  ObjetRetour = new HT_Stock.BOJ.clsBienimmobilisefamille (); //Conteneur de la réponse de l'appel du service web
            clsBienimmobilisefamille .clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsBienimmobilisefamille > clsBienimmobilisefamilles = new List<HT_Stock.BOJ.clsBienimmobilisefamille >(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsBienimmobilisefamilles = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebCompteAmortissement.URL_SELECT_COMPTE_AMORTISSEMENT, Tokken).ToList();
                    if ((clsBienimmobilisefamilles == null) || (clsBienimmobilisefamilles.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsBienimmobilisefamille .clsObjetRetour = clsObjetRetour;
                        clsBienimmobilisefamilles.Add(clsBienimmobilisefamille );  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsBienimmobilisefamille .clsObjetRetour = clsObjetRetour;
                    clsBienimmobilisefamilles.Add(clsBienimmobilisefamille );  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsBienimmobilisefamille .clsObjetRetour = clsObjetRetour;
                clsBienimmobilisefamilles.Add(clsBienimmobilisefamille );  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error CompteAmortissementController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsBienimmobilisefamille .clsObjetRetour = clsObjetRetour;
                clsBienimmobilisefamilles.Add(clsBienimmobilisefamille ); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error CompteAmortissementController :" + ex.Message);
            }
            return Json(clsBienimmobilisefamilles, JsonRequestBehavior.AllowGet);
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