using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebContrat : ReferencesGenerales
    {
        public static string URL_CONTRAT = URL_ROOT_PROJET + "wsCtcontrat.svc/";
        public static string URL_ANNULEFACTURE = URL_ROOT_PROJET + "wsPhamouvementStock.svc/";
        public static string URL_LISTEDEMANDECONTRAT = URL_ROOT_PROJET + "wsCtcontratdemandecreation.svc/";
        public static string URL_LISTEDESTATUTCONTRAT = URL_ROOT_PROJET + "wsCtparcontratstatutdemande.svc/";
        public static string URL_AVISREGLEMENTPRIME = URL_ROOT_EDITION + "wsEditionEtatAssurance.svc/";
        public static string URL_MISEAJOURPRIMECONTRAT = URL_ROOT_PROJET + "wsCtcontrat.svc/";
        ///URL TEMPLATE .svc

        public static string URL_MISE_A_JOUR_CONTRAT = URL_CONTRAT + "pvgMiseAjour";
        public static string URL_SELECT_CONTRAT = URL_CONTRAT + "pvgChargerDansDataSet";
        public static string URL_SELECT_CONTRAT_SANS_ACCESSOIR = URL_CONTRAT + "pvgChargerDansDataSetListeContratSansAccessoir";
        public static string URL_DELETE_CONTRAT = URL_CONTRAT + "pvgSupprimer";
        public static string URL_TRANS_VALID_CONTRAT = URL_CONTRAT + "pvgMiseAjourStatutContrat";
        public static string URL_OBSERVATION = URL_CONTRAT + "pvgSaisieObservation";
        public static string URL_RENOUVELLEMENTCONTRAT = URL_CONTRAT + "pvgMiseAjourStatutContrat";
        public static string URL_AJOUTDEPRIME = URL_CONTRAT + "pvgMiseAjourPrimeContrat";
        public static string URL_ANNULEFACTUREEXTOURNE = URL_ANNULEFACTURE + "pvgAnnulationFactureMaphar";
        public static string URL_DEMANDECONTRAT = URL_LISTEDEMANDECONTRAT + "pvgChargerDansDataSet";
        public static string URL_STATUTCONTRAT = URL_LISTEDESTATUTCONTRAT + "pvgChargerDansDataSet";
        public static string URL_AVISDEREGLEMENTPRIME = URL_AVISREGLEMENTPRIME + "pvgInsertIntoDatasetEtatAssuranceAvisReglementPrime";
        public static string URL_MISEAJOURPRIME = URL_MISEAJOURPRIMECONTRAT + "pvgMiseAjourPrimeContrat";

    }
}