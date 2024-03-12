using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceEditionEtatAssurance : ReferencesGenerales 
    {
        public static string URL_REFERANCEEDITIONETATASSURANCE = URL_ROOT_EDITION + "wsEditionEtatAssurance.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_BANQUE = URL_REFERANCEEDITIONETATASSURANCE + "pvgInsertIntoDatasetEtatAssurance";

    }
}