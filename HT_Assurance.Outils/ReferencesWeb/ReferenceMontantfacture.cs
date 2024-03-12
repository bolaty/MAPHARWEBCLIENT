using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebMontantfacture : ReferencesGenerales
    {
        public static string URL_MONTANTFACTURE = URL_ROOT_PROJET + "wsCtcontrat.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_MONTANTFACTURE = URL_MONTANTFACTURE + "pvgMiseAjour";
        public static string URL_SELECT_MONTANTFACTURE = URL_MONTANTFACTURE + "pvgChargerDansDataSetMontantFacture";

    }
}