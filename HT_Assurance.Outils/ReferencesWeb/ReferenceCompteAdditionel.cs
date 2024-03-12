using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCompteAdditionel : ReferencesGenerales
    {
        public static string URL_COMPTE_ADDITIONNEL = URL_ROOT_PROJET + "wsPhapartypetierscompterattacheadditionnel.svc/";

        ///URL TEMPLATE

        
        public static string URL_SELECT_COMPTE_ADDITIONNEL = URL_COMPTE_ADDITIONNEL + "pvgChargerDansDataSetPourComboEdition";

    }
}