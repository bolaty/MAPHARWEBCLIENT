using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceFamilleOperationTresorerie : ReferencesGenerales
    {
        public static string URL_FAMILLEOPERATIONTRESORERIE = URL_ROOT_PROJET + "wsPhafamilleoperation.svc/";
        public static string URL_PLANCOMPTABLE = URL_ROOT_PROJET + "wsPlancomptable.svc/";
        public static string URL_PLANCOMPTABLE_VERSEMENT = URL_ROOT_PROJET + "wsPlancomptableTemp.svc/";
        ///URL TEMPLATE

        public static string URL_SELECT_FAMILLEOPERATIONTRESORERIE = URL_FAMILLEOPERATIONTRESORERIE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTEPLANCOMPTABLE = URL_PLANCOMPTABLE + "pvgChargerDansDataSetOperation";
        public static string URL_SELECT_LISTEPLANCOMPTABLE_VERSEMENT = URL_PLANCOMPTABLE_VERSEMENT + "pvgChargerDansDataSetPourCombo";

    }
}