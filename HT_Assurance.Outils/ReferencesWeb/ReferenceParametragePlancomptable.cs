using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametragePlancomptable : ReferencesGenerales 
    {
        public static string URL_PARAMETRAGEPLANCOMPTABLE = URL_ROOT_PROJET + "wsPlancomptable.svc/";
        public static string URL_LISTNATURECOMPTE = URL_ROOT_PROJET + "wsPlancomptablenaturecompte.svc/";
        public static string URL_LISTSENS = URL_ROOT_PROJET + "wsComptapar_sens.svc/";
        public static string URL_LISTTYPECOMPTE = URL_ROOT_PROJET + "wsTypeCompte.svc/";
        public static string URL_LISTSTATUTCOMPTE = URL_ROOT_PROJET + "wsStatutCompte.svc/";
        public static string URL_LISTTYPESTATUT = URL_ROOT_PROJET + "wsComptapar_typesaut.svc/";
        public static string URL_LISTPLANREPORTING = URL_ROOT_PROJET + "wsPlan_rerporting.svc/";
        //public static string URL_LISTCOMPTECOLLECTIFPLANREPORTING = URL_ROOT_PROJET + "wsComptapar_typesaut.svc/";


        ///URL TEMPLATE

        public static string URL_SELECT_LISTPARAMETRAGEPLANCOMPTABLE = URL_PARAMETRAGEPLANCOMPTABLE + "pvgChargerDansDataSetTousLesComptes";
        public static string URL_SELECT_LISTNATURECOMPTE = URL_LISTNATURECOMPTE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTSENS = URL_LISTSENS + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTTYPECOMPTE = URL_LISTTYPECOMPTE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTSTATUTCOMPTE = URL_LISTSTATUTCOMPTE + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTTYPESTATUT = URL_LISTTYPESTATUT + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_LISTPLANREPORTING = URL_LISTPLANREPORTING + "pvgChargerDansDataSetPourCombo";
        public static string URL_INSERT = URL_PARAMETRAGEPLANCOMPTABLE + "pvgAjouter";
        public static string URL_UPDATE_LISTTYPESTATUT = URL_PARAMETRAGEPLANCOMPTABLE + "pvgModifier";
        public static string URL_DELETE_LISTTYPESTATUT = URL_PARAMETRAGEPLANCOMPTABLE + "pvgSupprimer";
        public static string URL_SELECT_LISTCOMPTECOLLECTIFPLANREPORTING = URL_PARAMETRAGEPLANCOMPTABLE + "pvgChargerDansDataSetComptesCollectifs";
    }
}