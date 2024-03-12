using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTypeBudget : ReferencesGenerales 
    {
        public static string URL_TYPE_BUDGET = URL_ROOT_PROJET + "wsMicbudgetparamtype.svc/";

        ///URL TEMPLATE
        
      
        public static string URL_INSERT_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgAjouter";
        public static string URL_UPDATE_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgModifier";
        public static string URL_DELETE_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgSupprimer";
        public static string URL_SELECT_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgChargerDansDataSet";
        public static string URL_COMBO_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgChargerDansDataSetPourCombo";

    }
}