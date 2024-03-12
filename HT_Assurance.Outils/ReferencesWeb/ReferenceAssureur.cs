using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebAssureur : ReferencesGenerales
    {
        public static string URL_TIERS = URL_ROOT_PROJET + "wsPhatiers.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TIERS = URL_TIERS + "pvgMiseAjour";
        public static string URL_SELECT_TIERS = URL_TIERS + "pvgChargerDansDataSetPourComboSelonNaturetypetiers";

    }
}