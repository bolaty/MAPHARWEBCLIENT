using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceChargerCommission : ReferencesGenerales
    {
        public static string URL_CHARGERCOMMISSION = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_CHARGER_COMMISSION = URL_CHARGERCOMMISSION + "pvgInsertIntoDatasetReglementCommission";
       
    }
}