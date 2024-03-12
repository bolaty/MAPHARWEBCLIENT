using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametrageFamilledOperation : ReferencesGenerales
    {
        public static string URL_PARAMETRAGEFAMILLEOPERATION = URL_ROOT_PROJET + "wsPhafamilleoperation.svc/";
        //COMBO
        public static string URL_COMBONATUREOPERATION = URL_ROOT_PROJET + "wsPhanaturefamilleoperation.svc/";


        ///URL TEMPLATE
        public static string URL_LIST_PARAM_FAMILLE_OPERATION = URL_PARAMETRAGEFAMILLEOPERATION + "pvgChargerDansDataSet1";
        public static string URL_INSERT_PARAM_FAMILLE_OPERATION = URL_PARAMETRAGEFAMILLEOPERATION + "pvgAjouter";
        public static string URL_UPDATE_PARAM_FAMILLE_OPERATION = URL_PARAMETRAGEFAMILLEOPERATION + "pvgModifier";
        public static string URL_DELETE_PARAM_FAMILLE_OPERATION = URL_PARAMETRAGEFAMILLEOPERATION + "pvgSupprimer";

        public static string URL_CHARGEMENT_NATURE_OPERATION = URL_COMBONATUREOPERATION + "pvgChargerDansDataSetPourCombo";
    }
}