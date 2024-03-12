using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebLieuFacturation : ReferencesGenerales
    {
        public static string URL_LIEUFACTURATION = URL_ROOT_PROJET + "wsLieuFacturation.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_LIEUFACTURATION = URL_LIEUFACTURATION + "pvgChargerDansDataSetPourCombo";

    }
}