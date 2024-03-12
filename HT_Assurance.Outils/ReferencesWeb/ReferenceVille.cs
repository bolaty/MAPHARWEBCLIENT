using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebVille : ReferencesGenerales
    {
        public static string URL_VILLE = URL_ROOT_PROJET + "wsVille.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_VILLE = URL_VILLE + "pvgMiseAjour";
        public static string URL_SELECT_VILLE = URL_VILLE + "pvgChargerDansDataSetPourCombo";

    }
}