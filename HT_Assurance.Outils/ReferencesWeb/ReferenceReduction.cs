using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebReduction : ReferencesGenerales
    {
        public static string URL_REDUCTION = URL_ROOT_PROJET + "wsCtparreduction.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_REDUCTION = URL_REDUCTION + "pvgMiseAjour";
        public static string URL_SELECT_REDUCTION = URL_REDUCTION + "pvgChargerDansDataSet";

    }
}