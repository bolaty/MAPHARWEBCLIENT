using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametrageOperationsTresoreries : ReferencesGenerales
    {
        public static string URL_PARAMETRAGEOPERATIONSTRESORERIES = URL_ROOT_PROJET + "wsPhamouvementstockreglementnatureoperation.svc/";
        //COMBO
        public static string URL_COMBOFAMILLEOPERATION = URL_ROOT_PROJET + "wsPhafamilleoperation.svc/";
        public static string URL_COMBOJOURNAL = URL_ROOT_PROJET + "wsJournal.svc/";
        public static string URL_COMBONATURECOMPTE = URL_ROOT_PROJET + "wsPlancomptablenaturecompte.svc/";
        public static string URL_COMBOSENS = URL_ROOT_PROJET + "wsSENS.svc/";
        public static string URL_CHAMPNUMEROCOMPTE = URL_ROOT_PROJET + "wsPlancomptable.svc/";
        public static string URL_COMBOTYPEOPERATION = URL_ROOT_PROJET + "wsPhamouvementstockreglementnatureoperationtype.svc/";


        ///URL TEMPLATE
        public static string URL_LIST_PARAM_OPERATIONS_TRESORERIE = URL_PARAMETRAGEOPERATIONSTRESORERIES + "pvgChargerDansDataSetEcranParametrage";
        public static string URL_INSERT_PARAM_OPERATIONS_TRESORERIE = URL_PARAMETRAGEOPERATIONSTRESORERIES + "pvgAjouter";
        public static string URL_UPDATE_PARAM_OPERATIONS_TRESORERIE = URL_PARAMETRAGEOPERATIONSTRESORERIES + "pvgModifier";
        public static string URL_DELETE_PARAM_OPERATIONS_TRESORERIE = URL_PARAMETRAGEOPERATIONSTRESORERIES + "pvgSupprimer";

        public static string URL_CHARGEMENT_FAMILLE_OPERATION = URL_COMBOFAMILLEOPERATION + "pvgChargerDansDataSetFamilleOperation";
        public static string URL_CHARGEMENT_JOURNAL = URL_COMBOJOURNAL + "pvgChargerDansDataSetPourComboSelonEcran";
        public static string URL_CHARGEMENT_JOURNAL_SYSTEME = URL_COMBOJOURNAL + "pvgChargerDansDataSetPourCombo";
        public static string URL_CHARGEMENT_NATURE_COMPTE = URL_COMBONATURECOMPTE + "pvgChargerDansDataSetPourCombo";
        public static string URL_CHARGEMENT_SENS = URL_COMBOSENS + "pvgChargerDansDataSetPourCombo";
        public static string URL_CHARGEMENT_NUMERO_COMPTE = URL_CHAMPNUMEROCOMPTE + "pvgChargerDansDataSet";
        public static string URL_CHARGEMENT_TYPE_OPERATION = URL_COMBOTYPEOPERATION + "pvgChargerDansDataSetPourCombo";
    }
}