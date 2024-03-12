using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebExtourne : ReferencesGenerales
    {
        public static string URL_EXTOURNE= URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUT_EXTOURNE = URL_EXTOURNE + "pvgExtourne";

    }
}