using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebPays : ReferencesGenerales
    {
        public static string URL_PAYS = URL_ROOT_PROJET + "wsPays.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_PAYS = URL_PAYS + "pvgMiseAjour";
        public static string URL_SELECT_PAYS = URL_PAYS + "pvgChargerDansDataSetPourCombo";

    }
}