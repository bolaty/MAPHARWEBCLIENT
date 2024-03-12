using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebStatutSocio : ReferencesGenerales
    {
        public static string URL_STATUTSOCIO = URL_ROOT_PROJET + "wsCtparstatutsocioprofessionnel.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_STATUTSOCIO = URL_STATUTSOCIO + "pvgMiseAjour";
        public static string URL_SELECT_STATUTSOCIO = URL_STATUTSOCIO + "pvgChargerDansDataSetPourCombo";

    }
}