using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebProfil : ReferencesGenerales 
    {
        public static string URL_PROFIL = URL_ROOT_PROJET + "wsProfil.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_PROFIL = URL_PROFIL + "pvgChargerDansDataSetPourCombo";

    }
}