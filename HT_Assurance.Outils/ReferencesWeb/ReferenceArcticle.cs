using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebArticle : ReferencesGenerales
    {
        public static string URL_ARTICLE = URL_ROOT_PROJET + "wsPhapararticle.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_ARTICLE = URL_ARTICLE + "pvgChargerDansDataSetPourCombo";

    }
}