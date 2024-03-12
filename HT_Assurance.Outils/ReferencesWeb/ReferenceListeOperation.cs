using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebListeOperation : ReferencesGenerales
    {
        public static string URL_OPERATION_TIERS = URL_ROOT_PROJET + "wsPlancomptable.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_OPERATION_TIERS = URL_OPERATION_TIERS + "pvgChargerDansDataSetOperation";

    }
}