using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCompteAmortissement : ReferencesGenerales
    {
        public static string URL_COMPTE_AMORTISSEMENT = URL_ROOT_PROJET + "wsCompteAmortissement.svc/";

        ///URL TEMPLATE

        
        public static string URL_SELECT_COMPTE_AMORTISSEMENT = URL_COMPTE_AMORTISSEMENT + "pvgChargerDansDataSetPourCombo";

    }
}