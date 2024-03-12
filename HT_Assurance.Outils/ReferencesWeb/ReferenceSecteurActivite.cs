using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSecteurActivite : ReferencesGenerales
    {
        public static string URL_SECTEUR_ACTIVITE = URL_ROOT_PROJET + "wsActivite.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_SECTEUR_ACTIVITE = URL_SECTEUR_ACTIVITE + "pvgChargerDansDataSetPourCombo";

    }
}