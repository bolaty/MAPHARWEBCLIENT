using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceSoldeCompte : ReferencesGenerales
    {
        public static string URL_SOLDE_COMPTE = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

       // public static string URL_MISE_A_JOUR_BRANCHE = URL_SOLDE_COMPTE + "pvgMiseAjour";
        public static string URL_SELECT_SOLDE_COMPTE = URL_SOLDE_COMPTE + "pvgChargerDansDataSetSoldeCompteEcranOD";

    }
}