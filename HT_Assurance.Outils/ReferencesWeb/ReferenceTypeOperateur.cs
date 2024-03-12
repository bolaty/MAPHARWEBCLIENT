using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeOperateur : ReferencesGenerales 
    {
        public static string URL_TYPE_OPERATEUR = URL_ROOT_PROJET + "wsTypeoperateur.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_TYPE_OPERATEUR = URL_TYPE_OPERATEUR + "pvgChargerDansDataSetPourCombo";

    }
}