using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeFournisseur : ReferencesGenerales 
    {
        public static string URL_TYPE_FOURNISSEUR = URL_ROOT_PROJET + "wsPhapartypetiers.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPE_FOURNISSEUR = URL_TYPE_FOURNISSEUR + "pvgChargerDansDataSetPourCombo";

    }
}