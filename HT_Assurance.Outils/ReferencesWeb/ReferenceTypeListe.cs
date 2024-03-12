using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeListe : ReferencesGenerales
    {
        public static string URL_TYPELISTE = URL_ROOT_PROJET + "wsTypeListe.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPELISTE = URL_TYPELISTE + "pvgChargerDansDataSetPourCombo";

    }
}