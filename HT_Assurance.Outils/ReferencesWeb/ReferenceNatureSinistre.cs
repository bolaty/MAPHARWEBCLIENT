using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNatureSinistre : ReferencesGenerales
    {
        public static string URL_NATURE_SINISTRE = URL_ROOT_PROJET + "wsCtparnaturesinistre.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATURE_SINISTRE = URL_NATURE_SINISTRE + "pvgChargerDansDataSetPourCombo";
    }
}