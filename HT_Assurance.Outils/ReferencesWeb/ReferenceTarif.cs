using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTarif : ReferencesGenerales
    {
        public static string URL_TARIF = URL_ROOT_PROJET + "wsCtpartarif.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TARIF = URL_TARIF + "pvgMiseAjour";
        public static string URL_SELECT_TARIF = URL_TARIF + "pvgChargerDansDataSetPourCombo";

    }
}