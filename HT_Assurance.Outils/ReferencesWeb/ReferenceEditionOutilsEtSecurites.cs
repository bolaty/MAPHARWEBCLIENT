using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceEditionOutilsEtSecurites : ReferencesGenerales
    {
        public static string URL_EDITION_OUTILS_SECURITE = URL_ROOT_EDITION + "wsEditionEtatOutilsSecurite.svc/";

        ///URL TEMPLATE
        public static string URL_INSERT_OUTILS_SECURITES = URL_EDITION_OUTILS_SECURITE + "pvgInsertIntoDatasetEtatOperateur";
    }
}