using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCapitaux : ReferencesGenerales
    {
        public static string URL_CAPITAUX = URL_ROOT_PROJET + "wsCtparcapitauxrisqueassuranceliaison.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_CAPITAUX = URL_CAPITAUX + "pvgMiseAjour";
        public static string URL_SELECT_CAPITAUX = URL_CAPITAUX + "pvgChargerDansDataSet";

    }
}