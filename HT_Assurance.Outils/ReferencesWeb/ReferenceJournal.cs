using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceJournal : ReferencesGenerales
    {
        public static string URL_JOURNAL = URL_ROOT_PROJET + "wsJournal.svc/";
        public static string URL_TYPE_JOURNAL = URL_ROOT_PROJET + "wsTypejournal.svc/";

        ///URL TEMPLATE

        // public static string URL_MISE_A_JOUR_BRANCHE = URL_SOLDE_COMPTE + "pvgMiseAjour";
        public static string URL_SELECT_URL_JOURNAL = URL_JOURNAL + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTE_JOURNAL = URL_JOURNAL + "pvgChargerDansDataSet";

        public static string URL_SELECT_TYPE_JOURNAL = URL_TYPE_JOURNAL + "pvgChargerDansDataSetPourCombo";

        public static string URL_INSERT_JOURNAL = URL_JOURNAL + "pvgAjouter";
        public static string URL_UPDATE_JOURNAL = URL_JOURNAL + "pvgModifier";
        public static string URL_DELETE_JOURNAL = URL_JOURNAL + "pvgSupprimer";

    }
}