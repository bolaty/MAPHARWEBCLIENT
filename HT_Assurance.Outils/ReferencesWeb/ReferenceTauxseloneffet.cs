using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceTauxseloneffet : ReferencesGenerales
    {
        public static string URL_TAUXSELONEFFET = URL_ROOT_PROJET + "wsCtpartauxauto.svc/";

        ///URL TEMPLATE

       // public static string URL_MISE_A_JOUR_MONTANTFACTURE = URL_MONTANTFACTURE + "pvgMiseAjour";
        public static string URL_SELECT_TAUXSELONEFFET = URL_TAUXSELONEFFET + "pvgChargerDansDataSet";

    }
}