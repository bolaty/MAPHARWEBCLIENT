using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceSinistreSituation : ReferencesGenerales
    {
        public static string URL_SINISTRESITUATION = URL_ROOT_PROJET + "wsCtsinistresituationdossier.svc/";

        ///URL TEMPLATE

        public static string URL_INSERT_SITUATION = URL_SINISTRESITUATION + "pvgAjouter";
        public static string URL_SELECT_SITUATION = URL_SINISTRESITUATION + "pvgChargerDansDataSet";

    }
}