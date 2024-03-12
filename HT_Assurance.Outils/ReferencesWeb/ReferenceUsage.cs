using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebUsage : ReferencesGenerales
    {
        public static string URL_USAGE = URL_ROOT_PROJET + "wsCtparusageauto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_USAGE = URL_USAGE + "pvgMiseAjour";
        public static string URL_SELECT_USAGE = URL_USAGE + "pvgChargerDansDataSetPourCombo";

    }
}