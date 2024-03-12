using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeArticle : ReferencesGenerales
    {
        public static string URL_TYPE_ARTICLE = URL_ROOT_PROJET + "wsPhapartypearticle.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_TYPE_ARTICLE = URL_TYPE_ARTICLE + "pvgChargerDansDataSet";

    }
}