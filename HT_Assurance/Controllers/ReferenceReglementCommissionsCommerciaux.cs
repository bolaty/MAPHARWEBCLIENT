using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceReglementCommissionsCommerciaux : ReferencesGenerales
    {
        public static string URL_REGLEMENTCOMMISSIONSCOMMERCIAUX = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_REGLEMENT_COMMISSIONS_COMMERCIAUX = URL_REGLEMENTCOMMISSIONSCOMMERCIAUX + "pvgReglementCommercial";
       
    }
}