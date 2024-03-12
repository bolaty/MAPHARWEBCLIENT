using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeEtat : ReferencesGenerales
    {
        public static string URL_TYPEETAT = URL_ROOT_PROJET + "wsTypeEtat.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPEETAT = URL_TYPEETAT + "pvgChargerDansDataSetPourCombo";

    }
}