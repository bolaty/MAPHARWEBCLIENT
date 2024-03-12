using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTypeBalance : ReferencesGenerales 
    {
        public static string URL_TYPE_BALANCE = URL_ROOT_PROJET + "wsTypeBalance.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_URL_TYPE_BALANCE = URL_TYPE_BALANCE + "pvgChargerDansDataSetPourCombo";

    }
}