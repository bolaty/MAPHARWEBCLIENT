using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEcran : ReferencesGenerales 
    {
        public static string URL_ECRAN = URL_ROOT_PROJET + "wsLogicielobjet.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_ECRAN = URL_ECRAN + "pvgChargerDansDataSetPourComboOP";

        public static string URL_SELECT_DROITECRAN = URL_ECRAN + "pvgChargerDansDataSetPourComboEcrandroit";

    }
}