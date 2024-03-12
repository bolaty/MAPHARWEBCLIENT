using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceReleveCommission : ReferencesGenerales 
    {
        public static string URL_RELEVE_COMMISSION = URL_ROOT_PROJET + "wsCtsinistre.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_RELEVE_COMMISSION = URL_RELEVE_COMMISSION + "pvgInsertIntoDatasetEtatConsultation";

    }
}