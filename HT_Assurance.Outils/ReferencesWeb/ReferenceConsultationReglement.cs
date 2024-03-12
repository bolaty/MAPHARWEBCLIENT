using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceConsultationReglement : ReferencesGenerales 
    {
        public static string URL_CONSULTATION_DES_REGLEMENTS = URL_ROOT_PROJET + "wsCtsinistre.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_CONSULTATION_DES_REGLEMENTS = URL_CONSULTATION_DES_REGLEMENTS + "pvgInsertIntoDatasetEtatConsultation";

    }
}