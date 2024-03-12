using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCommissionCommercial : ReferencesGenerales
    {
        public static string URL_COMMISSIONCOMMERCIAL = URL_ROOT_PROJET + "wsPhatiers.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_COMMISSIONCOMMERCIAL = URL_COMMISSIONCOMMERCIAL + "pvgMiseAjour";
        public static string URL_SELECT_COMMISSIONCOMMERCIAL = URL_COMMISSIONCOMMERCIAL + "pvgSoldeGlobalReglement";

    }
}