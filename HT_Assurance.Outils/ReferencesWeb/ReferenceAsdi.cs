using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebAsdi : ReferencesGenerales
    {
        public static string URL_ASDI = URL_ROOT_PROJET + "wsASDI.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_ASDI = URL_ASDI + "pvgChargerDansDataSetPourCombo";

    }
}