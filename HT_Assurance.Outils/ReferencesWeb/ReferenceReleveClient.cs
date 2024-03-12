using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebReleveClient : ReferencesGenerales
    {
        public static string URL_RELEVE_CLIENT = URL_ROOT_PROJET + "wsCtsinistre.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_RELEVE_CLIENT = URL_RELEVE_CLIENT + "pvgInsertIntoDatasetEtatConsultation";

    }
}