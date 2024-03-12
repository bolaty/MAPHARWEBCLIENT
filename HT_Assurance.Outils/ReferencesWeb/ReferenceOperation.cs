using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebOperation : ReferencesGenerales 
    {
        public static string URL_OPERATION = URL_ROOT_PROJET + "wsPlancomptable.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_OPERATION = URL_OPERATION + "pvgChargerDansDataSetOperation";

    }
}