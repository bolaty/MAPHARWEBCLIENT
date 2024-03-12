using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeConsultation : ReferencesGenerales
    {
        public static string URL_TYPE_CONSULTATION = URL_ROOT_PROJET + "wsClipartypeconsultattion.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPE_CONSULTATION = URL_TYPE_CONSULTATION + "pvgChargerDansDataSetPourCombo";

    }
}