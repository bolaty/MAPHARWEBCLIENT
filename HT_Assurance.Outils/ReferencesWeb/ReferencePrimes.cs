using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebPrimes : ReferencesGenerales
    {
        public static string URL_PRIMES = URL_ROOT_PROJET + "wsCtparprimerisqueassuranceliaison.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_PRIMES = URL_PRIMES + "pvgMiseAjour";
        public static string URL_SELECT_PRIMES = URL_PRIMES + "pvgChargerDansDataSet";

    }
}