using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebReglgementCommiAssurance : ReferencesGenerales
    {
        public static string URL_REGLEMENT = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_REGLEMENT = URL_REGLEMENT + "pvgReglementCommissionAssurance";
    }
}