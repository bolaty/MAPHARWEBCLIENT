using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencePosteBudgetaire : ReferencesGenerales 
    {
        public static string URL_POSTEBUDGETAIRE = URL_ROOT_PROJET + "wsMicbudgetparampostebudgetaire.svc/";

        ///URL TEMPLATE

        public static string URL_INSERT_POSTEBUDGETAIRE = URL_POSTEBUDGETAIRE + "pvgAjouter";
        public static string URL_UPDATE_POSTEBUDGETAIRE = URL_POSTEBUDGETAIRE + "pvgModifier";
        public static string URL_DELETE_POSTEBUDGETAIRE = URL_POSTEBUDGETAIRE + "pvgSupprimer";
        public static string URL_SELECT_POSTEBUDGETAIRE = URL_POSTEBUDGETAIRE + "pvgChargerDansDataSet";
        public static string URL_COMBO_POSTEBUDGETAIRE = URL_POSTEBUDGETAIRE + "pvgChargerDansDataSetPourCombo";

    }
}