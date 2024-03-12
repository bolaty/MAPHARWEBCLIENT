using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebBranche : ReferencesGenerales
    {
        public static string URL_BRANCHE = URL_ROOT_PROJET + "wsCtparbranche.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_BRANCHE = URL_BRANCHE + "pvgMiseAjour";
        public static string URL_SELECT_BRANCHE = URL_BRANCHE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_BRANCHEAUXILIAIRE = URL_BRANCHE + "pvgChargerDansDataSetPourComboSelonRisque";
        

    }
}