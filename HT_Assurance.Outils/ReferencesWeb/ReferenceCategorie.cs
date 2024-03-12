using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebCategorie : ReferencesGenerales
    {
        public static string URL_CATEGORIE = URL_ROOT_PROJET + "wsCtparautocategorie.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_CATEGORIE = URL_CATEGORIE + "pvgMiseAjour";
        public static string URL_SELECT_CATEGORIE = URL_CATEGORIE + "pvgChargerDansDataSetPourCombo";

    }
}