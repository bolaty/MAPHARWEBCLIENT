using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebZoneVoyage : ReferencesGenerales
    {
        public static string URL_ZONE_VOYAGE = URL_ROOT_PROJET + "wsZonevoyage.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_ZONE_VOYAGE = URL_ZONE_VOYAGE + "pvgMiseAjour";
        public static string URL_SELECT_ZONE_VOYAGE = URL_ZONE_VOYAGE + "pvgChargerDansDataSetPourCombo";

    }
}