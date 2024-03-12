using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebExercice : ReferencesGenerales 
    {
        public static string URL_EXERCICE = URL_ROOT_PROJET + "wsExercice.svc/";

        ///URL TEMPLATE
        
        public static string URL_INSERT_EXERCICE = URL_EXERCICE + "pvgAjouter";
        public static string URL_UPDATE_EXERCICE = URL_EXERCICE + "pvgModifier";
        public static string URL_SELECT_EXERCICE = URL_EXERCICE + "pvgChargerDansDataSet";
        public static string URL_DELETE_EXERCICE = URL_EXERCICE + "pvgSupprimer";
        public static string URL_SELECT_COMBO = URL_EXERCICE + "pvgChargerDansDataSetPourCombo";

    }
}