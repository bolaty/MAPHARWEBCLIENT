using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDocument : ReferencesGenerales
    {
        public static string URL_DOCUMENT = URL_ROOT_PROJET + "wsCtparquestionnairedocumentrisqueassuranceliaison.svc/";

        ///URL TEMPLATE

        
        public static string URL_SELECT_DOCUMENT = URL_DOCUMENT + "pvgChargerDansDataSet";
        
    }
}