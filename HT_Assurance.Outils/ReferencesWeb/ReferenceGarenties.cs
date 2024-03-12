using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebGarenties : ReferencesGenerales
    {
        public static string URL_GARENTIES = URL_ROOT_PROJET + "wsCtpargarantierisqueassuranceliaison.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_GARENTIES = URL_GARENTIES + "pvgMiseAjour";
        public static string URL_SELECT_GARENTIES = URL_GARENTIES + "pvgChargerDansDataSet";

    }
}