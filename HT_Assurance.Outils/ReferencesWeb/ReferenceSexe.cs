using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSexe : ReferencesGenerales
    {
        public static string URL_SEXE = URL_ROOT_PROJET + "wsSexe.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_SEXE = URL_SEXE + "pvgChargerDansDataSetPourCombo";

    }
}