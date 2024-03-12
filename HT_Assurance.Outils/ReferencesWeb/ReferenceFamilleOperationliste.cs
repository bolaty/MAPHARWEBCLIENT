using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceFamilleOperationliste : ReferencesGenerales 
    {
        public static string URL_FAMILLEOPERATIONLISTE = URL_ROOT_PROJET + "wsPlancomptable.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_URL_FAMILLEOPERATIONLISTE = URL_FAMILLEOPERATIONLISTE + "pvgChargerDansDataSetOperation";
        public static string URL_SELECT_URL_FAMILLEOPERATIONLISTE1 = URL_FAMILLEOPERATIONLISTE + "pvgChargerDansDataSet";
    }
}