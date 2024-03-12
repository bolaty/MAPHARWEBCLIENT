using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceGarantie : ReferencesGenerales 
    {
        public static string URL_GARANTIE = URL_ROOT_PROJET + "wsCtpargarentieprimerisque.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_GARANTIE = URL_GARANTIE + "pvgChargerDansDataSetPourCombo";

    }
}