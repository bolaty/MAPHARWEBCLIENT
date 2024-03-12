using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebOption : ReferencesGenerales 
    {
        public static string URL_OPTION = URL_ROOT_PROJET + "wsOption.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_OPTION = URL_OPTION + "pvgChargerDansDataSetPourCombo";

    }
}