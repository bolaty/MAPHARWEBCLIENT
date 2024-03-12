using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebResumeReglementCommissionsCommerciaux : ReferencesGenerales
    {
        public static string URL_RESUME_REGLEMENT_COMMISSIONS_COMMERCIAUX = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_RESUME_REGLEMENT_COMMISSIONS_COMMERCIAUX = URL_RESUME_REGLEMENT_COMMISSIONS_COMMERCIAUX + "pvgInsertIntoDatasetReglementCommission";
    }
}