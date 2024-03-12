using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionParametreII : ReferencesGenerales
    {
        public static string URL_COMBOZONEEDITION = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_EDITIONPARAMETREII = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOTYPETIERS = URL_ROOT_PROJET + "wsPhapartypetiers.svc/";
        public static string URL_COMBOEXERCICE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOPERIODICITE = URL_ROOT_EDITION + "wsEdition.svc/";
        public static string URL_COMBOPERIODE = URL_ROOT_EDITION + "wsEdition.svc/";

        public static string URL_ETAT_PARAMETRE_II_ETAT_PARAM = URL_ROOT_EDITION + "wsEditionEtatParametre.svc/";
        public static string URL_ETAT_PARAMETRE_II_ETAT_IMMO = URL_ROOT_EDITION + "wsEditionEtatImmobilisation.svc/";
        public static string URL_ETAT_PARAMETRE_II_PLAN_COMPT = URL_ROOT_PROJET + "wsPlancomptable.svc/";
        ///URL TEMPLATE
        public static string URL_SELECT_COMBOZONEEDITION = URL_EDITIONPARAMETREII + "pvgInsertIntoDatasetZone";
        public static string URL_SELECT_COMBOSUCCURSALES = URL_EDITIONPARAMETREII + "pvgChargerDansDataSetPourComboAgenceEdition";
        public static string URL_SELECT_COMBOTYPETIERS = URL_COMBOTYPETIERS + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_COMBOEXERCICE = URL_COMBOEXERCICE + "pvgInsertIntoDatasetExercice";
        public static string URL_SELECT_COMBOPERIODICITE = URL_COMBOZONEEDITION + "pvgInsertIntoDatasetPeriodicite";
        public static string URL_SELECT_COMBOPERIODE = URL_COMBOZONEEDITION + "pvgPeriodicite";

        public static string URL_SELECT_LISTE_BLOC1_1 = URL_ETAT_PARAMETRE_II_ETAT_PARAM + "pvgInsertIntoDatasetEtatParamtre";
        public static string URL_SELECT_LISTE_BLOC1_2 = URL_ETAT_PARAMETRE_II_ETAT_PARAM + "pvgInsertIntoDatasetEtatPlancomptable";
        public static string URL_SELECT_LISTE_BLOC2 = URL_ETAT_PARAMETRE_II_ETAT_IMMO + "pvgETATFAMILLEIMMOBILISATION";
        public static string URL_SELECT_LISTE_BLOC3 = URL_ETAT_PARAMETRE_II_PLAN_COMPT + "pvgChargerDansDataSetCpteCharge";
    }
}