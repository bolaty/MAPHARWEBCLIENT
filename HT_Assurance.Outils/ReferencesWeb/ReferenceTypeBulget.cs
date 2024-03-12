using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceWebTypeBulget : ReferencesGenerales
    {
        public static string URL_TYPE_BUDGET = URL_ROOT_PROJET + "wsPhaParTypeBudget.svc/";

        ///URL TEMPLATE

        
        public static string URL_SELECT_TYPE_BUDGET = URL_TYPE_BUDGET + "pvgChargerDansDataSetPourCombo";

    }
}