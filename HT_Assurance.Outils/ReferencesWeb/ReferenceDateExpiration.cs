using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDateExpiration : ReferencesGenerales
    {
        public static string URL_DATEEXPIRATION = URL_ROOT_PROJET + "wsPhamouvementstockfiltragedestockexpiration.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DATEEXPIRATION = URL_DATEEXPIRATION + "pvgChargerDansDataSetPourCombo";

    }
}