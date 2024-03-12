using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebIntermediaire : ReferencesGenerales
    {
        public static string URL_INTERMEDIAIRE = URL_ROOT_PROJET + "wsCtparintermediaire.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_INTERMEDIAIRE = URL_INTERMEDIAIRE + "pvgMiseAjour";
        public static string URL_SELECT_INTERMEDIAIRE = URL_INTERMEDIAIRE + "pvgChargerDansDataSetPourCombo";

    }
}