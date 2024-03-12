using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebModeReglement : ReferencesGenerales
    {
        public static string URL_MODE_REGLEMENT = URL_ROOT_PROJET + "wsModereglement.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_MODE_REGLEMENT = URL_MODE_REGLEMENT + "pvgChargerDansDataSetPourCombo";

    }
}