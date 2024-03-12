using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceRisque : ReferencesGenerales 
    {
        public static string URL_RISQUE = URL_ROOT_PROJET + "wsRisqueassurance.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_RISQUE = URL_RISQUE + "pvgChargerDansDataSetPourCombo";

    }
}