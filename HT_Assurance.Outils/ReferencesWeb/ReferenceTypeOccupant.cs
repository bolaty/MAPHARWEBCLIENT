using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeOccupant : ReferencesGenerales
    {
        public static string URL_TYPE_OCCUPANT = URL_ROOT_PROJET + "wsCtpartypeoccupant.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TYPE_OCCUPANT = URL_TYPE_OCCUPANT + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_OCCUPANT = URL_TYPE_OCCUPANT + "pvgChargerDansDataSetPourCombo";

    }
}