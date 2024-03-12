using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebNumLot : ReferencesGenerales
    {
        public static string URL_NUMLOT = URL_ROOT_PROJET + "wsPhamouvementstockfiltragedestock.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NUMLOT = URL_NUMLOT + "pvgChargerDansDataSetPourCombo";

    }
}