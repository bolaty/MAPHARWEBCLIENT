using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeCompteAdd : ReferencesGenerales
    {
        public static string URL_TYPE_COMPTE_ADD = URL_ROOT_PROJET + "wsPhapartypetierscompterattacheadditionnel.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPE_COMPTE_ADD = URL_TYPE_COMPTE_ADD + "pvgChargerDansDataSetPourCombo";

    }
}