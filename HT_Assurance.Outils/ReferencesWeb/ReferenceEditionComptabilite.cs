using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionComptabilite : ReferencesGenerales
    {
        public static string URL_EDITION_COMPTABILTE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOEXERCICE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODICITE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_TYPETIERS = URL_ROOT_PROJET + "wsPhapartypetiers.svc/";
        public static string URL_TYPEARTICLE = URL_ROOT_PROJET + "wsPhapartypearticle.svc/";
        public static string URL_EDITIONCOMPTABILTE = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";

        public static string URL_EDITION_COMPTABILITE_ETAT_1 = URL_ROOT_EDITION + "wsEditionEtatCaisse.svc/";
        public static string URL_EDITION_COMPTABILITE_ETAT_2 = URL_ROOT_EDITION + "wsEditionEtatStock.svc/";

        ///URL TEMPLATE
        public static string URL_SELECT_COMBOZONEEDITION = URL_EDITION_COMPTABILTE + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_EDITION_COMPTABILTE + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOEXERCICE = URL_COMBOEXERCICE + "pvgInsertIntoDatasetExercice";
        public static string URL_SELECT_PERIODICITE = URL_EDITION_COMPTABILTE + "pvgInsertIntoDatasetPeriodicite";
        public static string URL_SELECT_PERIODE = URL_EDITION_COMPTABILTE + "pvgPeriodicite";
        public static string URL_SELECT_TYPETIERS = URL_TYPETIERS + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_TYPEARTICLE = URL_TYPEARTICLE + "pvgChargerDansDataSet";
        public static string URL_INSERT_URL_EDITION_COMPTABILTE = URL_EDITION_COMPTABILTE + "pvgInsertIntoDatasetEtatEntrepot";

        public static string URL_INSERT_EDITION_COMPTABILITE_1 = URL_EDITION_COMPTABILITE_ETAT_1 + "pvgInsertIntoDatasetEtatResultat";
        public static string URL_INSERT_EDITION_COMPTABILITE_1_2 = URL_EDITION_COMPTABILITE_ETAT_1 + "pvgInsertIntoDatasetEtatBrouillard";
        public static string URL_INSERT_EDITION_COMPTABILITE_1_3 = URL_EDITION_COMPTABILITE_ETAT_1 + "pvgInsertIntoDatasetEtatGdLivre";
        public static string URL_INSERT_EDITION_COMPTABILITE_2 = URL_EDITION_COMPTABILITE_ETAT_2 + "pvgInsertIntoDatasetEtatCommande";
    }
}