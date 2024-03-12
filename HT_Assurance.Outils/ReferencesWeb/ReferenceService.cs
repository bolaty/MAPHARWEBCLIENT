using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebService : ReferencesGenerales 
    {
        public static string URL_SERVICE = URL_ROOT_PROJET + "wsService.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_SERVICE = URL_SERVICE + "pvgChargerDansDataSetPourCombo";

    }
}