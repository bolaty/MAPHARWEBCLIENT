using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebLogiciel : ReferencesGenerales
    {
        public static string URL_LOGICIEL = URL_ROOT_PROJET + "wsLogiciel.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_LOGICIEL = URL_LOGICIEL + "pvgChargerDansDataSetPourCombo";
    }
}