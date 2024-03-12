using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEntrepot : ReferencesGenerales 
    {
        public static string URL_ENTREPOT = URL_ROOT_PROJET + "wsPhaparentrepot.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_ENTREPOT = URL_ENTREPOT + "pvgChargerDansDataSetPourCombo";

    }
}