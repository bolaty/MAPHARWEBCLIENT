using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceReglementCommissionAssurance : ReferencesGenerales
    {
        public static string URL_REGLEMENTCOMMISSIONASSURANCE = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_REGLEMENT_COMMISSION_ASSURANCE = URL_REGLEMENTCOMMISSIONASSURANCE + "pvgMouvementResumeReglement";
       
    }
}