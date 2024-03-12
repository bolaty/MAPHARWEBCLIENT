using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSens : ReferencesGenerales
    {
        public static string URL_SENS = URL_ROOT_PROJET + "wsSENS.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_SENS = URL_SENS + "pvgChargerDansDataSetPourCombo";

    }
}