using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNatureFamille : ReferencesGenerales
    {
        public static string URL_NATURE_FAMILLE = URL_ROOT_PROJET + "wsPhanaturefamilleoperation.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATURE_FAMILLE = URL_NATURE_FAMILLE + "pvgChargerDansDataSetPourCombo";
    }
}