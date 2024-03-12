using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceNatureOperation : ReferencesGenerales 
    {
        public static string URL_NATUREOPERATION = URL_ROOT_PROJET + "wsNatureOperation.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATUREOPERATION = URL_NATUREOPERATION + "pvgChargerDansDataSetPourCombo";

    }
}