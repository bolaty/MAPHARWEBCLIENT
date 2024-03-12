using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebZone : ReferencesGenerales
    {
        public static string URL_ZONE = URL_ROOT_PROJET + "wsZonemaladie.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_ZONE = URL_ZONE + "pvgMiseAjour";
        public static string URL_SELECT_ZONE = URL_ZONE + "pvgChargerDansDataSetPourCombo";

    }
}