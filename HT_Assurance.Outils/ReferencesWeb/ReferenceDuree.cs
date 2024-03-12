using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDuree : ReferencesGenerales
    {
        public static string URL_DUREE = URL_ROOT_PROJET + "wsCtparduree.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_DUREE = URL_DUREE + "pvgMiseAjour";
        public static string URL_SELECT_DUREE = URL_DUREE + "pvgChargerDansDataSetPourCombo";

    }
}