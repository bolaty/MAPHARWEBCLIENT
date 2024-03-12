using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTitreBeneficiaire : ReferencesGenerales
    {
        public static string URL_TITRE_BENEFICIAIRE = URL_ROOT_PROJET + "wsClipartitreadherantayantsdroits.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_TITRE_BENEFICIAIRE = URL_TITRE_BENEFICIAIRE + "pvgChargerDansDataSetPourCombo";

    }
}