using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeDeTarification : ReferencesGenerales
    {
        public static string URL_TYPE_DE_TARIFICATION = URL_ROOT_PROJET + "wsCtpartarif.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TYPE_DE_TARIFICATION = URL_TYPE_DE_TARIFICATION + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_DE_TARIFICATION = URL_TYPE_DE_TARIFICATION + "pvgChargerDansDataSetPourCombo";

    }
}