using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceReglementTresorerie : ReferencesGenerales 
    {
        public static string URL_ReglementTresererI = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_ReglementTresererI = URL_ReglementTresererI + "pvgAjouterListeChargeAvecRepartition";

    }
}