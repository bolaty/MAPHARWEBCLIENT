using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNatureCompte : ReferencesGenerales
    {
        public static string URL_NATURE_COMPTE = URL_ROOT_PROJET + "wsPlancomptablenaturecomptemodereglement.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATURE_COMPTE = URL_NATURE_COMPTE + "pvgChargerDansDataSetPourCombo";

    }
}