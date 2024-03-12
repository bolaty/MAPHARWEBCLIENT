using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametragedesautresEcriture : ReferencesGenerales 
    {
        public static string URL_FAMILLEOPERATION = URL_ROOT_PROJET + "wsPhafamilleoperation.svc/";
        public static string URL_LISTE = URL_ROOT_PROJET + "wsPhamouvementstockreglementnatureoperation.svc/";
        public static string URL_JOURNAL = URL_ROOT_PROJET + "wsJournal.svc/";
        public static string URL_NATURECOMPTE = URL_ROOT_PROJET + "wsPlancomptablenaturecompte.svc/";
        public static string URL_SENS = URL_ROOT_PROJET + "wsSENS.svc/";
        public static string URL_PARAMATREDESAUTRESECRITURES = URL_ROOT_PROJET + "wsPhamouvementstockreglementnatureoperation.svc/";
        ///URL TEMPLATE

        public static string URL_SELECT_FAMILLEOPERATION = URL_FAMILLEOPERATION + "pvgChargerDansDataSetFamilleOperation";
        public static string URL_SELECT_LISTE = URL_LISTE + "pvgChargerDansDataSetEcranParametrage";
        public static string URL_SELECT_JOURNAL = URL_JOURNAL + "pvgChargerDansDataSetPourComboSelonEcran";
        public static string URL_SELECT_NATURECOMPTE = URL_NATURECOMPTE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_SENS = URL_SENS + "pvgChargerDansDataSetPourCombo";
        public static string URL_INSERT = URL_PARAMATREDESAUTRESECRITURES + "pvgAjouter";
        public static string URL_UPDATE = URL_PARAMATREDESAUTRESECRITURES + "pvgModifier";
        public static string URL_DELETE = URL_PARAMATREDESAUTRESECRITURES + "pvgSupprimer";

    }
}