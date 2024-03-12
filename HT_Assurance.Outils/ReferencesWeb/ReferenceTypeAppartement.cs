using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeAppartement : ReferencesGenerales
    {
        public static string URL_TYPE_APPARTEMENT = URL_ROOT_PROJET + "wsCtpartypeappartement.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TYPE_APPARTEMENT = URL_TYPE_APPARTEMENT + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_APPARTEMENT = URL_TYPE_APPARTEMENT + "pvgChargerDansDataSetPourCombo";

    }
}