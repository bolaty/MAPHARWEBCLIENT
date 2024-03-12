using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceNumCompteGeneral : ReferencesGenerales 
    {
        public static string URL_NUMERO_COMPTE_GENERAL = URL_ROOT_PROJET + "wsPlancomptable.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NUMERO_COMPTE_GENERAL = URL_NUMERO_COMPTE_GENERAL + "pvgChargerDansDataSet";

    }
}