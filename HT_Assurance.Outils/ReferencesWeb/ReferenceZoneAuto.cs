using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebZoneAuto : ReferencesGenerales
    {
        public static string URL_ZONEAUTO = URL_ROOT_PROJET + "wsZoneauto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_ZONEAUTO = URL_ZONEAUTO + "pvgMiseAjour";
        public static string URL_SELECT_ZONEAUTO = URL_ZONEAUTO + "pvgChargerDansDataSetPourCombo";

    }
}