using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeClient : ReferencesGenerales
    {
        public static string URL_TYPE_CLIENT = URL_ROOT_PROJET + "wsPhaparnaturetiers.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_TYPE_CLIENT = URL_TYPE_CLIENT + "pvgChargerDansDataSetPourCombo";

    }
}