using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTypeAuto : ReferencesGenerales
    {
        public static string URL_TYPE_AUTO = URL_ROOT_PROJET + "wsCtpartypecontratauto.svc/";

        ///URL TEMPLATE

       // public static string URL_MISE_A_JOUR_TYPE_AFFAIRE = URL_TYPE_AFFAIRE + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_AUTO = URL_TYPE_AUTO + "pvgChargerDansDataSetPourCombo";

    }
}