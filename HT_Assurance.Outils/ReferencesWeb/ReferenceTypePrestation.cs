using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTypePrestation : ReferencesGenerales 
    {
        public static string URL_TYPE_PRESTATION = URL_ROOT_PROJET + "wsTypeprestation.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPE_PRESTATION = URL_TYPE_PRESTATION + "pvgChargerDansDataSetPourCombo";

    }
}