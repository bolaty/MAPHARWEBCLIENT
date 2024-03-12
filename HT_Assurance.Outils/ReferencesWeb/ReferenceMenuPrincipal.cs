using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebMenuPrincipal : ReferencesGenerales
    {
        public static string URL_MENU_PRINCIPAL = URL_ROOT_PROJET + "wsLogicielobjet.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_MENU_PRINCIPAL = URL_MENU_PRINCIPAL + "pvgChargerDansDataSetPourCombo";
    }
}