using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeContrat : ReferencesGenerales
    {
        public static string URL_TYPE_CONTRAT = URL_ROOT_PROJET + "wsCtpartypecontratsante.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TYPE_CONTRAT = URL_TYPE_CONTRAT + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_CONTRAT = URL_TYPE_CONTRAT + "pvgChargerDansDataSetPourCombo";

    }
}