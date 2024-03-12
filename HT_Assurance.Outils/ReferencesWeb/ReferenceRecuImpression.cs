using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceRecuImpression : ReferencesGenerales 
    {
        public static string URL_RECU = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_RECU = URL_RECU + "pvgChargerDansDataSetRecudeCaisse";

    }
}