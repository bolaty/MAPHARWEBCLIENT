using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebRegimeImposition : ReferencesGenerales
    {
        public static string URL_REGIME_IMPOSITION = URL_ROOT_PROJET + "wsRegimeimposition.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_REGIME_IMPOSITION = URL_REGIME_IMPOSITION + "pvgChargerDansDataSetPourCombo";

    }
}