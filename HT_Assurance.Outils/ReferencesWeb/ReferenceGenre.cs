using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebGenre : ReferencesGenerales
    {
        public static string URL_GENRE = URL_ROOT_PROJET + "wsCtpargenreauto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_GENRE = URL_GENRE + "pvgMiseAjour";
        public static string URL_SELECT_GENRE = URL_GENRE + "pvgChargerDansDataSetPourCombo";

    }
}