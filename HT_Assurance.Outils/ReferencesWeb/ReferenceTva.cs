using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTva : ReferencesGenerales
    {
        public static string URL_TVA = URL_ROOT_PROJET + "wsTVA.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TVA = URL_TVA + "pvgChargerDansDataSetPourCombo";

    }
}