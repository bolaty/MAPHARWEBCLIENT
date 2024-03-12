using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSection : ReferencesGenerales 
    {
        public static string URL_SECTION = URL_ROOT_PROJET + "wsSection.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_SECTION = URL_SECTION + "pvgChargerDansDataSetPourCombo";

    }
}