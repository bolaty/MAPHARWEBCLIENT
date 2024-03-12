using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSouscripteurCommercial : ReferencesGenerales
    {
        public static string URL_SOUSCRIPTEUR_COMMERCIAL = URL_ROOT_PROJET + "wsPhatiers.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_SOUSCRIPTEUR_COMMERCIAL = URL_SOUSCRIPTEUR_COMMERCIAL + "pvgMiseAjour";
        public static string URL_SELECT_SOUSCRIPTEUR_COMMERCIAL = URL_SOUSCRIPTEUR_COMMERCIAL + "pvgChargerDansDataSetTiers";
        public static string URL_SELECT_SOUSCRIPTEUR_COMMERCIAL2 = URL_SOUSCRIPTEUR_COMMERCIAL + "pvgChargerDansDataSetTiersN";
        public static string URL_SELECT_COMBO_COMMERCIAL = URL_SOUSCRIPTEUR_COMMERCIAL + "pvgChargerDansDataSetPourComboSelonNaturetypetiers";
    }
}