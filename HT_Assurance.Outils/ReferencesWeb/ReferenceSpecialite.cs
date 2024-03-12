using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSpecialite : ReferencesGenerales
    {
        public static string URL_SPECIALITE = URL_ROOT_PROJET + "wsCliparspecialite.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_SPECIALITE = URL_SPECIALITE + "pvgChargerDansDataSetPourCombo";

    }
}