using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebMainForte : ReferencesGenerales
    {
        public static string URL_MAIN_FORTE = URL_ROOT_PROJET + "wsCtparmainforte.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_MAIN_FORTE = URL_MAIN_FORTE + "pvgChargerDansDataSetPourCombo";

    }
}