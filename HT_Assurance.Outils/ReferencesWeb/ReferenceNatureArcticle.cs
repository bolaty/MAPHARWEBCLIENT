using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNatureArticle : ReferencesGenerales
    {
        public static string URL_NATURE_ARTICLE = URL_ROOT_PROJET + "wsPhaparnaturetypearticle.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_NATURE_ARTICLE = URL_NATURE_ARTICLE + "pvgChargerDansDataSetPourComboModeGestion";

    }
}