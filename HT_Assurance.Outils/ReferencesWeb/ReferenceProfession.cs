using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebProfession : ReferencesGenerales
    {
        public static string URL_PROFESSION = URL_ROOT_PROJET + "wsProfession.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_PROFESSION = URL_PROFESSION + "pvgChargerDansDataSetPourCombo";

    }
}