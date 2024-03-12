using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTypeBudgetdetaille : ReferencesGenerales 
    {
        public static string URL_TYPEBUDGETDETAILLE = URL_ROOT_PROJET + "wsMicbudgetparamtypedetail.svc/";

        ///URL TEMPLATE
        public static string URL_INSERT_TYPEBUDGETDETAILLE = URL_TYPEBUDGETDETAILLE + "pvgAjouter";
        public static string URL_UPDATE_TYPEBUDGETDETAILLE = URL_TYPEBUDGETDETAILLE + "pvgModifier";
        public static string URL_DELETE_TYPEBUDGETDETAILLE = URL_TYPEBUDGETDETAILLE + "pvgSupprimer";
        public static string URL_SELECT_TYPEBUDGETDETAILLE = URL_TYPEBUDGETDETAILLE + "pvgChargerDansDataSet";
        public static string URL_COMBO_TYPEBUDGETDETAILLE = URL_TYPEBUDGETDETAILLE + "pvgChargerDansDataSetPourCombo";
    }
}