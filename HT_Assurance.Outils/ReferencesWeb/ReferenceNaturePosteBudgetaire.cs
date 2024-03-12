using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceNaturePosteBudgetaire : ReferencesGenerales 
    {
        public static string URL_NATUREPOSTEBUDGETAIRE = URL_ROOT_PROJET + "wsMicbudgetparampostebudgetairenature.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NATUREPOSTEBUDGETAIRE = URL_NATUREPOSTEBUDGETAIRE + "pvgChargerDansDataSetPourCombo";

    }
}