using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebStatutContrat : ReferencesGenerales
    {
        public static string URL_STATUT_CONTRAT = URL_ROOT_PROJET + "wsStatutContrat.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_STATUT_CONTRAT = URL_STATUT_CONTRAT + "pvgChargerDansDataSetPourCombo";

    }
}