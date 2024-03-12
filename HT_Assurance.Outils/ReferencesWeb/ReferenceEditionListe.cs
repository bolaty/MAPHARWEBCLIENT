using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEditionListe : ReferencesGenerales
    {
        public static string URL_EDITION_LISTE= URL_ROOT_EDITION + "wsEtat.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_EDITION_LISTE = URL_EDITION_LISTE + "pvgChargerDansDataSet";

    }
}