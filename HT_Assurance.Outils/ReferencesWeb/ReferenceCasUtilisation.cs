using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCasUtilisation : ReferencesGenerales
    {
        public static string URL_CAS_UTILISATION = URL_ROOT_PROJET + "wsPhaparcasutilisationtiers.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_CAS_UTILISATION = URL_CAS_UTILISATION + "pvgChargerDansDataSetPourCombo";

    }
}