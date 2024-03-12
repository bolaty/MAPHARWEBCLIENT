using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebListeFamilleOperation : ReferencesGenerales
    {
        public static string URL_FAMILLE_OPERATION_TIERS = URL_ROOT_PROJET + "wsPhafamilleoperation.svc/";
        public static string URL_FAMILLE_OPERATION_VERSEMENT = URL_ROOT_PROJET + "wsPhafamilleoperationTemp.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_FAMILLE_OPERATION_TIERS = URL_FAMILLE_OPERATION_TIERS + "pvgChargerDansDataSet";
        public static string URL_SELECT_FAMILLE_OPERATION_VERSEMENT = URL_FAMILLE_OPERATION_VERSEMENT + "pvgChargerDansDataSetPourCombo";

    }
}