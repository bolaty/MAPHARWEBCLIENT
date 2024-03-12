using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCommune : ReferencesGenerales
    {
        public static string URL_COMMUNE = URL_ROOT_PROJET + "wsCommune.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_COMMUNE = URL_COMMUNE + "pvgMiseAjour";
        public static string URL_SELECT_COMMUNE = URL_COMMUNE + "pvgChargerDansDataSetPourCombo";

    }
}