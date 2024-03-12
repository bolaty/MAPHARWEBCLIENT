//dependance utilisées
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Assurance.Outils;
using HT_Stock.BOJ;
using System.Text;

namespace HT_Stock.BOJ.Controllers
{
    public class ContratController : Controller
    {
        //BLOC MISE A JOUR
        public JsonResult AjoutContrat(List<HT_Assurance.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontrat clsCtcontrat = new HT_Assurance.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontrat ObjetRetour = new HT_Assurance.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontrat> clsCtcontrats = new List<HT_Assurance.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMSERIE))
                        ObjetEnvoie[Idx].CA_NUMSERIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CD_CODECONDITION))
                        ObjetEnvoie[Idx].CD_CODECONDITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DUREEENMOIS.ToString()))
                        ObjetEnvoie[Idx].CA_DUREEENMOIS = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_SPORT))
                        ObjetEnvoie[Idx].AC_SPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_ADRESSE))
                        ObjetEnvoie[Idx].CA_ADRESSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE))
                        ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT))
                        ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT))
                        ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CB_IDBRANCHE))
                        ObjetEnvoie[Idx].CB_IDBRANCHE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEEFFET))
                        ObjetEnvoie[Idx].CA_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEECHEANCE))
                        ObjetEnvoie[Idx].CA_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_AVENANT))
                        ObjetEnvoie[Idx].CA_AVENANT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONDITIONHABITUEL))
                        ObjetEnvoie[Idx].CA_CONDITIONHABITUEL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF))
                        ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AU_CODECATEGORIE))
                        ObjetEnvoie[Idx].AU_CODECATEGORIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETARIF))
                        ObjetEnvoie[Idx].TA_CODETARIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].US_CODEUSAGE))
                        ObjetEnvoie[Idx].US_CODEUSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GE_CODEGENRE))
                        ObjetEnvoie[Idx].GE_CODEGENRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TVH_CODETYPE))
                        ObjetEnvoie[Idx].TVH_CODETYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENERGIE))
                        ObjetEnvoie[Idx].EN_CODEENERGIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TAUX))
                        ObjetEnvoie[Idx].CA_TAUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TYPE))
                        ObjetEnvoie[Idx].CA_TYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_IMMATRICULATION))
                        ObjetEnvoie[Idx].CA_IMMATRICULATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_PUISSANCEADMISE.ToString()))
                        ObjetEnvoie[Idx].CA_PUISSANCEADMISE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CHARGEUTILE.ToString()))
                        ObjetEnvoie[Idx].CA_CHARGEUTILE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NBREPLACE.ToString()))
                        ObjetEnvoie[Idx].CA_NBREPLACE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALNEUVE.ToString()))
                        ObjetEnvoie[Idx].CA_VALNEUVE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALVENALE.ToString()))
                        ObjetEnvoie[Idx].CA_VALVENALE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEMISECIRCULATION))
                        ObjetEnvoie[Idx].CA_DATEMISECIRCULATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE))
                        ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OPTION))
                        ObjetEnvoie[Idx].CA_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR))
                        ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR))
                        ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESUSPENSION))
                        ObjetEnvoie[Idx].CA_DATESUSPENSION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATECLOTURE))
                        ObjetEnvoie[Idx].CA_DATECLOTURE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATENAISSANCE))
                        ObjetEnvoie[Idx].CA_DATENAISSANCE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATERESILIATION))
                        ObjetEnvoie[Idx].CA_DATERESILIATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DI_CODEDESIGNATION))
                        ObjetEnvoie[Idx].DI_CODEDESIGNATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE))
                        ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE))
                        ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MF_CODEMAINFORTE))
                        ObjetEnvoie[Idx].MF_CODEMAINFORTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE))
                        ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].CA_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPASSEPORT))
                        ObjetEnvoie[Idx].CA_NUMPASSEPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_LOYERMENSUEL.ToString()))
                        ObjetEnvoie[Idx].CA_LOYERMENSUEL = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GR_CODEGARENTIEPRIME))
                        ObjetEnvoie[Idx].GR_CODEGARENTIEPRIME = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DE_CODEDEMANADE))
                        ObjetEnvoie[Idx].DE_CODEDEMANADE = "";


                    if (ObjetEnvoie[Idx].clsCtcontratgaranties != null)
                    foreach (clsCtcontratgarantie clsCtcontratgarantie in ObjetEnvoie[Idx].clsCtcontratgaranties)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.AG_CODEAGENCE))
                            clsCtcontratgarantie.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.EN_CODEENTREPOT))
                            clsCtcontratgarantie.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CA_CODECONTRAT))
                            clsCtcontratgarantie.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.GA_CODEGARANTIE))
                            clsCtcontratgarantie.GA_CODEGARANTIE = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_CAPITAUXASSURES.ToString()))
                            clsCtcontratgarantie.CG_CAPITAUXASSURES = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRIMES.ToString()))
                            clsCtcontratgarantie.CG_PRIMES = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_APRESREDUCTION.ToString()))
                            clsCtcontratgarantie.CG_APRESREDUCTION = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRORATA.ToString()))
                            clsCtcontratgarantie.CG_PRORATA = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_FRANCHISES))
                            clsCtcontratgarantie.CG_FRANCHISES = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_TAUX))
                            clsCtcontratgarantie.CG_TAUX = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_MONTANT.ToString()))
                            clsCtcontratgarantie.CG_MONTANT = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_LIBELLE))
                            clsCtcontratgarantie.CG_LIBELLE = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEECRAN))
                            clsCtcontratgarantie.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEMOUCHARD))
                            clsCtcontratgarantie.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.TYPEOPERATION))
                            clsCtcontratgarantie.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.LG_CODELANGUE))
                            clsCtcontratgarantie.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratgarantie.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratgarantie.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();
                            
                            clsCtcontratgarantie.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratgarantie.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratprimes != null)
                    foreach (clsCtcontratprime clsCtcontratprime in ObjetEnvoie[Idx].clsCtcontratprimes)
                    {
                        
                        if (string.IsNullOrEmpty(clsCtcontratprime.AG_CODEAGENCE))
                            clsCtcontratprime.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.EN_CODEENTREPOT))
                            clsCtcontratprime.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.CA_CODECONTRAT))
                            clsCtcontratprime.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.RE_CODERESUME))
                            clsCtcontratprime.RE_CODERESUME = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.CP_VALEUR.ToString()))
                            clsCtcontratprime.CP_VALEUR = 0;
                        if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEECRAN))
                            clsCtcontratprime.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEMOUCHARD))
                            clsCtcontratprime.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.TYPEOPERATION))
                            clsCtcontratprime.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.LG_CODELANGUE))
                            clsCtcontratprime.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratprime.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratprime.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratprime.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratprime.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratcapitauxs != null)
                        foreach (clsCtcontratcapitaux clsCtcontratcapitaux in ObjetEnvoie[Idx].clsCtcontratcapitauxs)
                        {

                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.AG_CODEAGENCE))
                                clsCtcontratcapitaux.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.EN_CODEENTREPOT))
                                clsCtcontratcapitaux.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CA_CODECONTRAT))
                                clsCtcontratcapitaux.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CP_CODECAPITAUX))
                                clsCtcontratcapitaux.CP_CODECAPITAUX = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_CAPITAUX.ToString()))
                                clsCtcontratcapitaux.CC_CAPITAUX = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_TAUX))
                                clsCtcontratcapitaux.CC_TAUX = "0";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_PRIMES.ToString()))
                                clsCtcontratcapitaux.CC_PRIMES = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEECRAN))
                                clsCtcontratcapitaux.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEMOUCHARD))
                                clsCtcontratcapitaux.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.TYPEOPERATION))
                                clsCtcontratcapitaux.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.LG_CODELANGUE))
                                clsCtcontratcapitaux.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratcapitaux.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratcapitaux.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratcapitaux.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratcapitaux.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratreductions!=null)
                    foreach (clsCtcontratreduction clsCtcontratreduction in ObjetEnvoie[Idx].clsCtcontratreductions)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratreduction.AG_CODEAGENCE))
                            clsCtcontratreduction.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.EN_CODEENTREPOT))
                            clsCtcontratreduction.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.CA_CODECONTRAT))
                            clsCtcontratreduction.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_CODEREDUCTION))
                            clsCtcontratreduction.RD_CODEREDUCTION = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_TAUX))
                            clsCtcontratreduction.RD_TAUX = "0";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_MONTANT.ToString()))
                            clsCtcontratreduction.RD_MONTANT = 0;
                        if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEECRAN))
                            clsCtcontratreduction.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEMOUCHARD))
                            clsCtcontratreduction.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.TYPEOPERATION))
                            clsCtcontratreduction.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.LG_CODELANGUE))
                            clsCtcontratreduction.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratreduction.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratreduction.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratreduction.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratreduction.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratayantdroits != null)
                    foreach (clsCtcontratayantdroit clsCtcontratayantdroit in ObjetEnvoie[Idx].clsCtcontratayantdroits)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AG_CODEAGENCE))
                            clsCtcontratayantdroit.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.EN_CODEENTREPOT))
                            clsCtcontratayantdroit.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.CA_CODECONTRAT))
                            clsCtcontratayantdroit.CA_CODECONTRAT = "";
                        //if (string.IsNullOrEmpty(clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT))
                        //    clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                            clsCtcontratayantdroit.AY_DATESAISIE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_INDEX))
                            clsCtcontratayantdroit.AY_INDEX = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                            clsCtcontratayantdroit.AY_DATECLOTURE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.TA_CODETITREAYANTDROIT))
                            clsCtcontratayantdroit.TA_CODETITREAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.OP_CODEOPERATEUR))
                            clsCtcontratayantdroit.OP_CODEOPERATEUR = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEECRAN))
                            clsCtcontratayantdroit.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEMOUCHARD))
                            clsCtcontratayantdroit.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.TYPEOPERATION))
                            clsCtcontratayantdroit.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.LG_CODELANGUE))
                            clsCtcontratayantdroit.LG_CODELANGUE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT))
                            clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                            clsCtcontratayantdroit.AY_DATESAISIE = "01-01-1900";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                            clsCtcontratayantdroit.AY_DATECLOTURE = "01-01-1900";

                            //debut recuperation des parametres de connexion
                        //    clsCtcontratayantdroit.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratayantdroit.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratayantdroit.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratayantdroit.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_MISE_A_JOUR_CONTRAT, Tokken).ToList();
                    if((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }


        public JsonResult AjoutContratrenouvellement(List<HT_Assurance.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontrat clsCtcontrat = new HT_Assurance.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontrat ObjetRetour = new HT_Assurance.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontrat> clsCtcontrats = new List<HT_Assurance.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMSERIE))
                        ObjetEnvoie[Idx].CA_NUMSERIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CD_CODECONDITION))
                        ObjetEnvoie[Idx].CD_CODECONDITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DUREEENMOIS.ToString()))
                        ObjetEnvoie[Idx].CA_DUREEENMOIS = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_SPORT))
                        ObjetEnvoie[Idx].AC_SPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_ADRESSE))
                        ObjetEnvoie[Idx].CA_ADRESSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE))
                        ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT))
                        ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT))
                        ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CB_IDBRANCHE))
                        ObjetEnvoie[Idx].CB_IDBRANCHE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEEFFET))
                        ObjetEnvoie[Idx].CA_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEECHEANCE))
                        ObjetEnvoie[Idx].CA_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_AVENANT))
                        ObjetEnvoie[Idx].CA_AVENANT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONDITIONHABITUEL))
                        ObjetEnvoie[Idx].CA_CONDITIONHABITUEL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF))
                        ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AU_CODECATEGORIE))
                        ObjetEnvoie[Idx].AU_CODECATEGORIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETARIF))
                        ObjetEnvoie[Idx].TA_CODETARIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].US_CODEUSAGE))
                        ObjetEnvoie[Idx].US_CODEUSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GE_CODEGENRE))
                        ObjetEnvoie[Idx].GE_CODEGENRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TVH_CODETYPE))
                        ObjetEnvoie[Idx].TVH_CODETYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENERGIE))
                        ObjetEnvoie[Idx].EN_CODEENERGIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TAUX))
                        ObjetEnvoie[Idx].CA_TAUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TYPE))
                        ObjetEnvoie[Idx].CA_TYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_IMMATRICULATION))
                        ObjetEnvoie[Idx].CA_IMMATRICULATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_PUISSANCEADMISE.ToString()))
                        ObjetEnvoie[Idx].CA_PUISSANCEADMISE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CHARGEUTILE.ToString()))
                        ObjetEnvoie[Idx].CA_CHARGEUTILE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NBREPLACE.ToString()))
                        ObjetEnvoie[Idx].CA_NBREPLACE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALNEUVE.ToString()))
                        ObjetEnvoie[Idx].CA_VALNEUVE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALVENALE.ToString()))
                        ObjetEnvoie[Idx].CA_VALVENALE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEMISECIRCULATION))
                        ObjetEnvoie[Idx].CA_DATEMISECIRCULATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE))
                        ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OPTION))
                        ObjetEnvoie[Idx].CA_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR))
                        ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR))
                        ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESUSPENSION))
                        ObjetEnvoie[Idx].CA_DATESUSPENSION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATECLOTURE))
                        ObjetEnvoie[Idx].CA_DATECLOTURE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATENAISSANCE))
                        ObjetEnvoie[Idx].CA_DATENAISSANCE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATERESILIATION))
                        ObjetEnvoie[Idx].CA_DATERESILIATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DI_CODEDESIGNATION))
                        ObjetEnvoie[Idx].DI_CODEDESIGNATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE))
                        ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE))
                        ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MF_CODEMAINFORTE))
                        ObjetEnvoie[Idx].MF_CODEMAINFORTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE))
                        ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].CA_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPASSEPORT))
                        ObjetEnvoie[Idx].CA_NUMPASSEPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";

                    if (ObjetEnvoie[Idx].clsCtcontratgaranties != null)
                        foreach (clsCtcontratgarantie clsCtcontratgarantie in ObjetEnvoie[Idx].clsCtcontratgaranties)
                        {
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.AG_CODEAGENCE))
                                clsCtcontratgarantie.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.EN_CODEENTREPOT))
                                clsCtcontratgarantie.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CA_CODECONTRAT))
                                clsCtcontratgarantie.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.GA_CODEGARANTIE))
                                clsCtcontratgarantie.GA_CODEGARANTIE = "0";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_CAPITAUXASSURES.ToString()))
                                clsCtcontratgarantie.CG_CAPITAUXASSURES = 0;
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRIMES.ToString()))
                                clsCtcontratgarantie.CG_PRIMES = 0;
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_APRESREDUCTION.ToString()))
                                clsCtcontratgarantie.CG_APRESREDUCTION = 0;
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRORATA.ToString()))
                                clsCtcontratgarantie.CG_PRORATA = 0;
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_FRANCHISES))
                                clsCtcontratgarantie.CG_FRANCHISES = "0";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_TAUX))
                                clsCtcontratgarantie.CG_TAUX = "0";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_MONTANT.ToString()))
                                clsCtcontratgarantie.CG_MONTANT = 0;
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_LIBELLE))
                                clsCtcontratgarantie.CG_LIBELLE = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEECRAN))
                                clsCtcontratgarantie.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEMOUCHARD))
                                clsCtcontratgarantie.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.TYPEOPERATION))
                                clsCtcontratgarantie.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratgarantie.LG_CODELANGUE))
                                clsCtcontratgarantie.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratgarantie.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratgarantie.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratgarantie.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratgarantie.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratprimes != null)
                        foreach (clsCtcontratprime clsCtcontratprime in ObjetEnvoie[Idx].clsCtcontratprimes)
                        {

                            if (string.IsNullOrEmpty(clsCtcontratprime.AG_CODEAGENCE))
                                clsCtcontratprime.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.EN_CODEENTREPOT))
                                clsCtcontratprime.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.CA_CODECONTRAT))
                                clsCtcontratprime.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.RE_CODERESUME))
                                clsCtcontratprime.RE_CODERESUME = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.CP_VALEUR.ToString()))
                                clsCtcontratprime.CP_VALEUR = 0;
                            if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEECRAN))
                                clsCtcontratprime.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEMOUCHARD))
                                clsCtcontratprime.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.TYPEOPERATION))
                                clsCtcontratprime.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.LG_CODELANGUE))
                                clsCtcontratprime.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratprime.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratprime.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratprime.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratprime.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratcapitauxs != null)
                        foreach (clsCtcontratcapitaux clsCtcontratcapitaux in ObjetEnvoie[Idx].clsCtcontratcapitauxs)
                        {

                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.AG_CODEAGENCE))
                                clsCtcontratcapitaux.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.EN_CODEENTREPOT))
                                clsCtcontratcapitaux.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CA_CODECONTRAT))
                                clsCtcontratcapitaux.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CP_CODECAPITAUX))
                                clsCtcontratcapitaux.CP_CODECAPITAUX = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_CAPITAUX.ToString()))
                                clsCtcontratcapitaux.CC_CAPITAUX = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_TAUX))
                                clsCtcontratcapitaux.CC_TAUX = "0";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_PRIMES.ToString()))
                                clsCtcontratcapitaux.CC_PRIMES = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEECRAN))
                                clsCtcontratcapitaux.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEMOUCHARD))
                                clsCtcontratcapitaux.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.TYPEOPERATION))
                                clsCtcontratcapitaux.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.LG_CODELANGUE))
                                clsCtcontratcapitaux.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratcapitaux.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratcapitaux.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratcapitaux.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratcapitaux.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratreductions != null)
                        foreach (clsCtcontratreduction clsCtcontratreduction in ObjetEnvoie[Idx].clsCtcontratreductions)
                        {
                            if (string.IsNullOrEmpty(clsCtcontratreduction.AG_CODEAGENCE))
                                clsCtcontratreduction.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.EN_CODEENTREPOT))
                                clsCtcontratreduction.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.CA_CODECONTRAT))
                                clsCtcontratreduction.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.RD_CODEREDUCTION))
                                clsCtcontratreduction.RD_CODEREDUCTION = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.RD_TAUX))
                                clsCtcontratreduction.RD_TAUX = "0";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.RD_MONTANT.ToString()))
                                clsCtcontratreduction.RD_MONTANT = 0;
                            if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEECRAN))
                                clsCtcontratreduction.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEMOUCHARD))
                                clsCtcontratreduction.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.TYPEOPERATION))
                                clsCtcontratreduction.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratreduction.LG_CODELANGUE))
                                clsCtcontratreduction.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratreduction.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratreduction.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratreduction.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratreduction.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratayantdroits != null)
                        foreach (clsCtcontratayantdroit clsCtcontratayantdroit in ObjetEnvoie[Idx].clsCtcontratayantdroits)
                        {
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AG_CODEAGENCE))
                                clsCtcontratayantdroit.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.EN_CODEENTREPOT))
                                clsCtcontratayantdroit.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.CA_CODECONTRAT))
                                clsCtcontratayantdroit.CA_CODECONTRAT = "";
                            //if (string.IsNullOrEmpty(clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT))
                            //    clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                                clsCtcontratayantdroit.AY_DATESAISIE = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_INDEX))
                                clsCtcontratayantdroit.AY_INDEX = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                                clsCtcontratayantdroit.AY_DATECLOTURE = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.TA_CODETITREAYANTDROIT))
                                clsCtcontratayantdroit.TA_CODETITREAYANTDROIT = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.OP_CODEOPERATEUR))
                                clsCtcontratayantdroit.OP_CODEOPERATEUR = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEECRAN))
                                clsCtcontratayantdroit.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEMOUCHARD))
                                clsCtcontratayantdroit.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.TYPEOPERATION))
                                clsCtcontratayantdroit.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.LG_CODELANGUE))
                                clsCtcontratayantdroit.LG_CODELANGUE = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT))
                                clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT = "";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                                clsCtcontratayantdroit.AY_DATESAISIE = "01-01-1900";
                            if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                                clsCtcontratayantdroit.AY_DATECLOTURE = "01-01-1900";

                            //debut recuperation des parametres de connexion
                            //    clsCtcontratayantdroit.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratayantdroit.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratayantdroit.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratayantdroit.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_RENOUVELLEMENTCONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //AJOUT OBSERVATION
        public JsonResult AjoutObservation(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                   

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OBSERVATION))
                        ObjetEnvoie[Idx].CA_OBSERVATION = "";
                         if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMSERIE))
                        ObjetEnvoie[Idx].CA_NUMSERIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CD_CODECONDITION))
                        ObjetEnvoie[Idx].CD_CODECONDITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DUREEENMOIS.ToString()))
                        ObjetEnvoie[Idx].CA_DUREEENMOIS = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_SPORT))
                        ObjetEnvoie[Idx].AC_SPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_ADRESSE))
                        ObjetEnvoie[Idx].CA_ADRESSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE))
                        ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT))
                        ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT))
                        ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CB_IDBRANCHE))
                        ObjetEnvoie[Idx].CB_IDBRANCHE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEEFFET))
                        ObjetEnvoie[Idx].CA_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEECHEANCE))
                        ObjetEnvoie[Idx].CA_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_AVENANT))
                        ObjetEnvoie[Idx].CA_AVENANT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONDITIONHABITUEL))
                        ObjetEnvoie[Idx].CA_CONDITIONHABITUEL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF))
                        ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AU_CODECATEGORIE))
                        ObjetEnvoie[Idx].AU_CODECATEGORIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETARIF))
                        ObjetEnvoie[Idx].TA_CODETARIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].US_CODEUSAGE))
                        ObjetEnvoie[Idx].US_CODEUSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GE_CODEGENRE))
                        ObjetEnvoie[Idx].GE_CODEGENRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TVH_CODETYPE))
                        ObjetEnvoie[Idx].TVH_CODETYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENERGIE))
                        ObjetEnvoie[Idx].EN_CODEENERGIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TAUX))
                        ObjetEnvoie[Idx].CA_TAUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TYPE))
                        ObjetEnvoie[Idx].CA_TYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_IMMATRICULATION))
                        ObjetEnvoie[Idx].CA_IMMATRICULATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_PUISSANCEADMISE.ToString()))
                        ObjetEnvoie[Idx].CA_PUISSANCEADMISE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CHARGEUTILE.ToString()))
                        ObjetEnvoie[Idx].CA_CHARGEUTILE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NBREPLACE.ToString()))
                        ObjetEnvoie[Idx].CA_NBREPLACE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALNEUVE.ToString()))
                        ObjetEnvoie[Idx].CA_VALNEUVE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALVENALE.ToString()))
                        ObjetEnvoie[Idx].CA_VALVENALE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEMISECIRCULATION))
                        ObjetEnvoie[Idx].CA_DATEMISECIRCULATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE))
                        ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OPTION))
                        ObjetEnvoie[Idx].CA_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR))
                        ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR))
                        ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESUSPENSION))
                        ObjetEnvoie[Idx].CA_DATESUSPENSION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATECLOTURE))
                        ObjetEnvoie[Idx].CA_DATECLOTURE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATENAISSANCE))
                        ObjetEnvoie[Idx].CA_DATENAISSANCE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATERESILIATION))
                        ObjetEnvoie[Idx].CA_DATERESILIATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DI_CODEDESIGNATION))
                        ObjetEnvoie[Idx].DI_CODEDESIGNATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE))
                        ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE))
                        ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MF_CODEMAINFORTE))
                        ObjetEnvoie[Idx].MF_CODEMAINFORTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE))
                        ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].CA_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPASSEPORT))
                        ObjetEnvoie[Idx].CA_NUMPASSEPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";

                    if (ObjetEnvoie[Idx].clsCtcontratgaranties != null)
                    foreach (clsCtcontratgarantie clsCtcontratgarantie in ObjetEnvoie[Idx].clsCtcontratgaranties)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.AG_CODEAGENCE))
                            clsCtcontratgarantie.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.EN_CODEENTREPOT))
                            clsCtcontratgarantie.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CA_CODECONTRAT))
                            clsCtcontratgarantie.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.GA_CODEGARANTIE))
                            clsCtcontratgarantie.GA_CODEGARANTIE = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_CAPITAUXASSURES.ToString()))
                            clsCtcontratgarantie.CG_CAPITAUXASSURES = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRIMES.ToString()))
                            clsCtcontratgarantie.CG_PRIMES = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_APRESREDUCTION.ToString()))
                            clsCtcontratgarantie.CG_APRESREDUCTION = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_PRORATA.ToString()))
                            clsCtcontratgarantie.CG_PRORATA = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_FRANCHISES))
                            clsCtcontratgarantie.CG_FRANCHISES = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_TAUX))
                            clsCtcontratgarantie.CG_TAUX = "0";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_MONTANT.ToString()))
                            clsCtcontratgarantie.CG_MONTANT = 0;
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.CG_LIBELLE))
                            clsCtcontratgarantie.CG_LIBELLE = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEECRAN))
                            clsCtcontratgarantie.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.SL_LIBELLEMOUCHARD))
                            clsCtcontratgarantie.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.TYPEOPERATION))
                            clsCtcontratgarantie.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratgarantie.LG_CODELANGUE))
                            clsCtcontratgarantie.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratgarantie.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratgarantie.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();
                            
                            clsCtcontratgarantie.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratgarantie.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratprimes != null)
                    foreach (clsCtcontratprime clsCtcontratprime in ObjetEnvoie[Idx].clsCtcontratprimes)
                    {
                        
                        if (string.IsNullOrEmpty(clsCtcontratprime.AG_CODEAGENCE))
                            clsCtcontratprime.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.EN_CODEENTREPOT))
                            clsCtcontratprime.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.CA_CODECONTRAT))
                            clsCtcontratprime.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.RE_CODERESUME))
                            clsCtcontratprime.RE_CODERESUME = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.CP_VALEUR.ToString()))
                            clsCtcontratprime.CP_VALEUR = 0;
                        if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEECRAN))
                            clsCtcontratprime.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEMOUCHARD))
                            clsCtcontratprime.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.TYPEOPERATION))
                            clsCtcontratprime.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratprime.LG_CODELANGUE))
                            clsCtcontratprime.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratprime.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratprime.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratprime.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratprime.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratcapitauxs != null)
                        foreach (clsCtcontratcapitaux clsCtcontratcapitaux in ObjetEnvoie[Idx].clsCtcontratcapitauxs)
                        {

                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.AG_CODEAGENCE))
                                clsCtcontratcapitaux.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.EN_CODEENTREPOT))
                                clsCtcontratcapitaux.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CA_CODECONTRAT))
                                clsCtcontratcapitaux.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CP_CODECAPITAUX))
                                clsCtcontratcapitaux.CP_CODECAPITAUX = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_CAPITAUX.ToString()))
                                clsCtcontratcapitaux.CC_CAPITAUX = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_TAUX))
                                clsCtcontratcapitaux.CC_TAUX = "0";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.CC_PRIMES.ToString()))
                                clsCtcontratcapitaux.CC_PRIMES = 0;
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEECRAN))
                                clsCtcontratcapitaux.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.SL_LIBELLEMOUCHARD))
                                clsCtcontratcapitaux.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.TYPEOPERATION))
                                clsCtcontratcapitaux.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratcapitaux.LG_CODELANGUE))
                                clsCtcontratcapitaux.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratcapitaux.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratcapitaux.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratcapitaux.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratcapitaux.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratreductions!=null)
                    foreach (clsCtcontratreduction clsCtcontratreduction in ObjetEnvoie[Idx].clsCtcontratreductions)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratreduction.AG_CODEAGENCE))
                            clsCtcontratreduction.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.EN_CODEENTREPOT))
                            clsCtcontratreduction.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.CA_CODECONTRAT))
                            clsCtcontratreduction.CA_CODECONTRAT = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_CODEREDUCTION))
                            clsCtcontratreduction.RD_CODEREDUCTION = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_TAUX))
                            clsCtcontratreduction.RD_TAUX = "0";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.RD_MONTANT.ToString()))
                            clsCtcontratreduction.RD_MONTANT = 0;
                        if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEECRAN))
                            clsCtcontratreduction.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.SL_LIBELLEMOUCHARD))
                            clsCtcontratreduction.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.TYPEOPERATION))
                            clsCtcontratreduction.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratreduction.LG_CODELANGUE))
                            clsCtcontratreduction.LG_CODELANGUE = "";

                        //debut recuperation des parametres de connexion
                        //clsCtcontratreduction.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratreduction.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratreduction.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratreduction.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    if (ObjetEnvoie[Idx].clsCtcontratayantdroits != null)
                    foreach (clsCtcontratayantdroit clsCtcontratayantdroit in ObjetEnvoie[Idx].clsCtcontratayantdroits)
                    {
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AG_CODEAGENCE))
                            clsCtcontratayantdroit.AG_CODEAGENCE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.EN_CODEENTREPOT))
                            clsCtcontratayantdroit.EN_CODEENTREPOT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.CA_CODECONTRAT))
                            clsCtcontratayantdroit.CA_CODECONTRAT = "";
                        //if (string.IsNullOrEmpty(clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT))
                        //    clsCtcontratayantdroit.TI_IDTIERSAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                            clsCtcontratayantdroit.AY_DATESAISIE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_INDEX))
                            clsCtcontratayantdroit.AY_INDEX = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                            clsCtcontratayantdroit.AY_DATECLOTURE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.TA_CODETITREAYANTDROIT))
                            clsCtcontratayantdroit.TA_CODETITREAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.OP_CODEOPERATEUR))
                            clsCtcontratayantdroit.OP_CODEOPERATEUR = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEECRAN))
                            clsCtcontratayantdroit.SL_LIBELLEECRAN = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.SL_LIBELLEMOUCHARD))
                            clsCtcontratayantdroit.SL_LIBELLEMOUCHARD = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.TYPEOPERATION))
                            clsCtcontratayantdroit.TYPEOPERATION = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.LG_CODELANGUE))
                            clsCtcontratayantdroit.LG_CODELANGUE = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT))
                            clsCtcontratayantdroit.AY_DENOMMINATIONAYANTDROIT = "";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATESAISIE))
                            clsCtcontratayantdroit.AY_DATESAISIE = "01-01-1900";
                        if (string.IsNullOrEmpty(clsCtcontratayantdroit.AY_DATECLOTURE))
                            clsCtcontratayantdroit.AY_DATECLOTURE = "01-01-1900";

                            //debut recuperation des parametres de connexion
                        //    clsCtcontratayantdroit.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                        //clsCtcontratayantdroit.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratayantdroit.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratayantdroit.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_OBSERVATION, Tokken).ToList();
                    if((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //AJOUT OBSERVATION
        public JsonResult EXTOURNEOPERATION(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OBSERVATION))
                        ObjetEnvoie[Idx].CA_OBSERVATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMSERIE))
                        ObjetEnvoie[Idx].CA_NUMSERIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CD_CODECONDITION))
                        ObjetEnvoie[Idx].CD_CODECONDITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DUREEENMOIS.ToString()))
                        ObjetEnvoie[Idx].CA_DUREEENMOIS = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_SPORT))
                        ObjetEnvoie[Idx].AC_SPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_ADRESSE))
                        ObjetEnvoie[Idx].CA_ADRESSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE))
                        ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT))
                        ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT))
                        ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CB_IDBRANCHE))
                        ObjetEnvoie[Idx].CB_IDBRANCHE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEEFFET))
                        ObjetEnvoie[Idx].CA_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEECHEANCE))
                        ObjetEnvoie[Idx].CA_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_AVENANT))
                        ObjetEnvoie[Idx].CA_AVENANT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONDITIONHABITUEL))
                        ObjetEnvoie[Idx].CA_CONDITIONHABITUEL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF))
                        ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AU_CODECATEGORIE))
                        ObjetEnvoie[Idx].AU_CODECATEGORIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETARIF))
                        ObjetEnvoie[Idx].TA_CODETARIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].US_CODEUSAGE))
                        ObjetEnvoie[Idx].US_CODEUSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GE_CODEGENRE))
                        ObjetEnvoie[Idx].GE_CODEGENRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TVH_CODETYPE))
                        ObjetEnvoie[Idx].TVH_CODETYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENERGIE))
                        ObjetEnvoie[Idx].EN_CODEENERGIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TAUX))
                        ObjetEnvoie[Idx].CA_TAUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TYPE))
                        ObjetEnvoie[Idx].CA_TYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_IMMATRICULATION))
                        ObjetEnvoie[Idx].CA_IMMATRICULATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_PUISSANCEADMISE.ToString()))
                        ObjetEnvoie[Idx].CA_PUISSANCEADMISE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CHARGEUTILE.ToString()))
                        ObjetEnvoie[Idx].CA_CHARGEUTILE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NBREPLACE.ToString()))
                        ObjetEnvoie[Idx].CA_NBREPLACE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALNEUVE.ToString()))
                        ObjetEnvoie[Idx].CA_VALNEUVE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALVENALE.ToString()))
                        ObjetEnvoie[Idx].CA_VALVENALE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEMISECIRCULATION))
                        ObjetEnvoie[Idx].CA_DATEMISECIRCULATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE))
                        ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OPTION))
                        ObjetEnvoie[Idx].CA_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR))
                        ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR))
                        ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESUSPENSION))
                        ObjetEnvoie[Idx].CA_DATESUSPENSION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATECLOTURE))
                        ObjetEnvoie[Idx].CA_DATECLOTURE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATENAISSANCE))
                        ObjetEnvoie[Idx].CA_DATENAISSANCE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATERESILIATION))
                        ObjetEnvoie[Idx].CA_DATERESILIATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DI_CODEDESIGNATION))
                        ObjetEnvoie[Idx].DI_CODEDESIGNATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE))
                        ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE))
                        ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MF_CODEMAINFORTE))
                        ObjetEnvoie[Idx].MF_CODEMAINFORTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE))
                        ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE = "";

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_LIEUNAISSANCE))
                        ObjetEnvoie[Idx].CA_LIEUNAISSANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPASSEPORT))
                        ObjetEnvoie[Idx].CA_NUMPASSEPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].PF_CODEPROFESSION))
                        ObjetEnvoie[Idx].PF_CODEPROFESSION = "";

                   
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_ANNULEFACTUREEXTOURNE, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //AJOUT OBSERVATION
        public JsonResult MODIFICATIONPRIME(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                    

                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MS_NUMPIECE))
                        ObjetEnvoie[Idx].MS_NUMPIECE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "";

                    if (ObjetEnvoie[Idx].clsCtcontratprimes != null)
                        foreach (clsCtcontratprime clsCtcontratprime in ObjetEnvoie[Idx].clsCtcontratprimes)
                        {

                            if (string.IsNullOrEmpty(clsCtcontratprime.AG_CODEAGENCE))
                                clsCtcontratprime.AG_CODEAGENCE = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.EN_CODEENTREPOT))
                                clsCtcontratprime.EN_CODEENTREPOT = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.CA_CODECONTRAT))
                                clsCtcontratprime.CA_CODECONTRAT = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.RE_CODERESUME))
                                clsCtcontratprime.RE_CODERESUME = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.CP_VALEUR.ToString()))
                                clsCtcontratprime.CP_VALEUR = 0;
                            if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEECRAN))
                                clsCtcontratprime.SL_LIBELLEECRAN = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.SL_LIBELLEMOUCHARD))
                                clsCtcontratprime.SL_LIBELLEMOUCHARD = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.TYPEOPERATION))
                                clsCtcontratprime.TYPEOPERATION = "";
                            if (string.IsNullOrEmpty(clsCtcontratprime.LG_CODELANGUE))
                                clsCtcontratprime.LG_CODELANGUE = "";

                            //debut recuperation des parametres de connexion
                            //clsCtcontratprime.AG_CODEAGENCE = Session["AG_CODEAGENCE"].ToString();
                            //clsCtcontratprime.EN_CODEENTREPOT = Session["EN_CODEENTREPOT"].ToString();

                            clsCtcontratprime.AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                            clsCtcontratprime.EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                            //fin recuperation des parametres de connexion
                        }
                    
                    
                    //fin traitement des criteres de recherche non obligatoire
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_MISEAJOURPRIME, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }
       
        //BLOC LISTE
        public JsonResult ListeContrat(List<HT_Assurance.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontrat clsCtcontrat = new HT_Assurance.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontrat ObjetRetour = new HT_Assurance.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontrat> clsCtcontrats = new List<HT_Assurance.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if(string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                    ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                       ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_SELECT_CONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListeDemandeContrat(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_DEMANDECONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //BLOC LISTE
        public JsonResult ListestatutDemandeContrat(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_STATUTCONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }


        //BLOC LISTE
        public JsonResult ListeAvisdeReglement(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_AVISDEREGLEMENTPRIME, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListeContratSansAccessoir(List<HT_Assurance.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Assurance.clsCtcontrat clsCtcontrat = new HT_Assurance.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Assurance.clsCtcontrat ObjetRetour = new HT_Assurance.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Assurance.clsCtcontrat> clsCtcontrats = new List<HT_Assurance.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {


                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                    ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }


                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_SELECT_CONTRAT_SANS_ACCESSOIR, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //BLOC SUPPRESSION
        public JsonResult SuppressionContrat(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
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
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_DELETE_CONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
        }

        //BLOC TRANSMISSION ET VALIDATION
        public JsonResult TransValidContrat(List<HT_Stock.BOJ.clsCtcontrat> ObjetEnvoie)
        {
            string Tokken = "";//Request.Headers.Authorization.ToString();  //Tokken du client qui demande le service web
            HT_Stock.BOJ.clsCtcontrat clsCtcontrat = new HT_Stock.BOJ.clsCtcontrat();  //Déclaration d'une instance de l'objet equipe_operateurs
            HT_Stock.BOJ.clsCtcontrat ObjetRetour = new HT_Stock.BOJ.clsCtcontrat(); //Conteneur de la réponse de l'appel du service web
            clsCtcontrat.clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            Stock.Common.clsObjetRetour clsObjetRetour = new Stock.Common.clsObjetRetour(); //Déclaration d'une instance de l'objet de retour
            List<HT_Stock.BOJ.clsCtcontrat> clsCtcontrats = new List<HT_Stock.BOJ.clsCtcontrat>(); //Déclaration d'une liste d'instance de l'objet equipe_operateurs
            Core.clsDate.ClasseDate.pvgFormatDateCultureInfo(); //Format de la date fr-FR

            try
            {
                for (int Idx = 0; Idx < ObjetEnvoie.Count; Idx++)
                {
                    //debut traitement des criteres de recherche non obligatoire
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATION))
                        ObjetEnvoie[Idx].TI_DENOMINATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_NUMTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_DENOMINATIONCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_NUMTIERS))
                        ObjetEnvoie[Idx].TI_NUMTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AG_CODEAGENCE))
                        ObjetEnvoie[Idx].AG_CODEAGENCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENTREPOT))
                        ObjetEnvoie[Idx].EN_CODEENTREPOT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMPOLICE))
                        ObjetEnvoie[Idx].CA_NUMPOLICE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESAISIE))
                        ObjetEnvoie[Idx].CA_DATESAISIE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERS))
                        ObjetEnvoie[Idx].TI_IDTIERS = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NUMSERIE))
                        ObjetEnvoie[Idx].CA_NUMSERIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CD_CODECONDITION))
                        ObjetEnvoie[Idx].CD_CODECONDITION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DUREEENMOIS.ToString()))
                        ObjetEnvoie[Idx].CA_DUREEENMOIS = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AC_SPORT))
                        ObjetEnvoie[Idx].AC_SPORT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_ADRESSE))
                        ObjetEnvoie[Idx].CA_ADRESSE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE))
                        ObjetEnvoie[Idx].IT_CODEINTERMEDIAIRE = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT))
                        ObjetEnvoie[Idx].AP_CODETYPEAPPARTEMENT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT))
                        ObjetEnvoie[Idx].OC_CODETYPEOCCUPANT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZA_CODEZONEAUTO))
                        ObjetEnvoie[Idx].ZA_CODEZONEAUTO = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CB_IDBRANCHE))
                        ObjetEnvoie[Idx].CB_IDBRANCHE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEEFFET))
                        ObjetEnvoie[Idx].CA_DATEEFFET = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEECHEANCE))
                        ObjetEnvoie[Idx].CA_DATEECHEANCE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].OP_CODEOPERATEUR))
                        ObjetEnvoie[Idx].OP_CODEOPERATEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_AVENANT))
                        ObjetEnvoie[Idx].CA_AVENANT = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE))
                        ObjetEnvoie[Idx].CA_SITUATIONGEOGRAPHIQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONDITIONHABITUEL))
                        ObjetEnvoie[Idx].CA_CONDITIONHABITUEL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF))
                        ObjetEnvoie[Idx].ST_CODESTATUTSOCIOPROF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].AU_CODECATEGORIE))
                        ObjetEnvoie[Idx].AU_CODECATEGORIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETARIF))
                        ObjetEnvoie[Idx].TA_CODETARIF = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].US_CODEUSAGE))
                        ObjetEnvoie[Idx].US_CODEUSAGE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].GE_CODEGENRE))
                        ObjetEnvoie[Idx].GE_CODEGENRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TVH_CODETYPE))
                        ObjetEnvoie[Idx].TVH_CODETYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].EN_CODEENERGIE))
                        ObjetEnvoie[Idx].EN_CODEENERGIE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TAUX))
                        ObjetEnvoie[Idx].CA_TAUX = "0";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_TYPE))
                        ObjetEnvoie[Idx].CA_TYPE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_IMMATRICULATION))
                        ObjetEnvoie[Idx].CA_IMMATRICULATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_PUISSANCEADMISE.ToString()))
                        ObjetEnvoie[Idx].CA_PUISSANCEADMISE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CHARGEUTILE.ToString()))
                        ObjetEnvoie[Idx].CA_CHARGEUTILE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NBREPLACE.ToString()))
                        ObjetEnvoie[Idx].CA_NBREPLACE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALNEUVE.ToString()))
                        ObjetEnvoie[Idx].CA_VALNEUVE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_VALVENALE.ToString()))
                        ObjetEnvoie[Idx].CA_VALVENALE = 0;
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRAT))
                        ObjetEnvoie[Idx].CA_CODECONTRAT = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEMISECIRCULATION))
                        ObjetEnvoie[Idx].CA_DATEMISECIRCULATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE))
                        ObjetEnvoie[Idx].CA_CLIENTEXONERETAXE = "N";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_OPTION))
                        ObjetEnvoie[Idx].CA_OPTION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL))
                        ObjetEnvoie[Idx].TI_IDTIERSCOMMERCIAL = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TI_IDTIERSASSUREUR))
                        ObjetEnvoie[Idx].TI_IDTIERSASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR))
                        ObjetEnvoie[Idx].CA_DATETRANSMISSIONAASSUREUR = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR))
                        ObjetEnvoie[Idx].CA_DATEVALIDATIONASSUREUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATESUSPENSION))
                        ObjetEnvoie[Idx].CA_DATESUSPENSION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATECLOTURE))
                        ObjetEnvoie[Idx].CA_DATECLOTURE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATENAISSANCE))
                        ObjetEnvoie[Idx].CA_DATENAISSANCE = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_DATERESILIATION))
                        ObjetEnvoie[Idx].CA_DATERESILIATION = "01-01-1900";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_NOMINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR))
                        ObjetEnvoie[Idx].CA_CONTACTINTERLOCUTEUR = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].DI_CODEDESIGNATION))
                        ObjetEnvoie[Idx].DI_CODEDESIGNATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE))
                        ObjetEnvoie[Idx].TA_CODETYPECONTRATSANTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE))
                        ObjetEnvoie[Idx].CA_CODECONTRATSECONDAIRE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].CO_CODECOMMUNE))
                        ObjetEnvoie[Idx].CO_CODECOMMUNE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].RQ_CODERISQUE))
                        ObjetEnvoie[Idx].RQ_CODERISQUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES))
                        ObjetEnvoie[Idx].TA_CODETYPEAFFAIRES = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].SL_LIBELLEECRAN))
                        ObjetEnvoie[Idx].SL_LIBELLEMOUCHARD = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].TYPEOPERATION))
                        ObjetEnvoie[Idx].TYPEOPERATION = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].LG_CODELANGUE))
                        ObjetEnvoie[Idx].LG_CODELANGUE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].MF_CODEMAINFORTE))
                        ObjetEnvoie[Idx].MF_CODEMAINFORTE = "";
                    if (string.IsNullOrEmpty(ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE))
                        ObjetEnvoie[Idx].ZM_CODEZONEVOYAGE = "";
                    //fin traitement des criteres de recherche non obligatoire

                    //debut recuperation des parametres de connexion
                    ObjetEnvoie[Idx].OP_CODEOPERATEUR = ObjetEnvoie[0].clsObjetEnvoi.OE_Y;
                   ObjetEnvoie[Idx].AG_CODEAGENCE = ObjetEnvoie[0].clsObjetEnvoi.OE_A;
                    ObjetEnvoie[Idx].EN_CODEENTREPOT = ObjetEnvoie[0].clsObjetEnvoi.OE_E;
                    //fin recuperation des parametres de connexion
                }

                Assurance.Outils.clsDeclaration.TestConnexionServeur = Core.clsAppelServiceWeb.IsNetworkConnected(); //Vérification de la connexion avec la partie serveur
                if (Assurance.Outils.clsDeclaration.TestConnexionServeur == true) //Opération a realiser si la connnexion est établie
                {
                    //appelle du service web de generation de la liste des equipe_operateurs personnels et affectation a la variable retour
                    clsCtcontrats = Core.clsAppelServiceWeb.ExecuteServiceWeb(ObjetRetour, ObjetEnvoie, Core.clsDeclaration.METHOD, 0, Assurance.Outils.ReferencesWebContrat.URL_TRANS_VALID_CONTRAT, Tokken).ToList();
                    if ((clsCtcontrats == null) || (clsCtcontrats.Count == 0))
                    {
                        clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                        clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                        clsCtcontrat.clsObjetRetour = clsObjetRetour;
                        clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                    }
                }
                else
                {
                    clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR;  //RESULTAT = FALSE
                    clsObjetRetour.SL_MESSAGE = Core.clsDeclaration.ERR_MSG_CONN;  //MSG = ERREUR DE CONNEXION
                    clsCtcontrat.clsObjetRetour = clsObjetRetour;
                    clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                }
            }
            catch (System.Net.WebException e)  //Exeptions liées au serveur
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(e.GetHashCode().ToString(), e.Message);  //MSG = ERREUR DE SERVEUR
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat);  //Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + e.Message);

            }
            catch (Exception ex)  //Exeptions liées au code
            {
                clsObjetRetour.SL_RESULTAT = Core.clsDeclaration.SL_RESULTAT_ERROR; //RESULTAT = FALSE
                clsObjetRetour.SL_MESSAGE = Core.ErreursMessages.msgErr(ex.GetHashCode().ToString(), ex.Message);  //MSG = ERREUR DE CODE
                clsCtcontrat.clsObjetRetour = clsObjetRetour;
                clsCtcontrats.Add(clsCtcontrat); // Ajout d'une nouvelle instance de la classe a la liste
                Core.clsLog.EcrireDansFichierLog("Error ContratController :" + ex.Message);
            }
            return Json(clsCtcontrats, JsonRequestBehavior.AllowGet);
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