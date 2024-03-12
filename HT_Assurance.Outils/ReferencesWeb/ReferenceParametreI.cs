using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametreI : ReferencesGenerales
    {
        public static string URL_PARAMETREI = URL_ROOT_PROJET + "wsParametre.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_PARAMETREI = URL_PARAMETREI + "pvgModifier";
        public static string URL_SELECT_PARAMETREI = URL_PARAMETREI + "pvgChargerDansDataSet";

    }
}