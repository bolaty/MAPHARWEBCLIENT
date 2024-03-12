using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNatureTiers : ReferencesGenerales
    {
        public static string URL_NATURE_TIERS = URL_ROOT_PROJET + "wsPhaparnaturetiers.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATURE_TIERS = URL_NATURE_TIERS + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_NATURE_TIERS_SELON_TYPE = URL_NATURE_TIERS + "pvgChargerDansDataSetPourComboEdition";

    }
}