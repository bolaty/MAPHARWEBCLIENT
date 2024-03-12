using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebReferenceZoneEdition : ReferencesGenerales
    {
        public static string URL_ZONEEDITION = URL_ROOT_EDITION + "wsEdition.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_ZONEEDITION = URL_ZONEEDITION + "pvgInsertIntoDatasetZone";

    }
}