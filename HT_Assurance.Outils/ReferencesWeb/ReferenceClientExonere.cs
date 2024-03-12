using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesClientExonere : ReferencesGenerales 
    {
        public static string URL_CLIENTEXONERE = URL_ROOT_PROJET + "wsClientexoneretaxe.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_CLIENTEXONERE = URL_CLIENTEXONERE + "pvgChargerDansDataSetPourCombo";

    }
}