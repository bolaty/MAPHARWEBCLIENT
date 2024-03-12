using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeJourFacturation : ReferencesGenerales
    {
        public static string URL_TYPEJOURFACTURATION = URL_ROOT_PROJET + "wsClipartypejourfacturation.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPEJOURFACTURATION = URL_TYPEJOURFACTURATION + "pvgChargerDansDataSetPourCombo";

    }
}