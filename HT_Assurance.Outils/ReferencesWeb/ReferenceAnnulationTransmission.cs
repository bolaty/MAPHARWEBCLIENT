using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebAnnulationTransmission : ReferencesGenerales
    {
        public static string URL_ANNULATION_TRANSMISSION = URL_ROOT_PROJET + "wsCtcontrat.svc/";

        ///URL TEMPLATE

        
        public static string URL_SELECT_ANNULATION_TRANSMISSION = URL_ANNULATION_TRANSMISSION + "pvgMiseAjourStatutContrat";
        
    }
}