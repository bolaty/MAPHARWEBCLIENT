using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionAssurance : ReferencesGenerales
    {
        public static string URL_EDITION_ASSURANCE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOEXERCICE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODICITE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_PERIODE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_EDITIONASSURANCE = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";
        ///URL TEMPLATE
        public static string URL_SELECT_COMBOZONEEDITION = URL_EDITION_ASSURANCE + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_EDITION_ASSURANCE + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOEXERCICE = URL_COMBOEXERCICE + "pvgInsertIntoDatasetExercice";
        public static string URL_SELECT_PERIODICITE = URL_EDITION_ASSURANCE + "pvgInsertIntoDatasetPeriodicite";
        public static string URL_SELECT_PERIODE = URL_EDITION_ASSURANCE + "pvgPeriodicite";
        public static string URL_INSERT_URL_EDITION_ASSURANCE = URL_EDITION_ASSURANCE + "pvgInsertIntoDatasetEtatEntrepot";
        public static string URL_SELECT_DATE_DEBUT_FIN = URL_EDITION_ASSURANCE + "pvgPeriodiciteDateDebutFin";
    }
}