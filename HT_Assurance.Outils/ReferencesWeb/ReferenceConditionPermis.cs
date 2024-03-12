using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebConditionPermis : ReferencesGenerales
    {
        public static string URL_CONDITIONPERMIS = URL_ROOT_PROJET + "wsCtparconditionpermis.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_CONDITIONPERMIS = URL_CONDITIONPERMIS + "pvgMiseAjour";
        public static string URL_SELECT_CONDITIONPERMIS = URL_CONDITIONPERMIS + "pvgChargerDansDataSetPourCombo";

    }
}