using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionTresorerie : ReferencesGenerales
    {
        public static string URL_EDITION_TRESORERIE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOEXERCICE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODICITE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_EDITIONTRESORERIE = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";

        public static string URL_EDITIONTRESORERIEETAT1 = URL_ROOT_EDITION + "wsEditionEtatCaisse.svc/";
        public static string URL_EDITIONTRESORERIEETAT2 = URL_ROOT_EDITION + "wsEditionEtatStock.svc/";
        ///URL TEMPLATE
        public static string URL_SELECT_COMBOZONEEDITION = URL_EDITION_TRESORERIE + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_EDITION_TRESORERIE + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOEXERCICE = URL_COMBOEXERCICE + "pvgInsertIntoDatasetExercice";
        public static string URL_SELECT_PERIODICITE = URL_EDITION_TRESORERIE + "pvgInsertIntoDatasetPeriodicite";
        public static string URL_SELECT_PERIODE = URL_EDITION_TRESORERIE + "pvgPeriodicite";
        public static string URL_INSERT_URL_EDITION_TRESORERIE = URL_EDITION_TRESORERIE + "pvgInsertIntoDatasetEtatEntrepot";

        public static string URL_INSERT_EDITION_TRESORERIE_1 = URL_EDITIONTRESORERIEETAT1 + "pvgInsertIntoDatasetEtatBrouillard";
        public static string URL_INSERT_EDITION_TRESORERIE_2 = URL_EDITIONTRESORERIEETAT2 + "pvgInsertIntoDatasetEtatCommande";
    }
}