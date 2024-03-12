using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebComboZoneEdition : ReferencesGenerales
    {
        public static string URL_COMBOZONEEDITION = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOTYPEFOURNISSEUR = URL_ROOT_PROJET + "wsPhapartypetiers.svc/";
        public static string URL_EDITIONPARAMETRE = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";
        public static string URL_COMBOEXERCICE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOPERIODICITE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOPERIODE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_ETATASSURANCE = URL_ROOT_EDITION + "wsEditionEtatAssurance.svc/";
        public static string URL_AVISREGLEMENTPRIME = URL_ROOT_EDITION + "wsEditionEtatAssurance.svc/";


        ///URL TEMPLATE
        public static string URL_AVISDEREGLEMENTPRIME = URL_AVISREGLEMENTPRIME + "pvgInsertIntoDatasetEtatAssuranceAvisReglementPrime";
        public static string URL_ETATVENTILLEAFFAIRENOUVELLES = URL_AVISREGLEMENTPRIME + "pvgInsertIntoDatasetEtatAssuranceAppercu";
        public static string URL_SELECT_COMBOZONEEDITION = URL_COMBOZONEEDITION + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_COMBOZONEEDITION + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOTYPEFOURNISSEUR = URL_COMBOTYPEFOURNISSEUR + "pvgChargerDansDataSetPourCombo";
        public static string URL_INSERT_EDITIONPARAMETRE = URL_EDITIONPARAMETRE + "pvgInsertIntoDatasetEtatEntrepot";
        public static string URL_SELECT_COMBOEXERCICE = URL_COMBOEXERCICE + "pvgInsertIntoDatasetExercice";
        public static string URL_SELECT_COMBOPERIODICITE = URL_COMBOZONEEDITION + "pvgInsertIntoDatasetPeriodicite";
        public static string URL_SELECT_COMBOPERIODE = URL_COMBOZONEEDITION + "pvgPeriodicite";
        public static string URL_SELECT_LISTE_PARAMETRE1 = URL_EDITIONPARAMETRE + "pvgInsertIntoDatasetEtatParamtre";
        public static string URL_SELECT_LISTE_ETATASSURANCE = URL_ETATASSURANCE + "pvgInsertIntoDatasetEtatAssurance";

        public static string URL_SELECT_LISTE_ETAT_SYNOPTIQUE = URL_ETATASSURANCE + "pvgInsertIntoDatasetEtatSynoptique";


        public static string URL_SELECT_LISTE_ETAT_DES_ENCAISSEMENTS_DIFERES = URL_AVISREGLEMENTPRIME + "pvgInsertIntoDatasetEtatAssuranceEncaissementCheque";
    }
}