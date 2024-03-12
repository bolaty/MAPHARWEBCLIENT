using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDesignation : ReferencesGenerales
    {
        public static string URL_DESIGNATION = URL_ROOT_PROJET + "wsCtpardesignation.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_DESIGNATION = URL_DESIGNATION + "pvgMiseAjour";
        public static string URL_SELECT_DESIGNATION = URL_DESIGNATION + "pvgChargerDansDataSetPourCombo";

    }
}