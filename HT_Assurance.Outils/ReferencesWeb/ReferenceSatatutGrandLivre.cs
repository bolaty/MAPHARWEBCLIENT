using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSatatutGrandLivre : ReferencesGenerales 
    {
        public static string URL_STATUT_GRAND_LIVRE = URL_ROOT_PROJET + "wsGrandLivre.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_STATUT_GRAND_LIVRE = URL_STATUT_GRAND_LIVRE + "pvgChargerDansDataSetPourCombo";

    }
}