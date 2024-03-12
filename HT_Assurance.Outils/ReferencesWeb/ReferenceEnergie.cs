using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEnergie : ReferencesGenerales
    {
        public static string URL_ENERGIE = URL_ROOT_PROJET + "wsCtparenergieauto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_ENERGIE = URL_ENERGIE + "pvgMiseAjour";
        public static string URL_SELECT_ENERGIE = URL_ENERGIE + "pvgChargerDansDataSetPourCombo";

    }
}