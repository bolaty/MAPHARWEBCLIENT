using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceNumDebut : ReferencesGenerales 
    {
        public static string URL_NUMERO_DEBUT = URL_ROOT_PROJET + "wsPhatiers.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_NUMERO_DEBUT = URL_NUMERO_DEBUT + "pvgChargerDansDataSetPourCombo";

    }
}